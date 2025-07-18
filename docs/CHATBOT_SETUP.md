# 🚀 Configuración del Chatbot - Del Modo Demo al Modo Real

## 📋 Estado Actual: MODO DEMO ACTIVO

El chatbot está funcionando en **modo demo** para que puedas ver y probar la interfaz sin necesidad de tener el backend implementado.

### ✅ **Qué funciona ahora:**
- ✅ Botón flotante aparece en el dashboard
- ✅ Ventana de chat se abre/cierra correctamente
- ✅ Puedes escribir mensajes
- ✅ El bot responde con mensajes de demostración
- ✅ Interfaz completamente funcional

## 🔧 **Pasos para activar el modo REAL:**

### 1. **Implementa el endpoint en tu backend:**
Tu backend debe tener disponible:
```
POST http://localhost:3001/chatbot/message
```

**Request esperado:**
```json
{
  "message": "Hola, ¿cómo estás?",
  "conversationId": "conv_123456789",
  "userId": "user_123"
}
```

**Response esperado:**
```json
{
  "message": "¡Hola! Estoy bien, gracias. ¿En qué puedo ayudarte?",
  "timestamp": "2025-01-18T10:30:00Z",
  "conversationId": "conv_123456789"
}
```

### 2. **Configura la variable de entorno:**
Crea `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:3001
```

### 3. **Activa el modo real - Cambios en el código:**

#### A. En `src/components/chatbot/ChatWindow.tsx`:

**Línea ~57-65:** Descomenta la verificación del servicio:
```typescript
// CAMBIAR ESTO:
// const isAvailable = await chatbotService.isServiceAvailable();
// if (!isAvailable) {
//   throw new Error('El servicio de chatbot no está disponible en este momento');
// }

// POR ESTO:
const isAvailable = await chatbotService.isServiceAvailable();
if (!isAvailable) {
  throw new Error('El servicio de chatbot no está disponible en este momento');
}
```

**Línea ~75:** Cambia el mensaje de bienvenida:
```typescript
// CAMBIAR ESTO:
content: '¡Hola! Soy el asistente virtual de PARKINTIA. ¿En qué puedo ayudarte hoy?\n\n⚠️ Modo demo: El backend aún no está conectado.',

// POR ESTO:
content: '¡Hola! Soy el asistente virtual de PARKINTIA. ¿En qué puedo ayudarte hoy?',
```

**Línea ~120-150:** Reemplaza la lógica demo por la real:
```typescript
// ELIMINAR TODO EL BLOQUE DEMO:
// Simular delay del servidor
// await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
// ... todo el código de respuestas demo

// DESCOMENTAR EL CÓDIGO REAL:
const response = await chatbotService.sendMessage({
  message: userMessage.content,
  conversationId: state.conversationId,
  userId: user?.id
});

const botMessage: ChatMessage = {
  id: generateMessageId(),
  content: response.message,
  isUser: false,
  timestamp: new Date(response.timestamp),
  status: 'sent'
};
```

**Línea ~170:** Cambiar el conversationId:
```typescript
// CAMBIAR ESTO:
conversationId: state.conversationId, // Mantener el ID actual en demo

// POR ESTO:
conversationId: response.conversationId || prev.conversationId,
```

#### B. En `src/components/chatbot/ChatbotToggle.tsx`:

**Línea ~12:** Cambiar estado inicial:
```typescript
// CAMBIAR ESTO:
const [isOnline, setIsOnline] = useState(true); // MODO DEMO: Siempre online

// POR ESTO:
const [isOnline, setIsOnline] = useState(false);
```

**Línea ~15-21:** Descomentar verificaciones automáticas:
```typescript
// DESCOMENTAR ESTO:
useEffect(() => {
  checkServiceStatus();
  const interval = setInterval(checkServiceStatus, 120000);
  return () => clearInterval(interval);
}, []);
```

**Línea ~35-40:** Descomentar verificación al abrir:
```typescript
// DESCOMENTAR ESTO:
const toggleChat = () => {
  if (!isOpen) {
    checkServiceStatus();
  }
  setIsOpen(!isOpen);
};
```

## 🧪 **Prueba del sistema real:**

1. **Inicia tu backend** en `localhost:3001`
2. **Haz los cambios** arriba mencionados
3. **Reinicia el frontend** con `npm run dev`
4. **Prueba el chatbot** - debería conectarse al backend real

## ⚠️ **Solución de problemas:**

### Error 404:
- Verifica que tu backend esté corriendo en el puerto correcto
- Confirma que el endpoint `POST /chatbot/message` esté implementado

### Error de CORS:
- Asegúrate de que tu backend permita requests desde `localhost:3000`

### Error de formato:
- Verifica que tu backend responda con el formato JSON exacto especificado

## 📝 **Checklist de activación:**

- [ ] Backend corriendo en puerto 3001
- [ ] Endpoint `/chatbot/message` implementado y probado
- [ ] Variable de entorno `NEXT_PUBLIC_CHATBOT_API_URL` configurada
- [ ] Código demo comentado/removido
- [ ] Código real descomentado
- [ ] Frontend reiniciado
- [ ] Chatbot probado con mensajes reales

---

**Una vez que completes estos pasos, tendrás el chatbot completamente funcional conectado a tu backend! 🎉** 