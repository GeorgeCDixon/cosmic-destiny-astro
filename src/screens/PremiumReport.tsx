import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type PremiumReportNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PremiumReport'>;
type PremiumReportRouteProp = RouteProp<RootStackParamList, 'PremiumReport'>;

interface Props {
  navigation: PremiumReportNavigationProp;
  route: PremiumReportRouteProp;
}

export const PremiumReport: React.FC<Props> = ({ navigation, route }) => {
  const { topic, reportData } = route.params;

  const sections = [
    {
      id: '1',
      title: 'Current Relationship Energy',
      icon: 'heart' as const,
      content:
        "Venus in your 7th house creates a powerful magnetism for deep connections. Your chart shows a rare alignment suggesting significant relationship developments in the coming weeks. This is a transformative period where past patterns can be released and new, healthier dynamics established.",
      color: colors.topics.love.primary,
    },
    {
      id: '2',
      title: 'Soul Mate Indicators',
      icon: 'sparkles' as const,
      content:
        'Your natal chart reveals strong indicators for meeting a significant soul connection. The combination of your North Node placement and Jupiter transit creates rare opportunity windows.',
      highlights: [
        'North Node conjunct Descendant - destined partnerships entering your life',
        'Venus trine Jupiter - expansion and abundance through love',
        '7th house ruler in 5th - romance through creative self-expression',
      ],
      color: colors.primary,
    },
    {
      id: '3',
      title: 'Actionable Guidance',
      icon: 'eye' as const,
      content:
        'Focus on authentic self-expression in social settings. Friday evening is particularly auspicious for meeting new people or deepening existing connections.',
      highlights: [
        'This Week: Engage in creative activities that bring you joy',
        'This Month: Art classes, music events, or creative workshops are ideal',
        'Trust your intuition when meeting new people',
      ],
      color: colors.topics.health.primary,
    },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my ${topic.title} cosmic reading from Cosmic Destiny!`,
        title: 'My Cosmic Reading',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download report');
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
            onPress={() => navigation.navigate('Dashboard')}
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
            <Text style={styles.headerSubtitle}>Your Premium Cosmic Analysis</Text>
          </View>
        </LinearGradient>

        {/* Report Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <Card key={section.id} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: `${section.color}20` }]}>
                  <Ionicons name={section.icon} size={20} color={section.color} />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              <Text style={styles.sectionContent}>{section.content}</Text>

              {section.highlights && (
                <View style={styles.highlights}>
                  {section.highlights.map((highlight, idx) => (
                    <View key={idx} style={styles.highlightItem}>
                      <View style={[styles.highlightDot, { backgroundColor: section.color }]} />
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              )}

              {index === 0 && (
                <View style={[styles.noteBox, { backgroundColor: `${section.color}10` }]}>
                  <Text style={styles.noteText}>
                    <Text style={styles.noteBold}>Key Transit:</Text> Venus conjunct your
                    Descendant on January 18th - ideal time for important relationship
                    conversations
                  </Text>
                </View>
              )}
            </Card>
          ))}
        </View>

        {/* Action Buttons Card */}
        <Card
          gradient={[colors.primary, colors.secondary]}
          variant="gradient"
          style={styles.actionsCard}
        >
          <View style={styles.actionsContent}>
            <Text style={styles.actionsTitle}>Save Your Reading</Text>
            <Text style={styles.actionsDescription}>
              Keep this analysis for future reference or share it with someone special
            </Text>
            <View style={styles.actionsButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDownload}
              >
                <Ionicons name="download-outline" size={20} color={colors.primary} />
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Ionicons name="share-outline" size={20} color={colors.primary} />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Back to Dashboard */}
        <View style={styles.bottomButtonContainer}>
          <Button
            title="Back to Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
            variant="outline"
            fullWidth
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
  scrollContent: {
    paddingBottom: 32,
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
  sectionsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionCard: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    flex: 1,
  },
  sectionContent: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: typography.body.fontSize * 1.6,
    marginBottom: 16,
  },
  highlights: {
    gap: 8,
    marginBottom: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  highlightDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 4,
  },
  highlightText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  noteBox: {
    padding: 12,
    borderRadius: 12,
  },
  noteText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  noteBold: {
    fontWeight: '600',
    color: colors.topics.love.primary,
  },
  actionsCard: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  actionsContent: {
    alignItems: 'center',
  },
  actionsTitle: {
    ...typography.h5,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  actionsDescription: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: typography.bodySmall.fontSize * 1.6,
  },
  actionsButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.background.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});