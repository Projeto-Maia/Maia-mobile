import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

// Tipagem para as props de navegação e rota
type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Results">;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, "Results">;

type Props = {
  navigation: ResultsScreenNavigationProp;
};

const ResultsScreen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<ResultsScreenRouteProp>();
  const { answers } = route.params;

  // Lógica para verificar se alguma red flag foi selecionada
  // Esta lógica precisa do array de perguntas completo. Para o hackathon,
  // poderíamos passá-lo via navegação ou buscá-lo novamente.
  // Por simplicidade, vamos assumir que a API retorna um campo 'redFlag' na opção selecionada.
  // A lógica real precisaria cruzar as respostas com os dados das perguntas.
  const hasRedFlags = useMemo(() => {
    // Esta é uma SIMPLIFICAÇÃO. A lógica real precisa dos dados das perguntas.
    // Se você tiver os dados completos das perguntas, pode fazer:
    // return answers.some(answer => {
    //   const question = allQuestions.find(q => q.id === answer.questionId);
    //   const option = question?.options.find(o => o.id === answer.selectedOptionId);
    //   return option?.redFlag === true;
    // });
    return true; // Vamos forçar a mensagem de alerta para a demo
  }, [answers]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finalizado</Text>
        <Text style={styles.subtitle}>
          {hasRedFlags
            ? "Obrigada por sua confiança. Notamos que algumas de suas respostas indicam situações de risco que merecem atenção, considere buscar apoio profissional."
            : "Obrigada por refletir sobre sua segurança. Conhecimento é o primeiro passo para a proteção!"}
        </Text>
        <Text style={styles.recommendation}>
          Lembre-se: você não está sozinha. Ajuda profissional, gratuita e confidencial está disponível.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Map")}>
          <Text style={styles.buttonText}>Encontrar Locais de Apoio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.popToTop()}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: colors.headline, textAlign: "center", marginBottom: 16 },
  subtitle: { fontSize: 18, color: colors.paragraph, textAlign: "center", lineHeight: 26, marginBottom: 24 },
  recommendation: { fontSize: 16, fontStyle: "italic", color: colors.paragraph, textAlign: "center", marginBottom: 40 },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: colors.buttonText, fontSize: 18, fontWeight: "bold" },
  secondaryButton: { backgroundColor: "transparent", borderWidth: 2, borderColor: colors.button, marginTop: 15 },
  secondaryButtonText: { color: colors.button },
});

export default ResultsScreen;
