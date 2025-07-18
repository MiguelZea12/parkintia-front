import { LoginCredentials, RegisterCredentials, AuthResponse, User, UserRole } from '@/types/auth';
import { API_ROUTES, RouteUtils } from '@/config/routes';

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = RouteUtils.getApiUrl(endpoint);
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.request<any>(API_ROUTES.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // El backend devuelve { user: {...}, access_token: "..." }
      // Adaptamos la respuesta al formato que espera el frontend
      return {
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name || response.user.email.split('@')[0], // Si no hay name, usar parte del email
          role: response.user.role || UserRole.USER,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.user.name || response.user.email)}`,
          createdAt: new Date(response.user.createdAt || Date.now()),
          updatedAt: new Date(response.user.updatedAt || Date.now())
        },
        token: response.access_token,
        refreshToken: response.refresh_token // Si el backend lo proporciona
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      // Verificar que las contraseñas coincidan antes de enviar al backend
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Preparar datos para el backend según el DTO del UserController
      const registerData = {
        username: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: 'user' // Role por defecto
      };

      // Crear el usuario usando el endpoint de users
      const userResponse = await this.request<any>(API_ROUTES.USERS.CREATE, {
        method: 'POST',
        body: JSON.stringify(registerData),
      });

      // Después de crear el usuario, hacer login automáticamente
      const loginResponse = await this.login({
        email: credentials.email,
        password: credentials.password
      });

      return loginResponse;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async validateToken(token: string): Promise<User> {
    // Simulación - en producción validarías el token con el backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token.startsWith('mock-jwt-token')) {
          resolve({
            id: '1',
            email: 'demo@parkintia.com',
            name: 'Usuario Demo',
            role: UserRole.USER,
            avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        } else {
          reject(new Error('Token inválido'));
        }
      }, 500);
    });

    // Para backend real:
    // return this.request<User>(API_ROUTES.AUTH.ME);
  }

  async getCurrentUser(): Promise<User> {
    // Para backend real:
    // return this.request<User>(API_ROUTES.AUTH.ME);
    
    // Simulación
    return this.validateToken(localStorage.getItem('auth_token') || '');
  }

  async logout(): Promise<void> {
    // Para backend real (opcional - invalidar token en servidor):
    // return this.request<void>(API_ROUTES.AUTH.LOGOUT, { method: 'POST' });
    
    // Por ahora solo simulamos
    return Promise.resolve();
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Para backend real:
    // return this.request<AuthResponse>(API_ROUTES.AUTH.REFRESH, {
    //   method: 'POST',
    //   body: JSON.stringify({ refreshToken }),
    // });

    // Simulación
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: 'demo@parkintia.com',
            name: 'Usuario Demo',
            role: UserRole.USER,
            avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          token: `new-mock-jwt-token-${Date.now()}`,
          refreshToken: `new-mock-refresh-token-${Date.now()}`
        });
      }, 1000);
    });
  }
}

export const authService = new AuthService();
