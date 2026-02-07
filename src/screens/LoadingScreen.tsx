import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { getBirthChartFromFirestore, getCurrentUser } from '../services/firebase';
import { generateBasicReading } from '../services/gemini';
import { RootStackParamList } from '../types';

type LoadingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

interface Props {
  navigation: LoadingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

export const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

 const generateReading = async () => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      Alert.alert('Error', 'Please sign in first');
      navigation.replace('Login');
      return;
    }

    const birthChart = await getBirthChartFromFirestore(currentUser.uid);
    
    if (!birthChart) {
      Alert.alert('Error', 'Birth chart not found');
      navigation.replace('ProfileSetup');
      return;
    }

    // Generate basic reading using Gemini API
    const reading = await generateBasicReading(birthChart);
    
    // Navigate to BasicReading with generated data
    navigation.replace('BasicReading', { reading });
  } catch (error) {
    console.error('Error generating reading:', error);
    Alert.alert('Error', 'Failed to generate reading. Please try again.');
    navigation.replace('ProfileSetup');
  }
};

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      }),
    ]).start();

    // Generate reading after animations
    const timer = setTimeout(() => {
      generateReading();
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={[colors.topics.spiritual.light, colors.topics.love.light, '#fef3c7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Loading Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate }, { scale: pulseAnim }],
            },
          ]}
        >
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Ionicons name="sparkles" size={48} color={colors.primary} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Loading Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Reading the Stars...</Text>
          <Text style={styles.subtitle}>
            Our AI is analyzing your cosmic blueprint
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
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
        </View>

        {/* Loading Steps */}
        <View style={styles.stepsContainer}>
          <LoadingStep 
            icon="analytics-outline" 
            text="Analyzing birth chart" 
            delay={0}
          />
          <LoadingStep 
            icon="planet-outline" 
            text="Calculating planetary positions" 
            delay={1000}
          />
          <LoadingStep 
            icon="star-outline" 
            text="Generating insights" 
            delay={2000}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

interface LoadingStepProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  delay: number;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ icon, text, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Animated.View style={[styles.stepItem, { opacity: fadeAnim }]}>
      <Ionicons name={icon} size={16} color={colors.primary} />
      <Text style={styles.stepText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 48,
  },
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(147, 51, 234, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.lg,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  textContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  progressContainer: {
    width: width - 64,
    marginBottom: 32,
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
  stepsContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  stepText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});