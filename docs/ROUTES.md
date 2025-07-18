# Sistema de Rutas Centralizadas

## 📍 Configuración de Rutas

Este archivo (`src/config/routes.ts`) centraliza todas las rutas de la aplicación, proporcionando:

### ✅ **Beneficios:**
- **Mantenimiento fácil**: Todas las URLs en un solo lugar
- **Tipado TypeScript**: Autocompletado y verificación de tipos
- **Consistencia**: Evita URLs hardcodeadas duplicadas
- **Refactoring seguro**: Cambios centralizados sin errores
- **Utilidades incluidas**: Helper functions para trabajar con rutas

### 🎯 **Uso Básico:**

```typescript
import { PUBLIC_ROUTES, PROTECTED_ROUTES, RouteUtils } from '@/config/routes';

// En lugar de usar strings hardcodeados:
router.push('/dashboard'); // ❌ No recomendado

// Usa las constantes centralizadas:
router.push(PROTECTED_ROUTES.DASHBOARD); // ✅ Recomendado
```

### 🚀 **Hook de Navegación:**

```typescript
import { useNavigation } from '@/hooks/useNavigation';

const MyComponent = () => {
  const { goToDashboard, goToLogin, navigateTo } = useNavigation();
  
  // Navegación simple
  const handleLogin = () => goToLogin();
  
  // Navegación con parámetros
  const searchParking = () => {
    navigateTo(PROTECTED_ROUTES.PARKING.SEARCH, { 
      location: 'madrid',
      date: '2025-07-18'
    });
  };
};
```

### 🔧 **Utilidades Disponibles:**

```typescript
// Verificar tipo de ruta
RouteUtils.isPublicRoute('/login'); // true
RouteUtils.isProtectedRoute('/dashboard'); // true

// Construir URLs con parámetros
RouteUtils.buildUrl('/search', { q: 'parking', city: 'madrid' });
// Resultado: '/search?q=parking&city=madrid'

// URL completa de API
RouteUtils.getApiUrl('/auth/login');
// Resultado: 'http://localhost:3001/api/auth/login'
```

### 📁 **Estructura de Rutas:**

```typescript
// Rutas públicas (no requieren autenticación)
PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  AUTH: '/auth',
  // ... más rutas
}

// Rutas protegidas (requieren autenticación)
PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PARKING: {
    ROOT: '/parking',
    SEARCH: '/parking/search',
    RESERVATIONS: '/parking/reservations'
  },
  ADMIN: {
    ROOT: '/admin',
    USERS: '/admin/users'
  }
}

// Rutas de API
API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  }
}
```

### 🔄 **Ejemplos de Migración:**

#### Antes (hardcoded):
```typescript
// ❌ URLs esparcidas por el código
router.push('/dashboard');
router.push('/login');
fetch('/api/auth/login', options);

if (pathname === '/dashboard') {
  // lógica protegida
}
```

#### Después (centralizado):
```typescript
// ✅ URLs centralizadas y tipadas
import { PROTECTED_ROUTES, PUBLIC_ROUTES, API_ROUTES, RouteUtils } from '@/config/routes';

router.push(PROTECTED_ROUTES.DASHBOARD);
router.push(PUBLIC_ROUTES.LOGIN);
fetch(RouteUtils.getApiUrl(API_ROUTES.AUTH.LOGIN), options);

if (RouteUtils.isProtectedRoute(pathname)) {
  // lógica protegida
}
```

### 🎨 **Personalización:**

Para agregar nuevas rutas:

```typescript
// En src/config/routes.ts
export const PUBLIC_ROUTES = {
  // ... rutas existentes
  NUEVA_RUTA: '/nueva-ruta',
  CONTACTO: '/contacto'
} as const;

export const PROTECTED_ROUTES = {
  // ... rutas existentes
  MI_PERFIL: '/mi-perfil',
  CONFIGURACION: '/configuracion'
} as const;
```

### 📝 **Próximas Mejoras:**

- [ ] Middleware de rutas automático
- [ ] Generación automática de sitemap
- [ ] Validación de rutas en build time
- [ ] Breadcrumbs automáticos basados en rutas
- [ ] Análisis de rutas no utilizadas

---

Este sistema hace que tu aplicación sea más mantenible y menos propensa a errores de navegación. 🚀
