import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AccountTypeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={26} color="#07569C" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Choose how you will use DriverCred.
      </Text>

      <TouchableOpacity
        style={styles.driverCard}
        onPress={() =>
          router.push({
            pathname: '/register',
            params: { role: 'driver' },
          })
        }
        activeOpacity={0.85}
      >
        <View style={styles.iconCircleBlue}>
          <Ionicons name="car-outline" size={38} color="#FFFFFF" />
        </View>

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>I’m a Driver</Text>
          <Text style={styles.cardDescription}>
            Build your professional profile and maintain your employment history.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="#07569C" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.employerCard}
        onPress={() =>
          router.push({
            pathname: '/register',
            params: { role: 'employer' },
          })
        }
        activeOpacity={0.85}
      >
        <View style={styles.iconCircleGreen}>
          <Ionicons name="business-outline" size={38} color="#FFFFFF" />
        </View>

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>I’m an Employer</Text>
          <Text style={styles.cardDescription}>
            Search drivers and manage employment verification requests.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="#35A936" />
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 70,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#07569C',
  },

  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 36,
  },

  driverCard: {
    minHeight: 135,
    borderWidth: 1.5,
    borderColor: '#07569C',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#F8FBFF',
  },

  employerCard: {
    minHeight: 135,
    borderWidth: 1.5,
    borderColor: '#35A936',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
  },

  iconCircleBlue: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#07569C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCircleGreen: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#35A936',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardText: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
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