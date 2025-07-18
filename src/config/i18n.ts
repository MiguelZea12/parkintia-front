export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Auth Common
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    phone: 'Teléfono',
    
    // Login
    welcomeBack: '¡Bienvenido de vuelta!',
    signIn: 'Iniciar Sesión',
    signInDescription: 'Inicia sesión para acceder a tu panel de control y gestionar tus reservas.',
    rememberMe: 'Recordarme',
    forgotPassword: 'Olvidé mi contraseña',
    noAccount: '¿No tienes cuenta?',
    signUp: 'Regístrate',
    signingIn: 'Iniciando sesión...',
    
    // Register
    joinUsToday: '¡Únete hoy!',
    createAccount: 'Crear Cuenta',
    createAccountDescription: 'Crea tu cuenta y descubre el futuro de las soluciones inteligentes de parking.',
    fullName: 'Nombre completo',
    createYourAccount: 'Crea tu cuenta',
    agreeToTerms: 'Acepto los términos y condiciones',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    creating: 'Creando cuenta...',
    
    // Messages
    loginSuccess: 'Sesión iniciada correctamente',
    registerSuccess: 'Cuenta creada correctamente',
    loginError: 'Error al iniciar sesión',
    registerError: 'Error al crear la cuenta',
    
    // Validation
    emailRequired: 'El correo electrónico es obligatorio',
    emailInvalid: 'Formato de correo electrónico inválido',
    passwordRequired: 'La contraseña es obligatoria',
    passwordMin: 'La contraseña debe tener al menos 6 caracteres',
    firstNameRequired: 'El nombre es obligatorio',
    lastNameRequired: 'Los apellidos son obligatorios',
    phoneRequired: 'El teléfono es obligatorio',
    passwordsNotMatch: 'Las contraseñas no coinciden',
    termsRequired: 'Debes aceptar los términos y condiciones',
    
    // General
    loading: 'Cargando...',
    copyright: '© 2025 Parkintia. Todos los derechos reservados.',
    parkingSystem: 'Tu solución inteligente de parking',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
  },
  en: {
    // Auth Common
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    
    // Login
    welcomeBack: 'Welcome Back!',
    signIn: 'Sign In',
    signInDescription: 'Sign in to access your parking dashboard and manage your reservations.',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    
    // Register
    joinUsToday: 'Join Us Today!',
    createAccount: 'Create Account',
    createAccountDescription: 'Create your account and discover the future of smart parking solutions.',
    fullName: 'Full name',
    createYourAccount: 'Create Your Account',
    agreeToTerms: 'I agree to the terms and conditions',
    alreadyHaveAccount: 'Already have an account?',
    creating: 'Creating account...',
    
    // Messages
    loginSuccess: 'Successfully signed in',
    registerSuccess: 'Account created successfully',
    loginError: 'Error signing in',
    registerError: 'Error creating account',
    
    // Validation
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 6 characters',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    phoneRequired: 'Phone is required',
    passwordsNotMatch: 'Passwords do not match',
    termsRequired: 'You must accept the terms and conditions',
    
    // General
    loading: 'Loading...',
    copyright: '© 2025 Parkintia. All rights reserved.',
    parkingSystem: 'Your smart parking solution',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
  }
} as const;

export const getTranslation = (language: Language, key: keyof typeof translations.es) => {
  return translations[language][key] || translations.es[key];
};
