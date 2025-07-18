import { 
  ChatbotResponse, 
  BusinessInfo, 
  ChatbotHealthStatus, 
  SendMessageRequest,
  ChatbotError 
} from '@/types/chatbot';

// Configuración base de la API del chatbot
const CHATBOT_API_BASE = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:3001';

class ChatbotService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${CHATBOT_API_BASE}${endpoint}`;
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
        const chatbotError = new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        (chatbotError as any).code = error.code || response.status.toString();
        (chatbotError as any).details = error;
        throw chatbotError;
      }

      return await response.json();
    } catch (error) {
      console.error('Chatbot API Request Error:', error);
      if (error instanceof Error && (error as any).code) {
        throw error;
      }
      const connectionError = new Error('Error de conexión con el chatbot');
      (connectionError as any).code = 'CONNECTION_ERROR';
      (connectionError as any).details = error;
      throw connectionError;
    }
  }

  /**
   * Envía un mensaje al chatbot
   * POST /chatbot/message
   */
  async sendMessage(request: SendMessageRequest): Promise<ChatbotResponse> {
    return this.request<ChatbotResponse>('/message', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Obtiene información del negocio
   * GET /chatbot/business-info
   * NOTA: Deshabilitado - implementar en backend si se necesita
   */
  // async getBusinessInfo(): Promise<BusinessInfo> {
  //   return this.request<BusinessInfo>('/chatbot/business-info');
  // }

  /**
   * Verifica el estado de salud del servicio de chatbot
   * GET /chatbot/health
   * NOTA: Deshabilitado - implementar en backend si se necesita
   */
  // async getHealthStatus(): Promise<ChatbotHealthStatus> {
  //   return this.request<ChatbotHealthStatus>('/chatbot/health');
  // }

  /**
   * Verifica si el servicio de chatbot está disponible
   * Simplificado para solo verificar conectividad básica
   */
  async isServiceAvailable(): Promise<boolean> {
    try {
      // Hacemos un test simple con el endpoint que sabemos que existe
      // Solo verificamos que el servidor responda (aunque sea con error de validación)
      const response = await fetch(`${CHATBOT_API_BASE}/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'health_check' })
      });
      
      // Si el servidor responde (aunque sea 400/422 por datos faltantes), está online
      return response.status !== 404 && response.status < 500;
    } catch (error) {
      console.error('Chatbot service connection check failed:', error);
      return false;
    }
  }

  /**
   * Inicializa una nueva conversación (opcional)
   */
  async initializeConversation(userId?: string): Promise<{ conversationId: string }> {
    // Si tu backend soporta inicialización de conversación, úsalo
    // Por ahora generamos un ID temporal
    return {
      conversationId: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }
}

// Instancia singleton del servicio
export const chatbotService = new ChatbotService();

// Helper para formatear errores del chatbot
export const formatChatbotError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Error inesperado en el chatbot';
};

// Helper para generar ID único de mensaje
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}; 