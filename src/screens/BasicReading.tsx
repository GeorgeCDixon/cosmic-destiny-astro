import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { RootStackParamList } from '../types';

type BasicReadingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BasicReading'>;
type BasicReadingRouteProp = RouteProp<RootStackParamList, 'BasicReading'>;

interface Props {
  navigation: BasicReadingNavigationProp;
  route: BasicReadingRouteProp;
}

interface Props {
  navigation: BasicReadingNavigationProp;
  route: BasicReadingRouteProp;
}

export const BasicReading: React.FC<Props> = ({ navigation, route }) => {
  const { reading } = route.params;

  // Use real data from API
  const keyInsights = reading.keyInsights;
  const traits = reading.traits;

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
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={40} color={colors.text.inverse} />
          </View>
          <Text style={styles.title}>Your Cosmic Overview</Text>
          <Text style={styles.subtitle}>Free Basic Reading</Text>
        </View>

        {/* Sun Sign Card */}
        <Card style={styles.sunSignCard}>
          <View style={styles.sunSignHeader}>
            <View style={styles.zodiacIconContainer}>
              <Text style={styles.zodiacEmoji}>{reading.sunSignSymbol}</Text>
            </View>
            <View style={styles.sunSignInfo}>
              <Text style={styles.sunSignTitle}>Moon Sign:  {reading.sunSign}</Text>
              <Text style={styles.sunSignSubtitle}>The Lion • Fire Sign</Text>
            </View>
          </View>

          <Text style={styles.sunSignDescription}>
            {reading.overview}
          </Text>

          <View style={styles.traitsContainer}>
            {traits.map((trait, index) => (
              <View key={index} style={styles.traitTag}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Key Insights Card */}
        <Card style={styles.insightsCard}>
          <Text style={styles.cardTitle}>Key Insights This Week</Text>

          <View style={styles.insightsList}>
            {keyInsights.map((insight) => (
              <View key={insight.id} style={styles.insightItem}>
                <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
                  <Ionicons name={insight.icon as any} size={16} color={insight.color} />
                </View>
                <Text style={styles.insightText}>{insight.text}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Premium CTA Card */}
        <Card
          gradient={[colors.primary, colors.secondary]}
          variant="gradient"
          style={styles.premiumCard}
        >
          <View style={styles.premiumContent}>
            <View style={styles.premiumIcon}>
              <Ionicons name="lock-closed" size={32} color={colors.text.inverse} />
            </View>
            <Text style={styles.premiumTitle}>Unlock Deep Insights</Text>
            <Text style={styles.premiumDescription}>
              Get detailed analysis on specific life areas
            </Text>
            <Button
              title="Explore Topics"
              onPress={() => navigation.navigate('TopicSelection')}
              variant="secondary"
              fullWidth
              style={styles.premiumButton}
            />
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
    paddingBottom: 8,
    backgroundColor: colors.background.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.background.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.shadow.lg,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  sunSignCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  sunSignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  zodiacIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3c7', // amber-100
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  zodiacEmoji: {
    fontSize: 28,
  },
  sunSignInfo: {
    flex: 1,
  },
  sunSignTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: 2,
  },
  sunSignSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  sunSignDescription: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: typography.body.fontSize * 1.6,
    marginBottom: 16,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  traitTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.topics.spiritual.light,
    borderRadius: 16,
  },
  traitText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  insightsCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  cardTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: 16,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  insightText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  premiumCard: {
    marginHorizontal: 24,
  },
  premiumContent: {
    alignItems: 'center',
  },
  premiumIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    ...typography.h4,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  premiumDescription: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  premiumButton: {
    backgroundColor: colors.background.primary,
  },
});