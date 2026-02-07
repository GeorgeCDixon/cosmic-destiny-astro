import { Platform } from 'react-native';
import {
  endConnection,
  fetchProducts,
  finishTransaction,
  initConnection,
  Product,
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase
} from 'react-native-iap';

// Product IDs (SKUs)
const PRODUCT_SKUS = Platform.select({
  ios: ['com.cosmicdestiny.premium_reading'],
  android: ['com.cosmicdestiny.premium_reading'],
  default: ['com.cosmicdestiny.premium_reading'],
}) as string[];

// Initialize IAP connection
export const initIAP = async (): Promise<boolean> => {
  try {
    const result = await initConnection();
    console.log('IAP Connection initialized:', result);
    return true;
  } catch (error) {
    console.error('Error initializing IAP:', error);
    return false;
  }
};

// Close IAP connection
export const closeIAP = async (): Promise<void> => {
  try {
    await endConnection();
    console.log('IAP Connection closed');
  } catch (error) {
    console.error('Error closing IAP:', error);
  }
};

// Get available products
export const getAvailableProducts = async (): Promise<Product[]> => {
  try {
    const products = await fetchProducts({ skus: PRODUCT_SKUS });
    console.log('Available products:', products);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Purchase a product
export const purchaseProduct = async (sku: string): Promise<ProductPurchase | null> => {
  try {
    console.log('Requesting purchase for:', sku);
    
    // requestPurchase now takes just the SKU string
    const purchase = await requestPurchase({ skus: [sku] });
    
    console.log('Purchase successful:', purchase);
    return purchase;
  } catch (error) {
    console.error('Error purchasing product:', error);
    throw error;
  }
};

// Finish transaction
export const completePurchase = async (purchase: ProductPurchase): Promise<void> => {
  try {
    await finishTransaction({ purchase, isConsumable: true });
    console.log('Transaction completed');
  } catch (error) {
    console.error('Error completing purchase:', error);
    throw error;
  }
};

// Setup purchase listeners
export const setupPurchaseListeners = (
  onPurchaseSuccess: (purchase: ProductPurchase) => void,
  onPurchaseError: (error: PurchaseError) => void
) => {
  // Listen for purchase updates
  const purchaseUpdateSubscription = purchaseUpdatedListener(
    (purchase: ProductPurchase) => {
      console.log('Purchase updated:', purchase);
      onPurchaseSuccess(purchase);
    }
  );

  // Listen for purchase errors
  const purchaseErrorSubscription = purchaseErrorListener(
    (error: PurchaseError) => {
      console.log('Purchase error:', error);
      onPurchaseError(error);
    }
  );

  // Return cleanup function
  return () => {
    purchaseUpdateSubscription.remove();
    purchaseErrorSubscription.remove();
  };
};

// Product pricing helper - handle both iOS and Android formats
export const formatPrice = (product: Product): string => {
  // iOS uses 'price' and 'currency'
  if ('price' in product && 'currency' in product) {
    const price = product.price;
    const currency = product.currency;
    
    // Try to format with currency
    if (currency === 'USD') {
      return `$${price}`;
    }
    return `${currency} ${price}`;
  }
  
  // Android uses 'oneTimePurchaseOfferDetails'
  if ('oneTimePurchaseOfferDetails' in product) {
    const details = (product as any).oneTimePurchaseOfferDetails;
    if (details?.formattedPrice) {
      return details.formattedPrice;
    }
  }
  
  // Fallback
  return '$9.99';
};

// Get product price as number
export const getProductPrice = (product: Product): number => {
  if ('price' in product) {
    return parseFloat(product.price);
  }
  
  if ('oneTimePurchaseOfferDetails' in product) {
    const details = (product as any).oneTimePurchaseOfferDetails;
    if (details?.priceAmountMicros) {
      return details.priceAmountMicros / 1000000;
    }
  }
  
  return 9.99;
};