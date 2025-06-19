import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Quiz Maia" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: "Mapa de Apoio" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
