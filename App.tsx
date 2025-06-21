import 'react-native-gesture-handler';
import React from 'react';
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    WorkSans_400Regular
  });
  if (!fontsLoaded) {
    return null;
  }
  return <AppNavigator />;
}
