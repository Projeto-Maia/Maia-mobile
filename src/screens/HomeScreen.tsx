import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Adicionar a logo quando estiver pronta */}
        {/* <Image source={require('../assets/maia-logo.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Bem-vinda à Maia</Text>
        <Text style={styles.subtitle}>
          Um espaço seguro para você aprender a identificar sinais de um relacionamento abusivo e encontrar caminhos
          para o apoio e a segurança.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Quiz")}>
          <Text style={styles.buttonText}>Iniciar Quiz Educativo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.headline,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.paragraph,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
