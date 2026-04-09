import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const { width } = Dimensions.get('window');

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

export const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E0F2FE', '#F8FAFC']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      
      <SafeAreaView style={styles.content}>
        <View style={styles.illustrationContainer}>
           <Text style={styles.heroBackgroundText}>PARKO</Text>
           <Image 
             source={require('../../assets/po_logo.png')} 
             style={styles.heroImage}
             resizeMode="contain"
           />
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>We're going on a trip.</Text>
          <Text style={styles.subtitle}>Are you in?</Text>

          <Button 
            title="Get started" 
            variant="primary"
            onPress={() => navigation.navigate('Signup')}
            style={styles.getStartedBtn}
          />
          
          <Button 
            title="Sign In" 
            variant="outline"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  heroBackgroundText: {
    position: 'absolute',
    fontSize: 100,
    fontWeight: '900',
    color: 'rgba(0, 168, 255, 0.08)',
    letterSpacing: -5,
  },
  heroImage: {
    width: width * 0.9,
    height: width * 0.9,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  getStartedBtn: {
    marginBottom: 16,
  }
});
