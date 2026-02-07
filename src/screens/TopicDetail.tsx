import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type TopicDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TopicDetail'>;
type TopicDetailRouteProp = RouteProp<RootStackParamList, 'TopicDetail'>;

interface Props {
  navigation: TopicDetailNavigationProp;
  route: TopicDetailRouteProp;
}

export const TopicDetail: React.FC<Props> = ({ navigation, route }) => {
  const { topic } = route.params;

  const features = [
    'Detailed analysis of your romantic energy and relationship patterns',
    'Soul mate indicators and timing for significant connections',
    'Compatibility insights based on your complete birth chart',
    'Actionable guidance for attracting and nurturing love',
    'Planetary transits affecting your relationship sector',
  ];

  const handleProceedToPayment = () => {
    navigation.navigate('Payment', { topic });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={topic.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Ionicons
                name={topic.icon as any}
                size={32}
                color={colors.text.inverse}
              />
            </View>
            <Text style={styles.headerTitle}>{topic.title}</Text>
            <Text style={styles.headerSubtitle}>Deep Cosmic Analysis</Text>
          </View>
        </LinearGradient>

        {/* What You'll Discover */}
        <Card style={styles.featuresCard}>
          <Text style={styles.cardTitle}>What You'll Discover</Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={topic.color} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* AI-Powered Info */}
        <Card style={[styles.aiCard, { backgroundColor: `${topic.color}10` }]}>
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={24} color={topic.color} />
            <Text style={styles.aiTitle}>AI-Powered Insights</Text>
          </View>
          <Text style={styles.aiDescription}>
            Generated specifically for your unique birth chart using advanced Google Gemini
            AI with decades of astrological wisdom
          </Text>
        </Card>

        {/* Payment Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Premium Analysis</Text>
            <Text style={styles.summaryValue}>${topic.price.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${topic.price.toFixed(2)}</Text>
          </View>
        </Card>

        {/* Spacer for button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomButton}>
        <Button
          title="Proceed to Payment"
          onPress={handleProceedToPayment}
          fullWidth
          size="large"
          gradient={topic.gradient}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.inverse,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuresCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  cardTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  aiCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  aiTitle: {
    ...typography.h5,
    color: colors.text.primary,
  },
  aiDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  summaryCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
    ...typography.h5,
    color: colors.text.primary,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.button,
    color: colors.text.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: 12,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    ...typography.h5,
    color: colors.text.primary,
  },
  summaryTotalValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  spacer: {
    height: 20,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    shadowColor: colors.shadow.lg,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
});