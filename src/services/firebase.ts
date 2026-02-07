import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ProfileFormData, ReadingHistory, User } from '../types';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '1:658984045622:web:50f472327a5e6862c75c97', // Get this from Firebase Console
});

// ============================================
// AUTHENTICATION
// ============================================

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    // Check if device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get user info from Google
   await GoogleSignin.signIn();
const { idToken } = await GoogleSignin.getTokens();
    
    // Create Google credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign in with Firebase
    const userCredential = await auth().signInWithCredential(googleCredential);
    const firebaseUser = userCredential.user;
    
    // Create user object
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      createdAt: new Date().toISOString(),
    };
    
    // Save to Firestore
    await saveUserToFirestore(user);
    
    return user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

// Sign in with Email/Password
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;
    
    // Get user from Firestore
    const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
    
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    
    return null;
  } catch (error) {
    console.error('Email Sign-In Error:', error);
    throw error;
  }
};

// Sign up with Email/Password
export const signUpWithEmail = async (email: string, password: string, name: string): Promise<User | null> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;
    
    // Update profile
    await firebaseUser.updateProfile({ displayName: name });
    
    // Create user object
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: name,
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      createdAt: new Date().toISOString(),
    };
    
    // Save to Firestore
    await saveUserToFirestore(user);
    
    return user;
  } catch (error) {
    console.error('Sign-Up Error:', error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Sign-Out Error:', error);
  }
};

// Get current user
export const getCurrentUser = (): any => {
  return auth().currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth().onAuthStateChanged(callback);
};

// ============================================
// FIRESTORE - USER DATA
// ============================================

// Save user to Firestore
const saveUserToFirestore = async (user: User): Promise<void> => {
  try {
    await firestore().collection('users').doc(user.id).set(user, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
};

// Get user from Firestore
export const getUserFromFirestore = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<void> => {
  try {
    await firestore().collection('users').doc(userId).update(data);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// ============================================
// FIRESTORE - BIRTH CHART
// ============================================

// Save birth chart
export const saveBirthChartToFirestore = async (userId: string, birthChart: ProfileFormData): Promise<void> => {
  try {
    await firestore().collection('users').doc(userId).update({
      name: birthChart.name,
      dateOfBirth: birthChart.dateOfBirth,
      timeOfBirth: birthChart.timeOfBirth,
      placeOfBirth: birthChart.placeOfBirth,
    });
  } catch (error) {
    console.error('Error saving birth chart:', error);
    throw error;
  }
};

// Get birth chart
export const getBirthChartFromFirestore = async (userId: string): Promise<ProfileFormData | null> => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        name: data?.name || '',
        dateOfBirth: data?.dateOfBirth || '',
        timeOfBirth: data?.timeOfBirth || '',
        placeOfBirth: data?.placeOfBirth || '',
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting birth chart:', error);
    return null;
  }
};

// ============================================
// FIRESTORE - READING HISTORY
// ============================================

// Save reading to history
export const saveReadingToFirestore = async (userId: string, reading: ReadingHistory): Promise<void> => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('readings')
      .doc(reading.id)
      .set(reading);
  } catch (error) {
    console.error('Error saving reading to Firestore:', error);
    throw error;
  }
};

// Get reading history
export const getReadingHistoryFromFirestore = async (userId: string): Promise<ReadingHistory[]> => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('readings')
      .orderBy('date', 'desc')
      .get();
    
    const readings: ReadingHistory[] = [];
    snapshot.forEach(doc => {
      readings.push(doc.data() as ReadingHistory);
    });
    
    return readings;
  } catch (error) {
    console.error('Error getting reading history:', error);
    return [];
  }
};

// Delete reading from history
export const deleteReadingFromFirestore = async (userId: string, readingId: string): Promise<void> => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('readings')
      .doc(readingId)
      .delete();
  } catch (error) {
    console.error('Error deleting reading:', error);
    throw error;
  }
};