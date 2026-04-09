import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { ChevronLeft } from 'lucide-react-native';
import { parkings } from '../data/dummyData';

type SlotSelectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SlotSelection'>;
type SlotSelectionRouteProp = RouteProp<RootStackParamList, 'SlotSelection'>;

interface Props {
  navigation: SlotSelectionNavigationProp;
  route: SlotSelectionRouteProp;
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = [1, 2, 3, 4];

interface Slot {
  id: string;
  status: 'available' | 'occupied';
}

const generateSlots = (): Slot[] => {
  const slots: Slot[] = [];
  ROWS.forEach(r => {
    COLS.forEach(c => {
      const isOccupied = Math.random() > 0.6; 
      slots.push({
        id: `${r}${c}`,
        status: isOccupied ? 'occupied' : 'available'
      });
    });
  });
  return slots;
};

const initialSlots = generateSlots();

export const SlotSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;
  const parking = parkings.find(p => p.id === id) || parkings[0];
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose your slot</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {ROWS.map((row) => (
            <View key={row} style={styles.rowContainer}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seatsRow}>
                {COLS.map((col) => {
                  const slotId = `${row}${col}`;
                  const slot = initialSlots.find(s => s.id === slotId);
                  const isSelected = selectedSlot === slotId;
                  const isOccupied = slot?.status === 'occupied';

                  return (
                    <TouchableOpacity
                      key={slotId}
                      style={[
                        styles.slot,
                        isOccupied ? styles.slotOccupied : styles.slotAvailable,
                        isSelected && styles.slotSelected,
                        (col === 2) && { marginRight: 40 } // Aisle
                      ]}
                      disabled={isOccupied}
                      onPress={() => setSelectedSlot(slotId)}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.slotAvailable]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.slotOccupied]} />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.slotSelected]} />
            <Text style={styles.legendText}>Chosen</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Next" 
          onPress={() => navigation.navigate('Booking', { id: parking.id, slotNumber: selectedSlot! })}
          disabled={!selectedSlot}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  gridContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rowLabel: {
    width: 20,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  seatsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  slot: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  slotAvailable: {
    backgroundColor: '#D0EFFF',
  },
  slotOccupied: {
    backgroundColor: '#E2E8F0',
  },
  slotSelected: {
    backgroundColor: colors.primary,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 16,
  },
});
