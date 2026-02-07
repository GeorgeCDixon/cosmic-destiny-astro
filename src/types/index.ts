// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  ProfileSetup: undefined;
  Loading: undefined;
  Dashboard: undefined;
  BasicReading: { reading: BasicReading };
  TopicSelection: undefined;
  TopicDetail: { topic: Topic };
  Payment: { topic: Topic };
  PaymentSuccess: { topic: Topic; orderId: string };
  PremiumReport: { topic: Topic; reportData: ReportData };
  Settings: undefined;
  History: undefined;
};

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  sunSign?: string;
  createdAt: string;
}

// Topic Types
export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string[];
  price: number;
}

// Reading Types
export interface BasicReading {
  sunSign: string;
  sunSignSymbol: string;
  overview: string;
  traits: string[];
  keyInsights: Insight[];
  generatedAt: string;
}

export interface Insight {
  id: string;
  icon: string;
  text: string;
  color: string;
}

// Premium Report Types
export interface ReportData {
  topicId: string;
  topicTitle: string;
  sections: ReportSection[];
  generatedAt: string;
}

export interface ReportSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  highlights?: string[];
  color: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'googlepay' | 'applepay';
  name: string;
  icon: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

// History Types
export interface ReadingHistory {
  id: string;
  topicId: string;
  topicTitle: string;
  icon: string;
  color: string;
  date: string;
  reportData?: ReportData;
}

// API Response Types
export interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Form Types
export interface ProfileFormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

// Settings Types
export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}