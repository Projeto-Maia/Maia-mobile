import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QuizQuestion, QuizAnswer, QuizOption } from '../types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  question: QuizQuestion;
  userAnswer: QuizAnswer;
  isExpanded: boolean;
  onPress: () => void;
};

const ResultCard: React.FC<Props> = ({ question, userAnswer, isExpanded, onPress }) => {
  const selectedOption = question.options.find(opt => opt.id === userAnswer.selectedOptionId);
  const hasRedFlag = selectedOption?.redFlag === true;

  return (
    <TouchableOpacity
      style={[styles.card, hasRedFlag ? styles.cardRedFlag : styles.cardOk]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.questionText}>{question.questionText}</Text>
        <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>▼</Text>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {question.options.map(option => (
            <View key={option.id} style={styles.optionRow}>
              <View style={[styles.radioCircle, option.id === selectedOption?.id && styles.radioCircleSelected]} />
              <Text style={styles.optionText}>{option.text}</Text>
            </View>
          ))}
          <Text style={styles.explanationTitle}>Explicação da Pergunta:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12
  },
  cardRedFlag: {
    backgroundColor: colors.accent // Rosa claro do tema
  },
  cardOk: {
    backgroundColor: '#E0F2F1' // Um verde/azul claro
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questionText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.secondary,
    flex: 1,
    marginRight: 10
  },
  chevron: {
    fontSize: 18,
    color: colors.secondary,
    transform: [{ rotate: '0deg' }]
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }]
  },
  expandedContent: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 15
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginRight: 12
  },
  radioCircleSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  optionText: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 15,
    color: colors.secondary,
    flex: 1
  },
  explanationTitle: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.primary,
    marginTop: 15,
    marginBottom: 5
  },
  explanationText: {
    fontFamily: typography.fontFamilyRegular,
    fontSize: 15,
    color: colors.secondary,
    lineHeight: 22
  }
});

export default ResultCard;
