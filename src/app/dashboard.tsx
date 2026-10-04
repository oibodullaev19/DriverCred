import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'driver' | 'employer';
  companyName?: string;
};

export default function DashboardScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        router.replace('/login');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          Alert.alert(
            'Profile Not Found',
            'We could not find your DriverCred profile.'
          );
        }
      } catch (error) {
        Alert.alert(
          'Unable to Load Profile',
          'There was a problem loading your DriverCred profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      Alert.alert(
        'Logout Failed',
        'Unable to log out. Please try again.'
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#07569C"
        />

        <Text style={styles.loadingText}>
          Loading DriverCred...
        </Text>
      </View>
    );
  }

  const isEmployer = profile?.role === 'employer';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>
            DriverCred
          </Text>

          <Text style={styles.tagline}>
            Verified Careers. Trusted Drivers.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#07569C"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeCard}>
        <View style={styles.iconCircle}>
          <Ionicons
            name={
              isEmployer
                ? 'business-outline'
                : 'person-outline'
            }
            size={34}
            color="#FFFFFF"
          />
        </View>

        <Text style={styles.welcomeText}>
          Welcome, {profile?.firstName || 'User'}
        </Text>

        {isEmployer && profile?.companyName ? (
          <Text style={styles.companyText}>
            {profile.companyName}
          </Text>
        ) : null}

        <Text style={styles.emailText}>
          {profile?.email || user?.email}
        </Text>

        <View style={styles.accountTypeRow}>
          <Ionicons
            name={
              isEmployer
                ? 'business-outline'
                : 'car-outline'
            }
            size={18}
            color="#07569C"
          />

          <Text style={styles.accountTypeText}>
            {isEmployer
              ? 'Employer Account'
              : 'Driver Account'}
          </Text>
        </View>

        <View style={styles.verifiedRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#35A936"
          />

          <Text style={styles.verifiedText}>
            Email Verified
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        {isEmployer
          ? 'Employer Dashboard'
          : 'Driver Dashboard'}
      </Text>

      {isEmployer ? (
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="search-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              Driver Search
            </Text>

            <Text style={styles.menuDescription}>
              Search for professional driver profiles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={32}
              color="#35A936"
            />

            <Text style={styles.menuTitle}>
              Verification Requests
            </Text>

            <Text style={styles.menuDescription}>
              Manage employment verification requests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="clipboard-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              Driver Evaluations
            </Text>

            <Text style={styles.menuDescription}>
              Create and review driver evaluations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="business-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              Company Profile
            </Text>

            <Text style={styles.menuDescription}>
              Manage company information
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="person-circle-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              My Profile
            </Text>

            <Text style={styles.menuDescription}>
              Manage your DriverCred profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="briefcase-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              Employment
            </Text>

            <Text style={styles.menuDescription}>
              View employment information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={32}
              color="#35A936"
            />

            <Text style={styles.menuTitle}>
              Verification
            </Text>

            <Text style={styles.menuDescription}>
              View verification status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <Ionicons
              name="settings-outline"
              size={32}
              color="#07569C"
            />

            <Text style={styles.menuTitle}>
              Settings
            </Text>

            <Text style={styles.menuDescription}>
              Account and privacy settings
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brand: {
    fontSize: 27,
    fontWeight: '800',
    color: '#07569C',
  },

  tagline: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 32,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#07569C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },

  companyText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#07569C',
  },

  emailText: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },

  accountTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },

  accountTypeText: {
    color: '#07569C',
    fontSize: 14,
    fontWeight: '600',
  },

  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },

  verifiedText: {
    color: '#35A936',
    fontSize: 14,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 34,
    marginBottom: 16,
  },

  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  menuCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    minHeight: 145,
  },

  menuTitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },

  menuDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: '#64748B',
  },
});
