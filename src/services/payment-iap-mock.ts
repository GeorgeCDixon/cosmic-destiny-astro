export interface MockProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  type: string;
}

export interface MockPurchase {
  productId: string;
  transactionId: string;
  transactionDate: number;
  transactionReceipt: string;
}

export interface MockPurchaseError {
  code: string;
  message: string;
}

// Mock product
const mockProduct: MockProduct = {
  productId: 'com.cosmicdestiny.premium_reading',
  title: 'Premium Reading',
  description: 'Detailed cosmic analysis',
  price: '9.99',
  currency: 'USD',
  type: 'inapp',
};

export const initIAP = async (): Promise<boolean> => {
  console.log('[MOCK IAP] Initialized');
  return true;
};

export const closeIAP = async (): Promise<void> => {
  console.log('[MOCK IAP] Closed');
};

export const getAvailableProducts = async (): Promise<MockProduct[]> => {
  console.log('[MOCK IAP] Getting products');
  return [mockProduct];
};

export const purchaseProduct = async (sku: string): Promise<MockPurchase> => {
  console.log('[MOCK IAP] Purchasing:', sku);
  
  // Simulate purchase delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    productId: sku,
    transactionId: `MOCK_TXN_${Date.now()}`,
    transactionDate: Date.now(),
    transactionReceipt: `mock_receipt_${Date.now()}`,
  };
};

export const completePurchase = async (purchase: MockPurchase): Promise<void> => {
  console.log('[MOCK IAP] Completing purchase:', purchase.transactionId);
};

export const setupPurchaseListeners = (
  onSuccess: (purchase: MockPurchase) => void,
  onError: (error: MockPurchaseError) => void
) => {
  console.log('[MOCK IAP] Setting up listeners');
  
  // Return cleanup function
  return () => {
    console.log('[MOCK IAP] Listeners cleaned up');
  };
};

export const formatPrice = (product: MockProduct): string => {
  return `$${product.price}`;
};

export const getProductPrice = (product: MockProduct): number => {
  return parseFloat(product.price);
};