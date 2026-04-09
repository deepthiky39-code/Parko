import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SCAN_BOX_SIZE = width * 0.7;

type ScannerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scanner'>;

interface Props {
  navigation: ScannerScreenNavigationProp;
}

export const ScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'failure' | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    
    // Simulate validation logic
    if (data.includes('BK') || data.length > 5) {
      setScanResult('success');
    } else {
      setScanResult('failure');
    }

    setTimeout(() => {
      setScanned(false);
      setScanResult(null);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <ArrowLeft color="#fff" size={28} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Scan Pass</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.centerContainer}>
          <View style={styles.scanBox} />
          <Text style={styles.instructionText}>
            Align QR Code within the frame
          </Text>
        </View>

        <View style={styles.footer}>
           {scanResult === 'success' && (
             <View style={[styles.resultBanner, styles.successBanner]}>
               <CheckCircle2 color="#fff" size={24} />
               <Text style={styles.resultText}>Valid Booking</Text>
             </View>
           )}
           {scanResult === 'failure' && (
             <View style={[styles.resultBanner, styles.errorBanner]}>
               <XCircle color="#fff" size={24} />
               <Text style={styles.resultText}>Invalid Pass</Text>
             </View>
           )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: typography.sizes.lg,
    fontWeight: '600',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    marginBottom: 24,
    borderRadius: 24,
  },
  instructionText: {
    color: '#fff',
    fontSize: typography.sizes.md,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  footer: {
    padding: 24,
    minHeight: 100, // Ensure fixed height even if banner is absent
    justifyContent: 'center',
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  successBanner: {
    backgroundColor: colors.success,
  },
  errorBanner: {
    backgroundColor: colors.error,
  },
  resultText: {
    color: '#fff',
    fontSize: typography.sizes.lg,
    fontWeight: '700',
  },
});
