import { useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../config/firebase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        'Missing Email',
        'Please enter your email address.'
      );
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      Alert.alert(
        'Reset Email Sent',
        'If an account exists for this email address, a password reset link has been sent. Please check your inbox and spam folder.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      let message =
        'Unable to send the password reset email. Please try again.';

      if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        message =
          'Too many requests. Please wait a moment and try again.';
      } else if (error.code === 'auth/network-request-failed') {
        message =
          'Network error. Please check your internet connection.';
      }

      Alert.alert('Password Reset Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#07569C"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Forgot Password?
        </Text>

        <Text style={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset your password.
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={21}
            color="#64748B"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.resetButton,
            loading && styles.resetButtonDisabled,
          ]}
          onPress={handleResetPassword}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.resetButtonText}>
              Send Reset Link
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.loginText}>
            Back to Log In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    marginTop: -40,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#07569C',
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 7,
  },

  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputIcon: {
    marginLeft: 16,
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0F172A',
  },

  resetButton: {
    height: 56,
    backgroundColor: '#07569C',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  resetButtonDisabled: {
    opacity: 0.6,
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginButton: {
    alignItems: 'center',
    marginTop: 24,
  },

  loginText: {
    color: '#35A936',
    fontSize: 14,
    fontWeight: '700',
  },
});