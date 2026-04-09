import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface BadgeProps {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ label, status = 'success' }) => {
  const getColors = () => {
    switch (status) {
      case 'success':
        return { bg: '#DCFCE7', text: colors.success }; // green
      case 'warning':
        return { bg: '#FEF3C7', text: '#D97706' }; // amber
      case 'error':
        return { bg: '#FEE2E2', text: colors.error }; // red
      case 'neutral':
      default:
        return { bg: colors.border, text: colors.textSecondary };
    }
  };

  const { bg, text } = getColors();

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: '600', // semiBold
  },
});
