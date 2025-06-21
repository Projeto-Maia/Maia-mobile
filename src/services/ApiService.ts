import axios from 'axios';
import { Location, QuizQuestion } from '../types';

class ApiService {
  constructor(private readonly apiUrl: string) {}

  async getQuestions(): Promise<QuizQuestion[]> {
    try {
      const questions = await axios.get<QuizQuestion[]>(`${this.apiUrl}/quiz`);
      return questions.data;
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
      throw new Error('Não foi possível carregar as perguntas do quiz.');
    }
  }

  async getLocations(): Promise<Location[]> {
    try {
      const locations = await axios.get<Location[]>(`${this.apiUrl}/locations`);
      return locations.data;
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
      throw new Error('Não foi possível carregar os locais de apoio.');
    }
  }
}

const apiService = new ApiService('https://maia-back-production.up.railway.app');
export { apiService as ApiService }; // Exportando uma instância estática
