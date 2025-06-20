import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import MapScreen from "../screens/MapScreen";
import { QuizAnswer } from "../types";
import ResultsScreen from "../screens/ResultsScreen";

// Atualize a "lista de rotas"
export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Map: undefined;
  Results: { answers: QuizAnswer[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      {/* Escondemos o header padrão para ter mais controle do design em cada tela */}
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
