import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.delay(3000),

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/login');
    });
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={require('../../assets/images/drivercred-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.message}>
          A verified professional reputation & employment verification platform
          for commercial drivers
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  content: {
    alignItems: 'center',
    marginTop: -120,
  },

  logo: {
    width: 280,
    height: 210,
    marginBottom: 10,
  },

  message: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
  },
});