import { LoginCredentials, RegisterCredentials, AuthResponse, User, UserRole } from '@/types/auth';
import { API_ROUTES, RouteUtils } from '@/config/routes';

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
    // Por ahora simulamos la respuesta - reemplaza con llamada real al backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación básica de validación
        if (credentials.email === 'demo@parkintia.com' && credentials.password === 'demo123') {
          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: 'Usuario Demo',
            role: UserRole.USER,
            avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          resolve({
            user: mockUser,
            token: 'mock-jwt-token-123',
            refreshToken: 'mock-refresh-token-456'
          });
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1500); // Simula latencia de red
    });

    // Cuando conectes con el backend, reemplaza lo anterior con:
    // return this.request<AuthResponse>(API_ROUTES.AUTH.LOGIN, {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Simulación por ahora
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.password !== credentials.confirmPassword) {
          reject(new Error('Las contraseñas no coinciden'));
          return;
        }

        if (credentials.email === 'existing@parkintia.com') {
          reject(new Error('El email ya está registrado'));
          return;
        }

        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          name: credentials.name,
          role: UserRole.USER,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name)}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        resolve({
          user: mockUser,
          token: 'mock-jwt-token-new-user',
          refreshToken: 'mock-refresh-token-new-user'
        });
      }, 2000);
    });

    // Para backend real:
    // return this.request<AuthResponse>(API_ROUTES.AUTH.REGISTER, {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
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
