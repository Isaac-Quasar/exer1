import React, { useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import * as yup from "yup";
import { RootStackParamList } from "../navigation/types";

type Props = StackScreenProps<RootStackParamList, "Register">;

const validationSchema = yup.object().shape({
  email: yup.string().email("Correo inválido").required("Correo requerido"),
  password: yup.string().required("Contraseña requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  showPassword: boolean;
}

type Action =
  | { type: "SET_FIELD"; field: keyof State; value: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "TOGGLE_PASSWORD_VISIBILITY" };

const initialState: State = {
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
  showPassword: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = async () => {
    try {
      await validationSchema.validate(state, { abortEarly: false });
      Alert.alert(
        "¡Registro exitoso!",
        `Usuario: ${state.email}`,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Welcome", { email: state.email }),
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) errors[error.path] = error.message;
        });
        dispatch({ type: "SET_ERRORS", errors });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Regístrate</Text>
        <Text style={styles.subtitle}>
          Crea Tu Cuenta Y Comienza A Aprender
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu Correo Electrónico"
          placeholderTextColor="#999"
          value={state.email}
          onChangeText={(text) =>
            dispatch({ type: "SET_FIELD", field: "email", value: text })
          }
        />
        {state.errors.email && (
          <Text style={styles.error}>{state.errors.email}</Text>
        )}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Ingresa tu Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!state.showPassword}
            value={state.password}
            onChangeText={(text) =>
              dispatch({ type: "SET_FIELD", field: "password", value: text })
            }
          />
          <TouchableOpacity
            onPress={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })}
            style={styles.eyeButton}
          >
            <Text style={styles.toggle}>
              {state.showPassword ? "👁️" : "🔒"}
            </Text>
          </TouchableOpacity>
        </View>
        {state.errors.password && (
          <Text style={styles.error}>{state.errors.password}</Text>
        )}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirma tu Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!state.showPassword}
            value={state.confirmPassword}
            onChangeText={(text) =>
              dispatch({
                type: "SET_FIELD",
                field: "confirmPassword",
                value: text,
              })
            }
          />
          <TouchableOpacity
            onPress={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })}
            style={styles.eyeButton}
          >
            <Text style={styles.toggle}>
              {state.showPassword ? "👁️" : "🔒"}
            </Text>
          </TouchableOpacity>
        </View>
        {state.errors.confirmPassword && (
          <Text style={styles.error}>{state.errors.confirmPassword}</Text>
        )}
        <Text style={styles.terms}>
          Al Hacer Clic En 'Comenzar', Acepto Los{" "}
          <Text style={styles.link}>Términos De Uso</Text> Y Reconozco Que Mi
          Información Personal Se Utilizará De Acuerdo Con La{" "}
          <Text style={styles.link}>Política De Privacidad</Text> De Quasar.
        </Text>
        <Text style={styles.footer}>
          Ya Tienes Una Cuenta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Iniciar Sesión
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 70,
    justifyContent: "space-between",
  },
  content: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: "#aaa",
    textAlign: "center",
    paddingBottom: 25,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    marginTop: 20,
  },
  eyeButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  toggle: { color: "#fff", fontSize: 18 },
  button: {
    backgroundColor: "#0044cc",
    borderRadius: 8,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: { color: "red", fontSize: 14, paddingTop: 5 },
  terms: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 30,
    lineHeight: 18,
  },
  link: { color: "#0044cc", fontWeight: "bold" },
  footer: { textAlign: "center", color: "#aaa", paddingTop: 20 },
});

export default RegisterScreen;
