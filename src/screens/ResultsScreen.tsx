import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { QuizQuestion, QuizAnswer } from '../types';
import ResultCard from '../components/ResultCard';
import { ApiService } from '../services/ApiService';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Results'>;
};

const ResultsScreen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Results'>>();
  const { answers: userAnswers } = route.params;

  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  useEffect(() => {
    ApiService.getQuestions().then(data => {
      setAllQuestions(data);
      setLoading(false);
    });
  }, []);

  const handleToggleExpand = (questionId: number) => {
    setExpandedQuestionId(prevId => (prevId === questionId ? null : questionId));
  };

  // Combina as perguntas com as respostas do usuário para facilitar a renderização
  const resultsData = allQuestions.map(q => ({
    question: q,
    userAnswer: userAnswers.find(a => a.questionId === q.id)!
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={resultsData}
        keyExtractor={item => item.question.id.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Resultado</Text>
            <Text style={styles.subtitle}>
              O Quiz Maia é uma forma interativa e educativa de passar informações sem a intenção de diagnóstico ou
              pânico.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <ResultCard
            question={item.question}
            userAnswer={item.userAnswer}
            isExpanded={expandedQuestionId === item.question.id}
            onPress={() => handleToggleExpand(item.question.id)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
              <Text style={styles.buttonText}>Ver Mapa de Apoio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.popToTop()}>
              <Text style={styles.linkButtonText}>Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  listContent: { paddingHorizontal: 20, paddingVertical: 10 },
  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8
  },
  subtitle: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24
  },
  footerButtons: { marginTop: 20, marginBottom: 40 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: { fontFamily: typography.fontFamilyBold, color: colors.white, fontSize: 18 },
  linkButton: { alignItems: 'center' },
  linkButtonText: { fontFamily: typography.fontFamilyBold, color: colors.secondary, fontSize: 16 }
});

export default ResultsScreen;
