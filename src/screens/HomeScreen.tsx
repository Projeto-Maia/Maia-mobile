import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo_plum.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bem-vinda à MAIA</Text>
        <Text style={styles.subtitle}>Descubra sinais de violência doméstica e encontre apoio seguro.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Iniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24
  },
  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 32,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 16
  },
  subtitle: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 50
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30
  },
  buttonText: {
    fontFamily: typography.fontFamilyBold,
    color: colors.primary,
    fontSize: 18
  }
});

export default HomeScreen;
