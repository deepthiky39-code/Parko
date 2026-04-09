import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { QrCode, LogOut, Users, Car, AlertCircle, TrendingUp, CreditCard, User, Wifi, Server, MapIcon, ChevronRight } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import { ProgressChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

type AdminDashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;

interface Props {
  navigation: AdminDashboardNavigationProp;
}

// Dummy data for Rich Analytics MVP
const stats = {
  adminName: 'Rohan Sharma',
  adminStation: 'Bangalore HQ',
  totalLots: 2,
  totalSlots: 100,
  occupiedSlots: 74,
  revenueToday: 18500,
  weeklyRevenueData: [4500, 6000, 8000, 5000, 12000, 15000, 18500],
  peakHours: {
    labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
    datasets: [{ data: [20, 45, 80, 75, 90, 85, 40] }]
  },
  parkingsProgress: {
    labels: ['Central', 'Brigade'], 
    data: [0.9, 0.4] 
  },
  lotsHealth: [
    { id: '1', name: 'Central Mall', status: 'Online', occupancy: '18/20', health: 95 },
    { id: '2', name: 'Brigade Tech', status: 'Online', occupancy: '20/50', health: 88 }
  ],
  recentTransactions: [
    { id: 'TXN-001', spot: 'A1 - Central', amount: 150, time: '10 mins ago', status: 'Paid', type: 'Booking' },
    { id: 'TXN-002', spot: 'B4 - Central', amount: 80, time: '25 mins ago', status: 'Paid', type: 'Booking' },
    { id: 'TXN-003', spot: 'C2 - Brigade', amount: 120, time: '1 hr ago', status: 'Paid', type: 'Payment' },
    { id: 'TXN-004', spot: 'A2 - Brigade', amount: 400, time: '3 hrs ago', status: 'Active', type: 'Booking' },
  ]
};

export const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'manage'>('overview');
  const [activityFilter, setActivityFilter] = useState<'All' | 'Booking' | 'Payment'>('All');
  const tabs: Array<'overview' | 'activity' | 'manage'> = ['overview', 'activity', 'manage'];
  const activityFilters: Array<'All' | 'Booking' | 'Payment'> = ['All', 'Booking', 'Payment'];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const donutConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1, index?: number) => {
      if (index === 0) return `rgba(239, 68, 68, ${opacity})`; // Central (Busy)
      return `rgba(22, 163, 74, ${opacity})`; // Brigade (Open)
    },
    labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
  };

  const barChartConfig = {
    ...chartConfig,
    fillShadowGradient: colors.primary,
    fillShadowGradientOpacity: 1,
  };

  const filteredTransactions = stats.recentTransactions.filter(tx => 
    activityFilter === 'All' || tx.type === activityFilter
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarBox}>
            <User color="#fff" size={24} />
          </View>
          <View>
            <Text style={styles.headerTitle}>{stats.adminName}</Text>
            <Text style={styles.headerSubtitle}>{stats.adminStation}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={async () => await supabase.auth.signOut()}
        >
          <LogOut color={colors.error} size={22} />
        </TouchableOpacity>
      </View>

      {/* Primary Navigation Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0) ? tab.charAt(0).toUpperCase() + tab.slice(1) : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {activeTab === 'overview' && (
          <>
            {/* Action Card: Scanner */}
            <Card style={styles.scannerCard}>
              <View style={styles.scannerRow}>
                <View style={styles.scannerIconOuter}>
                  <QrCode color="#fff" size={28} />
                </View>
                <View style={styles.scannerInfo}>
                  <Text style={styles.scannerTitle}>Quick Validator</Text>
                  <Text style={styles.scannerSub}>Check customer passes at entry point</Text>
                </View>
              </View>
              <Button 
                title="Open Scanner" 
                onPress={() => navigation.navigate('Scanner')}
                style={styles.scannerButton}
              />
            </Card>

            <View style={styles.kpiContainer}>
              <Card style={styles.kpiBox}>
                <TrendingUp size={20} color={colors.success} style={{ marginBottom: 8 }} />
                <Text style={styles.kpiValue}>₹{stats.revenueToday.toLocaleString()}</Text>
                <Text style={styles.kpiLabel}>Revenue Today</Text>
              </Card>
              <Card style={styles.kpiBox}>
                <Users size={20} color={colors.primary} style={{ marginBottom: 8 }} />
                <Text style={styles.kpiValue}>{stats.occupiedSlots}%</Text>
                <Text style={styles.kpiLabel}>Peak Load</Text>
              </Card>
            </View>

            {/* Peak Hours Analysis */}
            <Text style={styles.sectionTitle}>Peak Occupancy Trends</Text>
            <Card style={styles.chartCard}>
              <BarChart
                data={stats.peakHours}
                width={width - 48}
                height={200}
                yAxisLabel=""
                yAxisSuffix="%"
                chartConfig={barChartConfig}
                verticalLabelRotation={0}
                showValuesOnTopOfBars
                fromZero
                style={styles.barChartStyle}
              />
              <Text style={styles.chartLegend}>Hours (Estimated Daily average)</Text>
            </Card>

            {/* Capacity Progress */}
            <Text style={styles.sectionTitle}>Facility Distribution</Text>
            <Card style={styles.chartCard}>
              <ProgressChart
                data={stats.parkingsProgress}
                width={width - 56}
                height={160}
                strokeWidth={12}
                radius={32}
                chartConfig={donutConfig}
                hideLegend={false}
              />
              <View style={styles.statusLegend}>
                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#EF4444' }]} /><Text style={styles.legendText}>Central Mall (Critical)</Text></View>
                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#16A34A' }]} /><Text style={styles.legendText}>Brigade Road (Ready)</Text></View>
              </View>
            </Card>
          </>
        )}

        {activeTab === 'activity' && (
          <>
            <View style={styles.filterRow}>
              {activityFilters.map(filter => (
                <TouchableOpacity 
                  key={filter}
                  style={[styles.filterBtn, activityFilter === filter && styles.filterBtnActive]}
                  onPress={() => setActivityFilter(filter)}
                >
                  <Text style={[styles.filterBtnText, activityFilter === filter && styles.filterBtnTextActive]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.txList}>
              {filteredTransactions.map((tx) => (
                <View key={tx.id} style={styles.txItem}>
                  <View style={styles.txIconBox}>
                    {tx.type === 'Booking' ? <Car color={colors.primary} size={18} /> : <CreditCard color={colors.success} size={18} />}
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={styles.txSpot}>{tx.spot}</Text>
                    <Text style={styles.txTime}>{tx.time}  ·  {tx.id}</Text>
                  </View>
                  <View style={styles.txPriceCol}>
                    <Text style={styles.txAmount}>₹{tx.amount}</Text>
                    <View style={[styles.txStatusBadge, tx.status === 'Active' ? { backgroundColor: '#DBEAFE' } : { backgroundColor: '#DCFCE7' }]}>
                      <Text style={[styles.txStatusText, tx.status === 'Active' ? { color: colors.primary } : { color: colors.success }]}>{tx.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            
            <Card style={styles.alertCard}>
              <AlertCircle color="#DC2626" size={24} style={styles.alertIcon} />
              <View style={styles.alertTextCol}>
                <Text style={styles.alertTitle}>Hardware Alert</Text>
                <Text style={styles.alertSub}>Camera #4 at Central Mall is offline.</Text>
              </View>
            </Card>
          </>
        )}

        {activeTab === 'manage' && (
          <>
            <Text style={styles.sectionTitle}>Infrastructure Health</Text>
            <Card style={styles.healthCard}>
              <View style={styles.healthHeader}>
                <Server size={20} color={colors.textSecondary} />
                <Text style={styles.healthTitle}>Overall System Health</Text>
                <Text style={styles.healthPercentage}>94%</Text>
              </View>
              <View style={styles.healthBarContainer}>
                <View style={[styles.healthBarFill, { width: '94%' }]} />
              </View>
              <View style={styles.healthDetails}>
                <View style={styles.healthDetailItem}><Wifi size={14} color={colors.success} /><Text style={styles.healthDetailText}>Api Gateway: Stable</Text></View>
                <View style={styles.healthDetailItem}><Server size={14} color={colors.success} /><Text style={styles.healthDetailText}>Database: Live</Text></View>
              </View>
            </Card>

            <Text style={styles.sectionTitle}>Facility Controls</Text>
            {stats.lotsHealth.map(lot => (
              <Card key={lot.id} style={styles.lotControlCard}>
                <View style={styles.lotControlRow}>
                  <View style={styles.lotControlInfo}>
                    <MapIcon size={20} color={colors.primary} style={{ marginBottom: 4 }} />
                    <Text style={styles.lotName}>{lot.name}</Text>
                    <Text style={styles.lotOccupancy}>{lot.occupancy} Slots filled</Text>
                  </View>
                  <Switch value={true} trackColor={{ false: '#ddd', true: colors.primary }} />
                </View>
                <TouchableOpacity style={styles.viewLotDetails}>
                  <Text style={styles.viewLotText}>Detailed Configuration</Text>
                  <ChevronRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </Card>
            ))}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  logoutButton: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 10 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 20 },
  tab: { paddingVertical: 14, marginRight: 24, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: colors.primary },
  tabText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.textSecondary },
  activeTabText: { color: colors.primary },
  scrollContent: { padding: 16, paddingBottom: 40 },
  scannerCard: { backgroundColor: colors.primary, padding: 20, marginBottom: 20, borderRadius: 16 },
  scannerRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  scannerIconOuter: { width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  scannerInfo: { flex: 1 },
  scannerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: '#fff', marginBottom: 2 },
  scannerSub: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.8)' },
  scannerButton: { backgroundColor: '#fff', height: 44 },
  kpiContainer: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  kpiBox: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'flex-start' },
  kpiValue: { fontSize: typography.sizes.xl, fontWeight: '800', color: colors.text, marginBottom: 2 },
  kpiLabel: { fontSize: typography.sizes.xs, color: colors.textSecondary, fontWeight: '500' },
  sectionTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.text, marginTop: 12, marginBottom: 12 },
  chartCard: { padding: 16, marginBottom: 20, borderRadius: 16 },
  barChartStyle: { marginVertical: 8, borderRadius: 16, marginLeft: -16 },
  chartLegend: { fontSize: typography.sizes.xs, color: colors.textSecondary, textAlign: 'center', marginTop: 8 },
  statusLegend: { marginTop: 16, gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterBtnText: { fontSize: typography.sizes.xs, fontWeight: '600', color: colors.textSecondary },
  filterBtnTextActive: { color: '#fff' },
  txList: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  txItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  txIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txDetails: { flex: 1 },
  txSpot: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.text, marginBottom: 2 },
  txTime: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  txPriceCol: { alignItems: 'flex-end' },
  txAmount: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.text },
  txStatusBadge: { marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  txStatusText: { fontSize: 10, fontWeight: '700' },
  alertCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FEF2F2', borderColor: '#FECACA', marginTop: 20, borderWidth: 1, borderRadius: 16 },
  alertIcon: { marginRight: 12 },
  alertTextCol: { flex: 1 },
  alertTitle: { fontSize: typography.sizes.sm, fontWeight: '700', color: '#991B1B' },
  alertSub: { fontSize: 11, color: '#B91C1C' },
  healthCard: { padding: 16, borderRadius: 16, marginBottom: 20 },
  healthHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  healthTitle: { flex: 1, fontSize: typography.sizes.sm, fontWeight: '700', color: colors.text },
  healthPercentage: { fontSize: typography.sizes.sm, fontWeight: '800', color: colors.success },
  healthBarContainer: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, marginBottom: 12, overflow: 'hidden' },
  healthBarFill: { height: '100%', backgroundColor: colors.success },
  healthDetails: { flexDirection: 'row', gap: 16 },
  healthDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  healthDetailText: { fontSize: 11, color: colors.textSecondary, fontWeight: '500' },
  lotControlCard: { padding: 16, borderRadius: 16, marginBottom: 12 },
  lotControlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  lotControlInfo: { flex: 1 },
  lotName: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.text, marginBottom: 2 },
  lotOccupancy: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  viewLotDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  viewLotText: { fontSize: typography.sizes.xs, fontWeight: '600', color: colors.primary },
});
