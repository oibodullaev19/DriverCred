import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
} from 'firebase/auth';

import { auth, db } from '../config/firebase';

import {
    doc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';

export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{ role?: string }>();

  const isEmployer = role === 'employer';
  const accountType = isEmployer ? 'Employer' : 'Driver';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing Information', 'Please complete all required fields.');
      return;
    }

    if (isEmployer && !companyName.trim()) {
      Alert.alert('Missing Information', 'Please enter your company name.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Password Too Short',
        'Your password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        role: isEmployer ? 'employer' : 'driver',
        companyName: isEmployer ? companyName.trim() : '',
        createdAt: serverTimestamp(),
      });

      const displayName = `${firstName.trim()} ${lastName.trim()}`;

      await updateProfile(userCredential.user, {
        displayName,
      });

      await sendEmailVerification(userCredential.user);

      // Keep unverified users out of the app for now.
      await signOut(auth);

      Alert.alert(
        'Verify Your Email',
        `Your ${accountType.toLowerCase()} account was created successfully.\n\nA verification email was sent to ${email.trim()}.\n\nPlease verify your email before signing in.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      let message = 'Unable to create your account. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'An account already exists with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Please choose a stronger password.';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'Network error. Please check your internet connection.';
      }

      Alert.alert('Account Creation Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#07569C" />
        </TouchableOpacity>

        <Text style={styles.title}>Create {accountType} Account</Text>

        <Text style={styles.subtitle}>
          {isEmployer
            ? 'Create an employer account to search drivers and manage verification requests.'
            : 'Create a driver account to build your professional profile and employment history.'}
        </Text>

        <Text style={styles.label}>First Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={21}
            color="#64748B"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor="#94A3B8"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
        </View>

        <Text style={styles.label}>Last Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={21}
            color="#64748B"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor="#94A3B8"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        {isEmployer && (
          <>
            <Text style={styles.label}>Company Name</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="business-outline"
                size={21}
                color="#64748B"
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your company name"
                placeholderTextColor="#94A3B8"
                value={companyName}
                onChangeText={setCompanyName}
                autoCapitalize="words"
              />
            </View>
          </>
        )}

        <Text style={styles.label}>
          {isEmployer ? 'Work Email' : 'Email'}
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
            placeholder={
              isEmployer
                ? 'Enter your work email'
                : 'Enter your email'
            }
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.label}>Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={21}
            color="#64748B"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.passwordHint}>
          Password must contain at least 6 characters.
        </Text>

        <Text style={styles.label}>Confirm Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={21}
            color="#64748B"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#94A3B8"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.createButton,
            loading && styles.createButtonDisabled,
          ]}
          onPress={handleCreateAccount}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.createButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>

          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 40,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 40,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#07569C',
    lineHeight: 36,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 14,
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

  eyeButton: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  passwordHint: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 5,
  },

  createButton: {
    height: 56,
    backgroundColor: '#07569C',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  createButtonDisabled: {
    opacity: 0.6,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  loginText: {
    color: '#64748B',
    fontSize: 14,
  },

  loginLink: {
    color: '#35A936',
    fontSize: 14,
    fontWeight: '700',
  },
});