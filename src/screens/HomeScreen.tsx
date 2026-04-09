import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { MapPin, Navigation, LogOut } from 'lucide-react-native';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');

const dummyParkings = [
  {
    id: '1',
    name: 'Central Mall Parking',
    price: 50,
    availableSlots: 12,
    totalSlots: 100,
    distance: '0.8 km',
    latitude: 12.9715987,
    longitude: 77.5945627,
  },
  {
    id: '2',
    name: 'MG Road Spot C',
    price: 80,
    availableSlots: 0,
    totalSlots: 50,
    distance: '1.2 km',
    latitude: 12.972442,
    longitude: 77.600012,
  },
  {
    id: '3',
    name: 'Brigade Tech Park',
    price: 40,
    availableSlots: 45,
    totalSlots: 200,
    distance: '2.5 km',
    latitude: 12.969921,
    longitude: 77.591234,
  }
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = () => {
  const [selectedParking, setSelectedParking] = useState<typeof dummyParkings[0] | null>(null);

  const initialRegion = {
    latitude: 12.9715987,
    longitude: 77.5945627,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMarkerPress = (parking: typeof dummyParkings[0]) => {
    setSelectedParking(parking);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {dummyParkings.map((pkg) => (
          <Marker
            key={pkg.id}
            coordinate={{ latitude: pkg.latitude, longitude: pkg.longitude }}
            onPress={() => handleMarkerPress(pkg)}
          >
            <View style={[styles.markerBadge, selectedParking?.id === pkg.id && styles.markerBadgeSelected]}>
              <Text style={[styles.markerText, selectedParking?.id === pkg.id && styles.markerTextSelected]}>
                ₹{pkg.price}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={async () => {
          await supabase.auth.signOut();
        }}
      >
        <LogOut color="#DC2626" size={24} />
      </TouchableOpacity>

      <BottomSheet 
        isVisible={true} 
        onClose={() => setSelectedParking(null)}
        height={520}
      >
        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>Find a spot,{"\n"}Let's park easily.</Text>
          
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputInner}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <Text style={styles.inputText}>Current Location</Text>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputInner}>
                <MapPin size={18} color={colors.textSecondary} />
                <Text style={styles.inputText}>Search Parking...</Text>
              </View>
              <TouchableOpacity style={styles.swapButton}>
                <Navigation size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeField}>
               <Text style={styles.dateTimeText}>📅 24 Jan, 2024</Text>
            </View>
            <View style={styles.dateTimeField}>
               <Text style={styles.dateTimeText}>👤 1 Vehicle</Text>
            </View>
          </View>

          <Button 
            title="Search" 
            variant="primary"
            onPress={() => {}}
            style={styles.searchBtn}
          />

          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Booked</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentCard}>
             <View style={styles.recentIcon}>
                <MapPin size={20} color={colors.primary} />
             </View>
             <View style={styles.recentTextContainer}>
                <Text style={styles.recentName}>Central Mall Parking</Text>
                <Text style={styles.recentDate}>23 Jan 2024 | 2 Hours</Text>
             </View>
             <Navigation size={18} color={colors.primary} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  markerBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  markerText: {
    fontWeight: '700',
    color: colors.text,
  },
  markerTextSelected: {
    color: '#fff',
  },
  searchCard: {
    paddingTop: 8,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
    lineHeight: 32,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: colors.background,
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateTimeField: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateTimeText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
  },
  searchBtn: {
    marginBottom: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  seeMore: {
    color: colors.primary,
    fontWeight: '600',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  recentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTextContainer: {
    flex: 1,
  },
  recentName: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  recentDate: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
