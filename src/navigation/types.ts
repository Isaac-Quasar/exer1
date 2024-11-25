export type RootStackParamList = {
  Register: undefined; // Pantalla de registro, no recibe parámetros
  Login: undefined; // Pantalla de inicio de sesión, no recibe parámetros
  Welcome: { email: string }; // Pantalla de bienvenida, recibe el correo del usuario
};
