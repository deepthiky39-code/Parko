import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

import {
  LandingScreen,
  HomeScreen,
  ParkingDetailsScreen,
  BookingScreen,
  PaymentScreen,
  QRCodeScreen,
  ScannerScreen,
  LoginScreen,
  SignupScreen,
  SlotSelectionScreen,
  AdminDashboardScreen
} from '../screens';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ParkingDetails: { id: string };
  SlotSelection: { id: string };
  Booking: { id: string; slotNumber: string };
  Payment: { id: string; slotNumber: string; duration: number; vehicleNumber: string; price: number };
  QRCode: { bookingId: string };
  Scanner: undefined;
  AdminDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Fail-safe: Ensure we stop loading after 5 seconds even if Supabase hangs
    const timeout = setTimeout(() => {
      setIsInitializing(false);
    }, 5000);

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((err) => {
        console.warn('Supabase Session Check Failed:', err.message);
      })
      .finally(() => {
        setIsInitializing(false);
        clearTimeout(timeout);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {session ? (
          // User is authenticated
          session.user.user_metadata?.role === 'admin' ? (
            // Admin Flow
            <>
              <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
              <Stack.Screen name="Scanner" component={ScannerScreen} />
            </>
          ) : (
            // Customer Flow
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="ParkingDetails" component={ParkingDetailsScreen} />
              <Stack.Screen name="SlotSelection" component={SlotSelectionScreen} />
              <Stack.Screen name="Booking" component={BookingScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="QRCode" component={QRCodeScreen} />
            </>
          )
        ) : (
          // User is NOT authenticated
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
