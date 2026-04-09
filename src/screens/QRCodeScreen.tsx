import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { QrCode, ChevronLeft, Share2, MapPin, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type QRCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QRCode'>;
type QRCodeScreenRouteProp = RouteProp<RootStackParamList, 'QRCode'>;

interface Props {
  navigation: QRCodeScreenNavigationProp;
  route: QRCodeScreenRouteProp;
}

export const QRCodeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { bookingId } = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        message: `My Parko Ticket ID: ${bookingId}. Scan at entry!`,
      });
    } catch (error) {
      console.warn('Share failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E0F2FE', '#00A8FF']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <ChevronLeft color={colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Ticket</Text>
          <TouchableOpacity onPress={onShare}>
            <Share2 color={colors.text} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={styles.userSection}>
                 <View style={styles.avatar} />
                 <View>
                    <Text style={styles.userName}>James Wilson</Text>
                    <Text style={styles.userRole}>Passenger</Text>
                 </View>
              </View>
            </View>

            <View style={styles.routeRow}>
               <View>
                  <Text style={styles.locationTitle}>Entry</Text>
                  <Text style={styles.locationName}>Main Gate</Text>
               </View>
               <View style={styles.connector}>
                 <View style={styles.connectorLine} />
                 <View style={styles.connectorIcon}>
                    <MapPin size={16} color="#fff" />
                 </View>
                 <View style={styles.connectorLine} />
               </View>
               <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.locationTitle}>Spot</Text>
                  <Text style={styles.locationName}>Level 2, A12</Text>
               </View>
            </View>

            <View style={styles.dateTimeRow}>
               <View style={styles.dateTimeItem}>
                  <Text style={styles.dateText}>24 Jan, 2024</Text>
               </View>
               <View style={styles.dateTimeItem}>
                  <Clock size={16} color={colors.textSecondary} />
                  <Text style={styles.timeText}>03:45 PM</Text>
               </View>
            </View>

            <View style={styles.dashedLineContainer}>
               <View style={styles.semiCircleLeft} />
               <View style={styles.dashedLine} />
               <View style={styles.semiCircleRight} />
            </View>

            <View style={styles.qrSection}>
               <View style={styles.qrWrapper}>
                  <QrCode size={180} color={colors.text} strokeWidth={1.5} />
               </View>
               <Text style={styles.bookingId}>#{bookingId.toString().padStart(6, '0')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Download Ticket" 
            variant="primary"
            onPress={() => {}}
            style={styles.downloadBtn}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  ticketHeader: {
    marginBottom: 24,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  userRole: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  locationTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  connector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  connectorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    borderStyle: 'dashed',
  },
  connectorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dashedLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -24,
    marginBottom: 32,
  },
  semiCircleLeft: {
    width: 24,
    height: 48,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#00A8FF', // Same as background
    marginLeft: -1,
  },
  semiCircleRight: {
    width: 24,
    height: 48,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: '#00A8FF', // Same as background
    marginRight: -1,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  qrSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  bookingId: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 4,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 16,
  },
  downloadBtn: {
    backgroundColor: '#fff',
  }
});
