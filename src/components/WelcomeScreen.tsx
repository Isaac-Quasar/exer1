import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type Props = StackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ route }) => {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Gracias por registrarte, {email}.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default WelcomeScreen;
