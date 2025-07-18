// Tipos para el sistema de chatbot

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean; // true si es del usuario, false si es del bot
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatbotResponse {
  message: string;
  timestamp: string;
  conversationId?: string;
}

export interface BusinessInfo {
  name: string;
  description: string;
  hours: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  services: string[];
}

export interface ChatbotHealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  message: string;
  timestamp: string;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  userId?: string;
}

export interface ChatbotError {
  message: string;
  code?: string;
  details?: any;
}

export interface ChatbotState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  conversationId?: string;
  error?: ChatbotError;
  isConnected: boolean;
} 