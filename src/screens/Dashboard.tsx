import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
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
import { getBirthChartFromFirestore, getCurrentUser, getUserFromFirestore } from '../services/firebase';
import { getBirthChart } from '../services/storage';
import { RootStackParamList } from '../types';

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardNavigationProp;
}

export const Dashboard: React.FC<Props> = ({ navigation }) => {
   const [userName, setUserName] = useState('User');
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    loadUserData();
  }, []);

   const loadUserData = async () => {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        navigation.replace('Login');
        return;
      }

      const user = await getUserFromFirestore(currentUser.uid);
      const birthChart = await getBirthChartFromFirestore(currentUser.uid);
      
      if (user) {
        setUserName(user.name || birthChart?.name || 'User');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDailyReading = async () => {
  try {
    const birthChart = await getBirthChart();
    if (!birthChart) {
      Alert.alert('Error', 'Please complete your profile first');
      navigation.navigate('ProfileSetup');
      return;
    }

    // Show loading state
    navigation.navigate('Loading');
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'Failed to generate reading');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => console.log('Notifications')}
                >
                  <Ionicons name="notifications-outline" size={24} color={colors.text.inverse} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Ionicons name="settings-outline" size={24} color={colors.text.inverse} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sun Sign Card */}
            <View style={styles.sunSignCard}>
              <View style={styles.sunSignContent}>
                <View style={styles.zodiacIcon}>
                  <Text style={styles.zodiacEmoji}>♌</Text>
                </View>
                <View style={styles.sunSignInfo}>
                  <Text style={styles.sunSignTitle}>Leo</Text>
                  <Text style={styles.sunSignSubtitle}>Your Sun Sign</Text>
                </View>
              </View>
              <Text style={styles.sunSignDescription}>
                Today's energy supports bold self-expression. Trust your creative instincts.
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: colors.topics.spiritual.light }]}
                onPress={() => navigation.navigate('TopicSelection')}
              >
                <Ionicons name="sparkles" size={24} color={colors.primary} />
                <Text style={styles.quickActionText}>Daily Reading</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: colors.topics.love.light }]}
                onPress={handleDailyReading}
              >
                <Ionicons name="heart" size={24} color={colors.secondary} />
                <Text style={styles.quickActionText}>Love Match</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Readings */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Readings</Text>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <Card
              onPress={() => navigation.navigate('TopicSelection')}
              style={styles.recentCard}
            >
              <View style={styles.recentCardContent}>
                <View style={[styles.recentIcon, { backgroundColor: colors.topics.love.light }]}>
                  <Ionicons name="heart" size={24} color={colors.secondary} />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentTitle}>Love & Relationships</Text>
                  <Text style={styles.recentDate}>2 days ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
              </View>
            </Card>
          </View>

          {/* Premium CTA */}
          <Card
            gradient={[colors.primary, colors.secondary]}
            variant="gradient"
            style={styles.premiumCard}
          >
            <View style={styles.premiumContent}>
              <View style={styles.premiumIcon}>
                <Ionicons name="lock-closed" size={24} color={colors.text.inverse} />
              </View>
              <Text style={styles.premiumTitle}>Premium Deep Dive</Text>
              <Text style={styles.premiumDescription}>
                Unlock detailed cosmic insights on any life area for just $10
              </Text>
              <TouchableOpacity
                style={styles.premiumButton}
                onPress={() => navigation.navigate('TopicSelection')}
              >
                <Text style={styles.premiumButtonText}>Explore Topics</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <View style={styles.navIconActive}>
            <Ionicons name="star" size={24} color={colors.text.inverse} />
          </View>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <View style={styles.navIcon}>
            <Ionicons name="calendar-outline" size={24} color={colors.text.secondary} />
          </View>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.navIcon}>
            <Ionicons name="person-outline" size={24} color={colors.text.secondary} />
          </View>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
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
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  headerContent: {},
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    ...typography.h3,
    color: colors.text.inverse,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunSignCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  sunSignContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  zodiacIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
    color: colors.text.inverse,
    marginBottom: 2,
  },
  sunSignSubtitle: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sunSignDescription: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: typography.bodySmall.fontSize * 1.5,
  },
  mainContent: {
    paddingHorizontal: 24,
    marginTop: -24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
  },
  viewAllText: {
    ...typography.label,
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    ...typography.label,
    color: colors.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  recentCard: {
    marginBottom: 12,
  },
  recentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    ...typography.button,
    color: colors.text.primary,
    marginBottom: 2,
  },
  recentDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  premiumCard: {
    marginTop: 8,
  },
  premiumContent: {
    alignItems: 'center',
  },
  premiumIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  premiumTitle: {
    ...typography.h5,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  premiumDescription: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: typography.bodySmall.fontSize * 1.5,
  },
  premiumButton: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  premiumButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  navTextActive: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});