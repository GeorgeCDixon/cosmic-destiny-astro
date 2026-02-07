import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@constants/colors';

interface CardProps {
  children: React.ReactNode;
  variant?: 'solid' | 'gradient' | 'outlined';
  gradient?: [string, string, ...string[]];
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  padding?: number;
  borderRadius?: number;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'solid',
  gradient,
  onPress,
  style,
  padding = 20,
  borderRadius = 16,
  shadow = true,
}) => {
  const getCardStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [
      styles.card,
      { padding, borderRadius },
    ];

    if (shadow) {
      baseStyles.push(styles.shadow);
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  if (variant === 'gradient' && gradient) {
    const CardContent = (
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius, padding }]}
      >
        {children}
      </LinearGradient>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={[...getCardStyles(), { padding: 0 }]}
        >
          {CardContent}
        </TouchableOpacity>
      );
    }

    return <View style={[...getCardStyles(), { padding: 0 }]}>{CardContent}</View>;
  }

  const getContainerStyles = (): ViewStyle[] => {
    const baseStyles = [...getCardStyles()];

    if (variant === 'outlined') {
      baseStyles.push(styles.outlined);
    }

    if (variant === 'solid') {
      baseStyles.push(styles.solid);
    }

    return baseStyles;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={getContainerStyles()}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={getContainerStyles()}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  solid: {
    backgroundColor: colors.background.primary,
  },
  outlined: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  gradient: {
    flex: 1,
  },
  shadow: {
    shadowColor: colors.shadow.md,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});