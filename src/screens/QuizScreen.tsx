import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { QuizQuestion, QuizAnswer } from "../types";
import { ApiService } from "../services/ApiService";
import { colors } from "../theme/colors";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Quiz">;
};

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca as perguntas da API quando a tela carrega
    ApiService.getQuestions() // Usando um ApiService estático como exemplo
      .then((data: QuizQuestion[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (questionId: number, selectedOptionId: string) => {
    const newAnswers = [...userAnswers, { questionId, selectedOptionId }];
    setUserAnswers(newAnswers);

    // Verifica se é a última pergunta
    if (currentQuestionIndex === questions.length - 1) {
      // Navega para a tela de resultados, passando as respostas
      navigation.replace("Results", { answers: newAnswers });
    } else {
      // Vai para a próxima pergunta
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.questionCounter}>
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </Text>
        <Text style={styles.questionText}>{currentQuestion?.questionText}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion?.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleAnswer(currentQuestion.id, option.id)}>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  questionCounter: { fontSize: 16, color: colors.paragraph, textAlign: "center", marginBottom: 20 },
  questionText: { fontSize: 24, fontWeight: "bold", color: colors.headline, textAlign: "center", marginBottom: 40 },
  optionsContainer: {},
  optionButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: { fontSize: 18, color: colors.buttonText, textAlign: "center" },
});

export default QuizScreen;
