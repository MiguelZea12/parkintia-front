import { LoginCredentials, RegisterCredentials, AuthResponse, User, UserRole } from '@/types/auth';
import { API_ROUTES } from '@/config/routes';

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
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
      const response = await this.request<{
        user: {
          id: number;
          email: string;
          name: string;
          role: string;
        };
        access_token: string;
      }>(API_ROUTES.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Transformar la respuesta del backend al formato esperado
      const user: User = {
        id: String(response.user.id),
        email: response.user.email,
        name: response.user.name || response.user.email.split('@')[0],
        role: this.mapRole(response.user.role),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.user.name || response.user.email)}&background=6366f1&color=fff`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return {
        user,
        token: response.access_token,
        refreshToken: response.access_token // Usar el mismo token por ahora
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Mapea el rol del backend al enum del frontend
   */
  private mapRole(role: string): UserRole {
    switch (role?.toLowerCase()) {
      case 'admin':
        return UserRole.ADMIN;
      case 'moderator':
        return UserRole.MODERATOR;
      default:
        return UserRole.USER;
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      // Verificar que las contraseñas coincidan
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Crear usuario en el backend
      const registerData = {
        username: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: 'user'
      };

      await this.request<any>(API_ROUTES.USERS.CREATE, {
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
    // Si hay token, intentar validarlo con el backend
    if (token) {
      try {
        // Decodificar el token JWT para obtener la información del usuario
        const payload = this.decodeToken(token);
        
        if (payload && payload.email) {
          return {
            id: String(payload.sub || '1'),
            email: payload.email,
            name: payload.name || payload.email.split('@')[0],
            role: this.mapRole(payload.role || 'user'),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name || payload.email)}&background=6366f1&color=fff`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
      } catch (error) {
        console.error('Token validation error:', error);
      }
    }
    
    throw new Error('Token inválido');
  }

  /**
   * Decodifica un token JWT sin verificar la firma
   */
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  async getCurrentUser(): Promise<User> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      throw new Error('No hay sesión activa');
    }
    return this.validateToken(token);
  }

  async logout(): Promise<void> {
    // Limpiar tokens del localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
    return Promise.resolve();
  }

  async refreshToken(): Promise<AuthResponse> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      throw new Error('No refresh token available');
    }

    // Por ahora, revalidar el token existente
    const user = await this.validateToken(token);
    
    return {
      user,
      token,
      refreshToken: token
    };
  }
}

export const authService = new AuthService();
