import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { signOut } from '../services/firebase';
import { RootStackParamList } from '../types';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

interface SettingItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  hasArrow?: boolean;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onPress?: () => void;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

const handleSignOut = () => {
  Alert.alert(
    'Sign Out',
    'Are you sure you want to sign out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Sign out error:', error);
            Alert.alert('Error', 'Failed to sign out');
          }
        },
      },
    ]
  );
};

  const sections: SettingSection[] = [
    {
      title: 'ACCOUNT',
      items: [
        {
          id: 'profile',
          icon: 'person-outline',
          title: 'Profile Information',
          hasArrow: true,
          onPress: () => console.log('Profile'),
        },
        {
          id: 'birth-chart',
          icon: 'calendar-outline',
          title: 'Birth Chart Details',
          hasArrow: true,
          onPress: () => navigation.navigate('ProfileSetup'),
        },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        {
          id: 'notifications',
          icon: 'notifications-outline',
          title: 'Notifications',
          hasToggle: true,
          toggleValue: notifications,
          onPress: () => setNotifications(!notifications),
        },
        {
          id: 'dark-mode',
          icon: 'moon-outline',
          title: 'Dark Mode',
          hasToggle: true,
          toggleValue: darkMode,
          onPress: () => setDarkMode(!darkMode),
        },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        {
          id: 'help',
          icon: 'help-circle-outline',
          title: 'Help Center',
          hasArrow: true,
          onPress: () => console.log('Help'),
        },
        {
          id: 'privacy',
          icon: 'shield-checkmark-outline',
          title: 'Privacy Policy',
          hasArrow: true,
          onPress: () => console.log('Privacy'),
        },
        {
          id: 'terms',
          icon: 'document-text-outline',
          title: 'Terms of Service',
          hasArrow: true,
          onPress: () => console.log('Terms'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <Ionicons name={item.icon} size={24} color={colors.text.secondary} />
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>

        <View style={styles.settingRight}>
          {item.value && (
            <Text style={styles.settingValue}>{item.value}</Text>
          )}
          
          {item.hasToggle && (
            <Switch
              value={item.toggleValue}
              onValueChange={item.onPress}
              trackColor={{ false: colors.border.medium, true: colors.primary }}
              thumbColor={colors.background.primary}
            />
          )}
          
          {item.hasArrow && (
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          )}
        </View>
      </TouchableOpacity>
    );
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
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Settings Sections */}
        {sections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Cosmic Destiny v1.0.0</Text>
          <Text style={styles.versionSubtext}>© 2025 All rights reserved</Text>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.text.tertiary,
    fontWeight: '600',
    paddingHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.background.primary,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow.sm,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text.primary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginLeft: 52,
  },
  signOutButton: {
    marginHorizontal: 24,
    backgroundColor: colors.status.error + '10',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signOutText: {
    ...typography.button,
    color: colors.status.error,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  versionText: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  versionSubtext: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});