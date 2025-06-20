import axios from "axios";
import { QuizQuestion } from "../types";

class ApiService {
  constructor(private readonly apiUrl: string) {}

  async getQuestions(): Promise<QuizQuestion[]> {
    try {
      const questions = await axios.get<QuizQuestion[]>(`${this.apiUrl}/quiz`);
      return questions.data;
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
      throw new Error("Não foi possível carregar as perguntas do quiz.");
    }
  }
}

const apiService = new ApiService("https://maia-back-production.up.railway.app");
export { apiService as ApiService }; // Exportando uma instância estática
