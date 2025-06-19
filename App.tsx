import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  // O App.tsx só tem a responsabilidade de carregar o navegador principal.
  return <AppNavigator />;
}
