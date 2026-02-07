import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { getCurrentUser, saveBirthChartToFirestore } from '../services/firebase';
import { ProfileFormData, RootStackParamList } from '../types';

type ProfileSetupNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;

interface Props {
  navigation: ProfileSetupNavigationProp;
}

export const ProfileSetup: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  const updateFormData = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.timeOfBirth.trim()) {
      newErrors.timeOfBirth = 'Time of birth is required';
    }

    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Place of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleGenerateHoroscope = async () => {
  if (validateForm()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        Alert.alert('Error', 'Please sign in first');
        navigation.navigate('Login');
        return;
      }

      // Save birth chart to Firebase
      await saveBirthChartToFirestore(currentUser.uid, formData);

      console.log('Birth chart saved to Firebase:', formData);
      navigation.navigate('Loading');
    } catch (error) {
      console.error('Error saving birth chart:', error);
      Alert.alert('Error', 'Failed to save birth chart. Please try again.');
    }
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Your Birth Chart</Text>
            <Text style={styles.subtitle}>
              We need these details for accurate predictions
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              error={errors.name}
              icon={<Ionicons name="person-outline" size={20} color={colors.text.tertiary} />}
              autoCapitalize="words"
            />

            <Input
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={formData.dateOfBirth}
              onChangeText={(value) => updateFormData('dateOfBirth', value)}
              error={errors.dateOfBirth}
              icon={<Ionicons name="calendar-outline" size={20} color={colors.text.tertiary} />}
              keyboardType="numeric"
            />

            <Input
              label="Time of Birth"
              placeholder="HH:MM AM/PM"
              value={formData.timeOfBirth}
              onChangeText={(value) => updateFormData('timeOfBirth', value)}
              error={errors.timeOfBirth}
              icon={<Ionicons name="time-outline" size={20} color={colors.text.tertiary} />}
            />
            <Text style={styles.helperText}>
              As accurate as possible for best results
            </Text>

            <Input
              label="Place of Birth"
              placeholder="City, Country"
              value={formData.placeOfBirth}
              onChangeText={(value) => updateFormData('placeOfBirth', value)}
              error={errors.placeOfBirth}
              icon={<Ionicons name="location-outline" size={20} color={colors.text.tertiary} />}
              autoCapitalize="words"
            />
          </View>

          {/* Generate Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Generate My Horoscope"
              onPress={handleGenerateHoroscope}
              fullWidth
              size="large"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  formContainer: {
    marginBottom: 24,
  },
  helperText: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});