import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>¡Gracias por registrarte!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Fondo gris claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Color del texto
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555", // Color del texto secundario
  },
});

export default WelcomeScreen;
