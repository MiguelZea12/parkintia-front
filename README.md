# Sistema de Autenticación Parkintia

Un sistema completo de autenticación profesional para Next.js con TypeScript, Tailwind CSS y arquitectura basada en componentes.

## 🚀 Características

- ✅ **Autenticación completa** - Login, registro y gestión de sesiones
- ✅ **TypeScript** - Tipado completo para mejor desarrollo
- ✅ **Context API** - Gestión de estado global para autenticación
- ✅ **Hooks personalizados** - Lógica reutilizable encapsulada
- ✅ **Componentes reutilizables** - UI components modulares
- ✅ **Protección de rutas** - Sistema automático de redirección
- ✅ **Responsive Design** - Diseño adaptativo con Tailwind CSS
- ✅ **Validación de formularios** - Validación en tiempo real
- ✅ **Loading states** - Estados de carga profesionales
- ✅ **Error handling** - Manejo robusto de errores

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Pages (App Router)
│   ├── auth/               # Página combinada login/register
│   ├── login/              # Página individual de login
│   ├── register/           # Página individual de registro
│   ├── dashboard/          # Dashboard protegido
│   ├── layout.tsx          # Layout principal con AuthProvider
│   └── page.tsx            # Página principal (redirige)
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── LoadingSpinner.tsx
│   ├── auth/               # Componentes de autenticación
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── index.ts            # Exports centralizados
├── context/                # Context providers
│   └── AuthContext.tsx     # Context de autenticación
├── hooks/                  # Hooks personalizados
│   ├── useAuthForm.ts      # Hook para formularios de auth
│   └── useAuthRedirect.ts  # Hook para redirecciones
├── services/               # Servicios API
│   └── auth.service.ts     # Servicio de autenticación
└── types/                  # Definiciones de tipos
    ├── auth.ts             # Tipos de autenticación
    └── ui.ts               # Tipos de componentes UI
```

## 🛠️ Instalación y Configuración

1. **Instala las dependencias** (ya instaladas):
   ```bash
   npm install
   ```

2. **Configura las variables de entorno**:
   ```bash
   cp .env.example .env.local
   ```

3. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en `http://localhost:3000`

## 🎯 Cómo Usar

### Credenciales de Demo
Para probar el sistema, usa estas credenciales:
- **Email**: `demo@parkintia.com`
- **Password**: `demo123`

### Rutas Disponibles
- `/` - Página principal (redirige automáticamente)
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/auth` - Página combinada login/register
- `/dashboard` - Dashboard protegido (requiere autenticación)

### Navegación Automática
El sistema maneja automáticamente las redirecciones:
- Si no estás autenticado → redirige a `/login`
- Si ya estás autenticado → redirige a `/dashboard`

## 🔧 Conectar con tu Backend

Actualmente el sistema usa datos simulados. Para conectar con tu backend real:

1. **Actualiza el servicio de autenticación** (`src/services/auth.service.ts`):
   ```typescript
   // Reemplaza las funciones simuladas con llamadas reales
   async login(credentials: LoginCredentials): Promise<AuthResponse> {
     return this.request<AuthResponse>('/auth/login', {
       method: 'POST',
       body: JSON.stringify(credentials),
     });
   }
   ```

2. **Configura la URL de tu API** en `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=https://tu-api.com/api
   ```

3. **Ajusta los tipos** si es necesario en `src/types/auth.ts`

## 🎨 Personalización

### Cambiar Colores y Estilos
Los componentes usan clases de Tailwind CSS. Para cambiar el tema:

1. **Colores primarios**: Busca `blue-` en los componentes y cámbialo por tu color
2. **Estilos de botones**: Modifica `src/components/ui/Button.tsx`
3. **Tipografía**: Ajusta las clases `font-` en los componentes

### Agregar Nuevos Componentes UI
```typescript
// src/components/ui/TuComponente.tsx
export const TuComponente: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="tu-estilo">
      {/* Tu contenido */}
    </div>
  );
};

// No olvides exportarlo en src/components/index.ts
export { TuComponente } from './ui/TuComponente';
```

## 📚 Hooks Disponibles

### `useAuth()`
Hook principal para gestión de autenticación:
```typescript
const { user, isAuthenticated, login, logout, isLoading } = useAuth();
```

### `useAuthForm()`
Hook para formularios de autenticación con validación:
```typescript
const { handleLogin, handleRegister, formErrors, isLoading } = useAuthForm();
```

### `useProtectedRoute()`
Hook para proteger rutas:
```typescript
const { isAuthenticated, isLoading } = useProtectedRoute('/login');
```

### `useAuthRoute()`
Hook para rutas de autenticación (redirige si ya está autenticado):
```typescript
const { isLoading } = useAuthRoute('/dashboard');
```

## 🔐 Gestión de Estado

El estado de autenticación se maneja con Context API y useReducer:

```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
}
```

## 🧪 Testing (Próximamente)

Para añadir tests:

1. Instala las dependencias de testing:
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom jest
   ```

2. Crea tests para los componentes y hooks

## 📝 TODO / Mejoras Futuras

- [ ] Recuperación de contraseña
- [ ] Verificación de email
- [ ] Autenticación con redes sociales (Google, Facebook)
- [ ] Refresh token automático
- [ ] Rate limiting en formularios
- [ ] Tests unitarios e integración
- [ ] Internacionalización (i18n)
- [ ] Dark mode
- [ ] Middleware de autenticación en Next.js

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Si tienes preguntas o problemas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**¡Listo para usar!** 🎉 Tu sistema de autenticación profesional está configurado y funcionando.
