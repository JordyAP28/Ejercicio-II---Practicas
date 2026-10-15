import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563EB',
  title: '#1E293B',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  secondary: '#64748B',
  border: '#E2E8F0',
};

// Las pantallas comparten la misma tarjeta, títulos y espaciado.
export const screenStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    color: colors.title,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: colors.secondary,
    fontSize: 16,
    lineHeight: 24,
  },
});
