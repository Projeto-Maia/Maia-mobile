import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { QuizQuestion, QuizAnswer } from '../types';
import { ApiService } from '../services/ApiService';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Quiz'>;
};

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getQuestions()
      .then(data => {
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          setError('Nenhuma pergunta foi encontrada.');
        }
      })
      .catch(err => {
        setError('Não foi possível carregar o quiz. Tente novamente mais tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (!selectedOptionId) return;
    const newAnswers = [...userAnswers, { questionId: questions[currentIndex].id, selectedOptionId }];
    setUserAnswers(newAnswers);
    if (currentIndex === questions.length - 1) {
      navigation.replace('Results', { answers: newAnswers });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* O container principal organiza tudo com 'space-between' */}
      <View style={styles.container}>
        {/* Parte de Cima: Barra de Progresso */}
        <View style={styles.header}>
          <Text style={styles.questionCounter}>
            Pergunta {currentIndex + 1} de {questions.length}
          </Text>
          <View style={styles.progressBarContainer}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={[styles.progressSegment, index <= currentIndex ? styles.progressSegmentActive : {}]}
              />
            ))}
          </View>
        </View>

        {/* Parte do Meio: O Quiz */}
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
          <View>
            {currentQuestion.options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, selectedOptionId === option.id && styles.optionCardSelected]}
                onPress={() => setSelectedOptionId(option.id)}>
                <View style={[styles.radioCircle, selectedOptionId === option.id && styles.radioCircleSelected]} />
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Parte de Baixo: O Botão */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.navButton, !selectedOptionId && styles.navButtonDisabled]}
            onPress={handleNext}
            disabled={!selectedOptionId}>
            <Text style={styles.navButtonText}>
              {currentIndex === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 10
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 8,
    gap: 8
  },
  progressSegment: { flex: 1, backgroundColor: colors.lightGray, borderRadius: 4 },
  progressSegmentActive: { backgroundColor: colors.accent },
  questionCounter: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 12
  },
  quizContainer: {},
  footer: {
    marginBottom: 10
  },
  questionText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32
  },
  errorText: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    padding: 20
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.lightGray
  },
  optionCardSelected: { borderColor: colors.primary },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioCircleSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionText: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 16,
    color: colors.secondary,
    flex: 1,
    lineHeight: 22
  },
  navButton: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: 30, alignItems: 'center' },
  navButtonDisabled: { backgroundColor: colors.lightGray },
  navButtonText: { fontFamily: typography.fontFamilyBold, color: colors.white, fontSize: 18 }
});

export default QuizScreen;
