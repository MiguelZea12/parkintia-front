/**
 * Configuración centralizada para peticiones HTTP al backend
 * Incluye automáticamente el token JWT en las peticiones
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Obtiene el token de autenticación del localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * Crea headers con autenticación para peticiones HTTP
 */
export const getAuthHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Función helper para hacer peticiones HTTP autenticadas
 */
export const fetchWithAuth = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Si es 401, el token puede estar expirado
      if (response.status === 401) {
        // Remover token inválido
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
        }
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Configuración de la API
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  PYTHON_SERVICE_URL: process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL || 'http://localhost:5000',
  TIMEOUT: 30000, // 30 segundos
};
