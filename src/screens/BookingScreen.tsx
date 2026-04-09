import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ArrowLeft } from 'lucide-react-native';
import { parkings } from '../data/dummyData';

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const DURATIONS = [1, 2, 3, 4, 12, 24]; // hours

export const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, slotNumber } = route.params;
  const parking = parkings.find(p => p.id === id) || parkings[0];
  
  const [duration, setDuration] = useState<number>(2);
  const [vehicleNumber, setVehicleNumber] = useState<string>('');

  const totalPrice = parking.price * duration;
  const convenienceFee = 10;
  const finalPrice = totalPrice + convenienceFee;

  const handleProceed = () => {
    navigation.navigate('Payment', {
      id: parking.id,
      slotNumber,
      duration,
      vehicleNumber,
      price: finalPrice,
    });
  };

  const isFormValid = vehicleNumber.trim().length >= 4;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ArrowLeft color={colors.text} size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Book Spot</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.summaryCard}>
          <Text style={styles.parkingName}>{parking.name}</Text>
          <Text style={styles.parkingLocation}>{parking.location}</Text>
          <View style={styles.slotBadge}>
            <Text style={styles.slotBadgeText}>Slot {slotNumber}</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.durationGrid}>
            {DURATIONS.map(hours => (
              <TouchableOpacity
                key={hours}
                style={[
                  styles.durationButton,
                  duration === hours && styles.durationButtonActive
                ]}
                onPress={() => setDuration(hours)}
              >
                <Text style={[
                  styles.durationText,
                  duration === hours && styles.durationTextActive
                ]}>
                  {hours} {hours === 1 ? 'hr' : 'hrs'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <Input 
            placeholder="e.g. KA 01 AB 1234"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Parking Fee ({duration} hrs)</Text>
            <Text style={styles.breakdownValue}>₹{totalPrice}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Convenience Fee</Text>
            <Text style={styles.breakdownValue}>₹{convenienceFee}</Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{finalPrice}</Text>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={`Proceed to Pay  ·  ₹${finalPrice}`}
          onPress={handleProceed}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '600', color: colors.text },
  scrollContent: { padding: 20, paddingBottom: 40 },
  summaryCard: { marginBottom: 24, backgroundColor: colors.primary, position: 'relative' },
  parkingName: { fontSize: typography.sizes.lg, fontWeight: '700', color: '#fff', marginBottom: 4 },
  parkingLocation: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.8)' },
  slotBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  slotBadgeText: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.primary },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.text, marginBottom: 12 },
  durationGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  durationButton: {
    width: '30%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  durationButtonActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  durationText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.textSecondary },
  durationTextActive: { color: colors.primary },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  breakdownValue: { fontSize: typography.sizes.sm, color: colors.text, fontWeight: '500' },
  totalRow: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.text },
  totalAmount: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.primary },
  footer: { padding: 20, paddingBottom: 32, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border },
});
