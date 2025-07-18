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
    welcomeBack: '¡Bienvenido de nuevo!',
    signIn: 'Iniciar Sesión',
    signInDescription: 'Inicia sesión para acceder a tu panel de control y gestionar tus reservas.',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes una cuenta?',
    signUp: 'Registrarse',
    signingIn: 'Iniciando sesión...',
    
    // Register
    joinUsToday: '¡Únete hoy mismo!',
    createAccount: 'Crear Cuenta',
    createAccountDescription: 'Crea tu cuenta y descubre el futuro de las soluciones inteligentes de estacionamiento.',
    fullName: 'Nombre completo',
    createYourAccount: 'Crea tu cuenta',
    agreeToTerms: 'Acepto los términos y condiciones',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    creating: 'Creando cuenta...',
    
    // Dashboard
    dashboard: 'Panel de Control',
    welcomeTo: 'Bienvenido a',
    logout: 'Cerrar Sesión',
    profile: 'Perfil',
    settings: 'Configuración',
    
    // Sidebar Navigation
    overview: 'Resumen',
    cameras: 'Cámaras',
    reports: 'Reportes',
    users: 'Usuarios',
    parking: 'Estacionamiento',
    analytics: 'Analíticas',
    
    // Camera Module
    cameraManagement: 'Gestión de Cámaras',
    activeCameras: 'Cámaras Activas',
    inactiveCameras: 'Cámaras Inactivas',
    addCamera: 'Agregar Cámara',
    editCamera: 'Editar Cámara',
    deleteCamera: 'Eliminar Cámara',
    cameraName: 'Nombre de la Cámara',
    cameraLocation: 'Ubicación',
    cameraStatus: 'Estado',
    active: 'Activo',
    inactive: 'Inactivo',
    online: 'En línea',
    offline: 'Fuera de línea',
    
    // Reports Module
    reportsManagement: 'Gestión de Reportes',
    generateReport: 'Generar Reporte',
    dailyReport: 'Reporte Diario',
    weeklyReport: 'Reporte Semanal',
    monthlyReport: 'Reporte Mensual',
    customReport: 'Reporte Personalizado',
    occupancyReport: 'Reporte de Ocupación',
    revenueReport: 'Reporte de Ingresos',
    downloadReport: 'Descargar Reporte',
    
    // Users Module
    userManagement: 'Gestión de Usuarios',
    addUser: 'Agregar Usuario',
    editUser: 'Editar Usuario',
    deleteUser: 'Eliminar Usuario',
    userName: 'Nombre de Usuario',
    userEmail: 'Correo del Usuario',
    userRole: 'Rol del Usuario',
    admin: 'Administrador',
    operator: 'Operador',
    viewer: 'Visualizador',
    lastLogin: 'Último Acceso',
    searchUsers: 'Buscar usuarios...',
    activeUsers: 'Usuarios Activos',
    pendingUsers: 'Usuarios Pendientes',
    administrator: 'Administrador',
    role: 'Rol',
    status: 'Estado',
    pending: 'Pendiente',
    member: 'Miembro',
    
    // Overview/Dashboard Cards
    totalSpaces: 'Espacios Totales',
    occupiedSpaces: 'Espacios Ocupados',
    availableSpaces: 'Espacios Disponibles',
    todayRevenue: 'Ingresos de Hoy',
    totalUsers: 'Total de Usuarios',
    activeSessions: 'Sesiones Activas',
    
    // Actions
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    refresh: 'Actualizar',
    view: 'Ver',
    download: 'Descargar',
    upload: 'Subir',
    create: 'Crear',
    update: 'Actualizar',
    remove: 'Eliminar',
    saveChanges: 'Guardar Cambios',
    
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
    
    // Dashboard
    dashboard: 'Dashboard',
    welcomeTo: 'Welcome to',
    logout: 'Logout',
    profile: 'Profile',
    settings: 'Settings',
    
    // Sidebar Navigation
    overview: 'Overview',
    cameras: 'Cameras',
    reports: 'Reports',
    users: 'Users',
    parking: 'Parking',
    analytics: 'Analytics',
    
    // Camera Module
    cameraManagement: 'Camera Management',
    activeCameras: 'Active Cameras',
    inactiveCameras: 'Inactive Cameras',
    addCamera: 'Add Camera',
    editCamera: 'Edit Camera',
    deleteCamera: 'Delete Camera',
    cameraName: 'Camera Name',
    cameraLocation: 'Location',
    cameraStatus: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    online: 'Online',
    offline: 'Offline',
    
    // Reports Module
    reportsManagement: 'Reports Management',
    generateReport: 'Generate Report',
    dailyReport: 'Daily Report',
    weeklyReport: 'Weekly Report',
    monthlyReport: 'Monthly Report',
    customReport: 'Custom Report',
    occupancyReport: 'Occupancy Report',
    revenueReport: 'Revenue Report',
    downloadReport: 'Download Report',
    
    // Users Module
    userManagement: 'User Management',
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    userName: 'User Name',
    userEmail: 'User Email',
    userRole: 'User Role',
    admin: 'Admin',
    operator: 'Operator',
    viewer: 'Viewer',
    lastLogin: 'Last Login',
    searchUsers: 'Search users...',
    activeUsers: 'Active Users',
    pendingUsers: 'Pending Users',
    administrator: 'Administrator',
    role: 'Role',
    status: 'Status',
    pending: 'Pending',
    member: 'Member',
    
    // Overview/Dashboard Cards
    totalSpaces: 'Total Spaces',
    occupiedSpaces: 'Occupied Spaces',
    availableSpaces: 'Available Spaces',
    todayRevenue: 'Today Revenue',
    totalUsers: 'Total Users',
    activeSessions: 'Active Sessions',
    
    // Actions
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    refresh: 'Refresh',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    create: 'Create',
    update: 'Update',
    remove: 'Remove',
    saveChanges: 'Save Changes',
    
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
