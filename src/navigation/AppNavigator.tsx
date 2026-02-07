import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

// Import Screens
import { SplashScreen } from '../screens/SplashScreen';
import { Onboarding1 } from '../screens/Onboarding1';
import { Onboarding2 } from '../screens/Onboarding2';
import { Onboarding3 } from '../screens/Onboarding3';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileSetup } from '../screens/ProfileSetup';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Dashboard } from '../screens/Dashboard';
import { BasicReading } from '../screens/BasicReading';
import { TopicSelection } from '../screens/TopicSelection';
import { TopicDetail } from '../screens/TopicDetail';
import { PaymentScreen } from '../screens/PaymentScreen';
import { PaymentSuccess } from '../screens/PaymentSuccess';
import { PremiumReport } from '../screens/PremiumReport';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="BasicReading" component={BasicReading} />
        <Stack.Screen name="TopicSelection" component={TopicSelection} />
        <Stack.Screen name="TopicDetail" component={TopicDetail} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="PremiumReport" component={PremiumReport} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};