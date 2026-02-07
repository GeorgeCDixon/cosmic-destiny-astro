import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card } from '../components/Card';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { generatePremiumReading } from '../services/gemini';
import { getBirthChart } from '../services/storage';
import { RootStackParamList } from '../types';

// TODO: Replace with real Firebase when ready
// import { getBirthChartFromFirestore, getCurrentUser, saveReadingToFirestore } from '../services/firebase';

type PaymentSuccessNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PaymentSuccess'>;
type PaymentSuccessRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;

interface Props {
  navigation: PaymentSuccessNavigationProp;
  route: PaymentSuccessRouteProp;
}

const { width } = Dimensions.get('window');

export const PaymentSuccess: React.FC<Props> = ({ navigation, route }) => {
  const { topic, orderId } = route.params;
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const generateReport = async () => {
    try {
      // Using AsyncStorage for now - will switch to Firebase later
      const birthChart = await getBirthChart();
      
      if (!birthChart) {
        Alert.alert('Error', 'Birth chart not found');
        navigation.replace('Dashboard');
        return;
      }

      // Generate premium reading using Gemini API
      const reportData = await generatePremiumReading(
        birthChart,
        topic.id,
        topic.title
      );

      // TODO: Save to Firebase when ready
      // const currentUser = getCurrentUser();
      // if (currentUser) {
      //   const historyItem: ReadingHistory = {
      //     id: orderId,
      //     topicId: topic.id,
      //     topicTitle: topic.title,
      //     icon: topic.icon,
      //     color: topic.color,
      //     date: new Date().toLocaleDateString('en-US', { 
      //       month: 'short', 
      //       day: 'numeric', 
      //       year: 'numeric' 
      //     }),
      //   };
      //   await saveReadingToFirestore(currentUser.uid, historyItem);
      // }

      // Navigate to report
      setTimeout(() => {
        navigation.replace('PremiumReport', { topic, reportData });
      }, 500);
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Failed to generate report. Please try again.');
      navigation.replace('Dashboard');
    }
  };

  useEffect(() => {
    // Success animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Generate report after animations
    const timer = setTimeout(() => {
      generateReport();
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation, topic, orderId]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={[colors.topics.career.light, colors.topics.spiritual.light, colors.topics.love.light]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Success Icon */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={64} color={colors.text.inverse} />
            </View>
          </Animated.View>

          {/* Success Text */}
          <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.subtitle}>
              Your cosmic reading is being prepared. This will only take a moment...
            </Text>
          </Animated.View>

          {/* Order Details */}
          <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
            <Card style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={[styles.topicIcon, { backgroundColor: `${topic.color}20` }]}>
                  <Ionicons
                    name={topic.icon as any}
                    size={24}
                    color={topic.color}
                  />
                </View>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderTitle}>{topic.title}</Text>
                  <Text style={styles.orderSubtitle}>Premium Analysis</Text>
                </View>
              </View>

              <View style={styles.orderDivider} />

              <View style={styles.orderDetails}>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Order ID</Text>
                  <Text style={styles.orderValue}>{orderId}</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Amount Paid</Text>
                  <Text style={styles.orderValueBold}>${topic.price.toFixed(2)}</Text>
                </View>
              </View>
            </Card>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View style={[styles.progressSection, { opacity: fadeAnim }]}>
            <View style={styles.progressHeader}>
              <Ionicons name="sparkles" size={20} color={colors.primary} />
              <Text style={styles.progressText}>Generating your reading...</Text>
            </View>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressGradient}
                />
              </Animated.View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.status.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.xl,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  textContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.body.fontSize * 1.6,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 32,
  },
  orderCard: {
    width: '100%',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicIcon: {
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
  orderDetails: {
    gap: 8,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  orderValue: {
    ...typography.bodySmall,
    fontFamily: 'Courier',
    color: colors.text.primary,
  },
  orderValueBold: {
    ...typography.button,
    color: colors.text.primary,
  },
  progressSection: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  progressText: {
    ...typography.label,
    color: colors.text.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressGradient: {
    flex: 1,
  },
});