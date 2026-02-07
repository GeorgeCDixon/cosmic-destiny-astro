import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from '../components/Card';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { PaymentMethod, RootStackParamList } from '../types';

// Use mock IAP for testing in Expo Go
import type { MockProduct, MockPurchase, MockPurchaseError } from '../services/payment-iap-mock';
import * as IAP from '../services/payment-iap-mock';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
}

export const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { topic } = route.params;
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [price, setPrice] = useState('$9.99');

  useEffect(() => {
    loadProducts();

    // Setup purchase listeners
    const cleanup = IAP.setupPurchaseListeners(
      handlePurchaseSuccess,
      handlePurchaseError
    );

    return cleanup;
  }, []);

  const loadProducts = async () => {
    const availableProducts = await IAP.getAvailableProducts();
    setProducts(availableProducts);
    
    if (availableProducts.length > 0) {
      setPrice(IAP.formatPrice(availableProducts[0]));
    }
  };

  const handlePaymentMethodSelect = async (methodId: string) => {
    if (isProcessing) return;
    
    setSelectedMethod(methodId);
    setIsProcessing(true);

    try {
      // Request purchase
      const purchase = await IAP.purchaseProduct('com.cosmicdestiny.premium_reading');
      
      if (purchase) {
        console.log('Purchase initiated');
        // Handle success
        handlePurchaseSuccess(purchase);
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      Alert.alert('Payment Cancelled', 'Your payment was not completed.');
      setSelectedMethod(null);
      setIsProcessing(false);
    }
  };

  const handlePurchaseSuccess = async (purchase: MockPurchase) => {
    try {
      // Complete the transaction
      await IAP.completePurchase(purchase);

      // Use transaction ID as order ID
      const orderId = purchase.transactionId;

      // Navigate to success screen
      setIsProcessing(false);
      setSelectedMethod(null);
      navigation.navigate('PaymentSuccess', { topic, orderId });
    } catch (error) {
      console.error('Error completing purchase:', error);
      Alert.alert('Error', 'Failed to complete purchase. Please contact support.');
      setIsProcessing(false);
      setSelectedMethod(null);
    }
  };

  const handlePurchaseError = (error: MockPurchaseError) => {
    console.error('Purchase error:', error);
    Alert.alert('Payment Failed', error.message || 'Please try again.');
    setIsProcessing(false);
    setSelectedMethod(null);
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'apple',
      type: 'card',
      name: 'Apple Pay',
      icon: 'card',
      description: 'Pay with Apple Pay',
    },
    {
      id: 'google',
      type: 'card',
      name: 'Google Pay',
      icon: 'logo-google',
      description: 'Pay with Google Pay',
    },
    {
      id: 'card',
      type: 'card',
      name: 'Credit / Debit Card',
      icon: 'card',
      description: 'Visa, Mastercard, Amex',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Secure Payment</Text>
          <Text style={styles.subtitle}>
            Complete your purchase to unlock insights
          </Text>
        </View>

        {/* Order Summary */}
        <Card style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={[styles.orderIcon, { backgroundColor: `${topic.color}20` }]}>
              <Ionicons
                name={topic.icon as any}
                size={24}
                color={topic.color}
              />
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{topic.title}</Text>
              <Text style={styles.orderSubtitle}>Premium Deep Analysis</Text>
            </View>
          </View>

          <View style={styles.orderDivider} />

          <View style={styles.orderTotal}>
            <Text style={styles.orderTotalLabel}>Total Amount</Text>
            <Text style={styles.orderTotalValue}>{price}</Text>
          </View>
        </Card>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedMethod === method.id && styles.paymentMethodSelected,
                ]}
                onPress={() => handlePaymentMethodSelect(method.id)}
                disabled={isProcessing}
              >
                <View style={styles.paymentMethodIcon}>
                  <Ionicons name={method.icon as any} size={24} color={colors.text.primary} />
                </View>

                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodDescription}>
                    {method.description}
                  </Text>
                </View>

                {selectedMethod === method.id && isProcessing ? (
                  <View style={styles.loadingIndicator}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={colors.primary} />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Info */}
        <Card style={styles.securityCard}>
          <View style={styles.securityContent}>
            <Ionicons name="lock-closed" size={20} color={colors.primary} />
            <View style={styles.securityInfo}>
              <Text style={styles.securityTitle}>Secure Payment</Text>
              <Text style={styles.securityDescription}>
                Your payment is processed securely through the App Store. We never store your payment details.
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: colors.background.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  orderCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    ...typography.button,
    color: colors.text.primary,
    marginBottom: 2,
  },
  orderSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  orderDivider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: 16,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotalLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  orderTotalValue: {
    ...typography.h2,
    color: colors.text.primary,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: 16,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  paymentMethodSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.topics.spiritual.light,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paypalIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#0070ba',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paypalCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.primary,
  },
  gpayIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.text.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpayText: {
    ...typography.h5,
    color: colors.text.inverse,
    fontWeight: 'bold',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    ...typography.button,
    color: colors.text.primary,
    marginBottom: 2,
  },
  paymentMethodDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  loadingIndicator: {
    width: 24,
    height: 24,
  },
  securityCard: {
    marginHorizontal: 24,
    backgroundColor: colors.topics.spiritual.light,
    borderWidth: 1,
    borderColor: colors.topics.spiritual.primary + '30',
  },
  securityContent: {
    flexDirection: 'row',
    gap: 12,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: 4,
  },
  securityDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: typography.caption.fontSize * 1.6,
  },
});