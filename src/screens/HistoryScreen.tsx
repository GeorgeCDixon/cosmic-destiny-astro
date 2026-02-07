import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { getReadingHistory } from '../services/storage';
import { ReadingHistory, RootStackParamList, Topic } from '../types';

// TODO: Replace with real Firebase when ready
// import { getReadingHistoryFromFirestore, getCurrentUser } from '../services/firebase';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

export const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      // Using AsyncStorage for now - will switch to Firebase later
      const history = await getReadingHistory();
      setReadingHistory(history);

      // TODO: Use Firebase when ready
      // const currentUser = getCurrentUser();
      // if (!currentUser) {
      //   navigation.replace('Login');
      //   return;
      // }
      // const history = await getReadingHistoryFromFirestore(currentUser.uid);
      // setReadingHistory(history);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadingPress = (reading: ReadingHistory) => {
    // Mock topic data for navigation
    const topic: Topic = {
      id: reading.topicId,
      title: reading.topicTitle,
      description: '',
      icon: reading.icon,
      color: reading.color,
      gradient: [reading.color, reading.color],
      price: 10,
    };

    // Navigate to premium report (in real app, fetch actual report data)
    console.log('View reading:', reading.id);
    // navigation.navigate('PremiumReport', { topic, reportData: ... });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading history...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>Reading History</Text>
          <Text style={styles.subtitle}>Your past cosmic analyses</Text>
        </View>

        {/* History List */}
        {readingHistory.length > 0 ? (
          <View style={styles.historyList}>
            {readingHistory.map((reading) => (
              <Card
                key={reading.id}
                onPress={() => handleReadingPress(reading)}
                style={styles.historyCard}
              >
                <View style={styles.historyContent}>
                  <View style={[styles.historyIcon, { backgroundColor: `${reading.color}20` }]}>
                    <Ionicons
                      name={reading.icon as any}
                      size={24}
                      color={reading.color}
                    />
                  </View>

                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{reading.topicTitle}</Text>
                    <Text style={styles.historyDate}>{reading.date}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                </View>
              </Card>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-outline" size={64} color={colors.text.tertiary} />
            </View>
            <Text style={styles.emptyTitle}>No Readings Yet</Text>
            <Text style={styles.emptyDescription}>
              Your reading history will appear here once you purchase your first premium
              analysis
            </Text>
          </View>
        )}

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContent}>
            <Ionicons name="sparkles" size={32} color={colors.primary} />
            <Text style={styles.ctaTitle}>Want More Insights?</Text>
            <Text style={styles.ctaDescription}>
              Get detailed cosmic analysis on any life area
            </Text>
          </View>

          <Button
            title="Get New Reading"
            onPress={() => navigation.navigate('TopicSelection')}
            fullWidth
            size="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: 16,
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
  historyList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  historyCard: {
    marginBottom: 0,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    ...typography.button,
    color: colors.text.primary,
    marginBottom: 4,
  },
  historyDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.body.fontSize * 1.6,
  },
  ctaSection: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  ctaContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  ctaDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});