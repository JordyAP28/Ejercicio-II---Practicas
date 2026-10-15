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
  label: {
    color: colors.title,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    color: colors.title,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    color: colors.secondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
});
