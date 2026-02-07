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
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Topic } from '../types';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { Card } from '../components/Card';

type TopicSelectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TopicSelection'>;

interface Props {
  navigation: TopicSelectionNavigationProp;
}

export const TopicSelection: React.FC<Props> = ({ navigation }) => {
  const topics: Topic[] = [
    {
      id: 'love',
      title: 'Love & Relationships',
      description: 'Romantic connections, soul mates, compatibility insights',
      icon: 'heart',
      color: colors.topics.love.primary,
      gradient: colors.topics.love.gradient as [string, string],
      price: 10,
    },
    {
      id: 'career',
      title: 'Career & Finance',
      description: 'Professional growth, wealth opportunities, success paths',
      icon: 'briefcase',
      color: colors.topics.career.primary,
      gradient: colors.topics.career.gradient as [string, string],
      price: 10,
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Physical vitality, mental peace, healing guidance',
      icon: 'fitness',
      color: colors.topics.health.primary,
      gradient: colors.topics.health.gradient as [string, string],
      price: 10,
    },
    {
      id: 'spiritual',
      title: 'Spiritual Growth',
      description: 'Inner wisdom, intuition development, transformation',
      icon: 'eye',
      color: colors.topics.spiritual.primary,
      gradient: colors.topics.spiritual.gradient as [string, string],
      price: 10,
    },
  ];

  const handleTopicPress = (topic: Topic) => {
    navigation.navigate('TopicDetail', { topic });
  };

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
          <Text style={styles.title}>Choose Your Focus</Text>
          <Text style={styles.subtitle}>
            Select a topic for deep cosmic analysis
          </Text>
        </View>

        {/* Topics Grid */}
        <View style={styles.topicsContainer}>
          {topics.map((topic) => (
            <Card
              key={topic.id}
              onPress={() => handleTopicPress(topic)}
              style={[styles.topicCard, { backgroundColor: `${topic.color}10` }]}
            >
              <View style={styles.topicContent}>
                <View style={styles.topicHeader}>
                  <View style={[styles.topicIconContainer, { backgroundColor: `${topic.color}20` }]}>
                    <Ionicons
                      name={topic.icon as any}
                      size={24}
                      color={topic.color}
                    />
                  </View>
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicDescription}>
                      {topic.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.topicFooter}>
                  <Text style={styles.topicPrice}>${topic.price.toFixed(2)}</Text>
                  <View style={[styles.selectButton, { backgroundColor: topic.color }]}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={styles.infoTitle}>AI-Powered Insights</Text>
          </View>
          <Text style={styles.infoDescription}>
            Each reading is generated specifically for your unique birth chart using
            advanced Google Gemini AI with decades of astrological wisdom
          </Text>
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
  topicsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  topicCard: {
    marginBottom: 0,
  },
  topicContent: {
    gap: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  topicIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: 4,
  },
  topicDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  topicPrice: {
    ...typography.h4,
    color: colors.text.primary,
  },
  selectButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  selectButtonText: {
    ...typography.button,
    color: colors.text.inverse,
    fontSize: typography.bodySmall.fontSize,
  },
  infoBox: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.topics.spiritual.light,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.topics.spiritual.primary + '30',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    ...typography.label,
    color: colors.text.primary,
  },
  infoDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
});