import { Stack } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'Tajawal': require('../assets/fonts/Tajawal.ttf'),
    'TajawalRegular': require('../assets/fonts/TajawalRegular.ttf'),
  });
  
  AsyncStorage.clear()
  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem('isAppFirstLaunched', 'false');
          router.replace('/onboarding');
        } else {
          setIsAppFirstLaunched(false);
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
        setIsAppFirstLaunched(false);
        router.replace('/(tabs)');
      }
    };

    if (fontsLoaded) {
      checkIfFirstLaunch();
    }
  }, [fontsLoaded, router]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isAppFirstLaunched === null) {
    return null;
  }

  return (
    <ToastProvider
      placement="top"
      duration={4000}
      animationType="slide-in"
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="gray"
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </ToastProvider>
  );
}

