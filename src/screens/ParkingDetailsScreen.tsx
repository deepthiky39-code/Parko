import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { MapPin, Navigation, ArrowLeft, Clock } from 'lucide-react-native';
import { parkings } from '../data/dummyData';

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ParkingDetails'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'ParkingDetails'>;

interface Props {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

export const ParkingDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;
  const parking = parkings.find(p => p.id === id) || parkings[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ArrowLeft color={colors.text} size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Fake Map Preview */}
        <View style={styles.mapPreview}>
          <View style={styles.marker}>
            <MapPin color="#fff" size={20} />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{parking.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.price}>₹{parking.price}</Text>
              <Text style={styles.perHour}>/hr</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{parking.location}</Text>
          </View>

          <View style={styles.locationRow}>
            <Navigation size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{parking.distance} from your location</Text>
          </View>

          <View style={styles.splitCards}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Available</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{parking.availableSlots}</Text>
                <Text style={styles.statTotal}>/{parking.totalSlots}</Text>
              </View>
              <Badge 
                label={parking.availableSlots > 0 ? 'Status: Good' : 'Status: Full'} 
                status={parking.availableSlots > 0 ? 'success' : 'error'} 
              />
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Timings</Text>
              <View style={styles.statValueRow}>
                <Clock size={20} color={colors.text} />
                <Text style={styles.statValue}>24x7</Text>
              </View>
              <Text style={styles.statTotal}>Open all days</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Select Slot" 
          disabled={parking.availableSlots === 0}
          onPress={() => navigation.navigate('SlotSelection', { id: parking.id })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  mapPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  infoContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    flex: 1,
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text,
    marginRight: 16,
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  perHour: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  locationText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  splitCards: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 8,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  statTotal: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  footer: {
    padding: 20,
    paddingBottom: 32, // for safe area bottom if not using a hook
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
