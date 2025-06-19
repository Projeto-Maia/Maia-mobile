import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { QuizQuestion } from "../types";
import { colors } from "../theme/colors";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    axios
      .get<QuizQuestion[]>("https://maia-back-production.up.railway.app/quiz")
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => console.error("Erro ao buscar o quiz!", error));
  }, []);

  const renderItem = ({ item }: { item: QuizQuestion }) => (
    <View style={styles.card}>
      <Text style={styles.questionText}>{item.questionText}</Text>
    </View>
  );

  return (
    // SafeAreaView garante que o conteúdo não fique sob a status bar/notch
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Educativo</Text>
        <Text style={styles.subtitle}>Responda e aprenda a identificar os sinais de um relacionamento abusivo.</Text>

        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate("Map")}>
          <Text style={styles.mapButtonText}>Ver Mapa de Apoio no DF</Text>
        </TouchableOpacity>

        <FlatList data={quiz} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} style={styles.list} />
      </View>
    </SafeAreaView>
  );
};

// Folha de estilos usando as cores do tema
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.headline,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.paragraph,
    marginBottom: 24,
  },
  mapButton: {
    backgroundColor: colors.button,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  mapButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    color: colors.paragraph,
    lineHeight: 24,
  },
});

export default HomeScreen;
