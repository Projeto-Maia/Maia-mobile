export interface QuizOption {
  id: string;
  text: string;
  redFlag: boolean;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  description: string;
  latitude: number;
  longitude: number;
}
