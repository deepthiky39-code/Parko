import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { CheckCircle2 } from 'lucide-react-native';
import { parkings } from '../data/dummyData';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
}

export const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, slotNumber, duration, vehicleNumber, price } = route.params;
  const parking = parkings.find(p => p.id === id) || parkings[0];

  const handleViewQR = () => {
    // We are resetting to Home with QR code on top so they can't go back to Payment easily
    navigation.reset({
      index: 1,
      routes: [
        { name: 'Home' },
        { name: 'QRCode', params: { bookingId: 'BK-98239' } },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle2 color={colors.success} size={84} />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your parking spot has been successfully reserved.</Text>

        <Card style={styles.receiptCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Parking</Text>
            <Text style={styles.value}>{parking.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Slot Number</Text>
            <Text style={styles.value}>{slotNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle</Text>
            <Text style={styles.value}>{vehicleNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{duration} hr{duration > 1 ? 's' : ''}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Amount Paid</Text>
            <Text style={styles.totalValue}>₹{price}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button 
          title="View QR Code"
          onPress={handleViewQR}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  receiptCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  value: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.success,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
  },
});
