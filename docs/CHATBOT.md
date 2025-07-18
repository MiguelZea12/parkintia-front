# 🤖 Chatbot PARKINTIA

Un chatbot inteligente integrado en el dashboard que se conecta con tu backend para proporcionar asistencia a los usuarios.

## 🚀 Características

- ✅ **Botón flotante** - Posicionado en la esquina inferior derecha
- ✅ **Ventana emergente** - Interfaz de chat moderna y responsiva
- ✅ **Estado en tiempo real** - Indicador de conexión online/offline
- ✅ **Conexión con backend** - Integración con endpoints específicos
- ✅ **Manejo de errores** - Recuperación automática y reintentos
- ✅ **Experiencia fluida** - Animaciones y transiciones suaves
- ✅ **Tipado TypeScript** - Completamente tipado para mejor desarrollo

## 📁 Estructura de Archivos

```
src/
├── components/chatbot/
│   ├── ChatWindow.tsx          # Ventana principal del chat
│   ├── ChatbotToggle.tsx       # Botón flotante y lógica principal
│   └── index.ts                # Exportaciones
├── services/
│   └── chatbot.service.ts      # Servicio API del chatbot
└── types/
    └── chatbot.ts              # Tipos TypeScript del chatbot
```

## 🔧 Configuración del Backend

### Endpoints Requeridos

Tu backend debe implementar estos endpoints:

#### 1. **POST /chatbot/message** - Enviar mensajes
```typescript
// Request
{
  "message": "Hola, ¿cómo estás?",
  "conversationId": "conv_123456789",
  "userId": "user_123"
}

// Response
{
  "message": "¡Hola! Estoy bien, gracias. ¿En qué puedo ayudarte?",
  "timestamp": "2025-01-18T10:30:00Z",
  "conversationId": "conv_123456789"
}
```

#### 2. **GET /chatbot/business-info** - Información del negocio
```typescript
// Response
{
  "name": "PARKINTIA",
  "description": "Sistema inteligente de gestión de parking",
  "hours": "24/7",
  "contact": {
    "phone": "+1-234-567-8900",
    "email": "info@parkintia.com",
    "website": "https://parkintia.com"
  },
  "services": [
    "Reserva de espacios",
    "Monitoreo en tiempo real",
    "Pagos automáticos",
    "Reportes y analíticas"
  ]
}
```

#### 3. **GET /chatbot/health** - Estado del servicio
```typescript
// Response
{
  "status": "healthy", // "healthy" | "degraded" | "down"
  "message": "Servicio funcionando correctamente",
  "timestamp": "2025-01-18T10:30:00Z"
}
```

### Variables de Entorno

Configura la URL de tu backend en `.env.local`:

```bash
# URL base del API del chatbot
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:3001

# O para producción
NEXT_PUBLIC_CHATBOT_API_URL=https://api.parkintia.com
```

## 🎯 Cómo Usar

### 1. **En el Dashboard**
- El chatbot aparece automáticamente como un botón flotante azul en la esquina inferior derecha
- El botón muestra un indicador de estado (verde=online, rojo=offline, amarillo=verificando)

### 2. **Interacción**
- **Clic en el botón** → Abre/cierra la ventana de chat
- **Escribir mensaje** → Envía mensaje al chatbot
- **Enter** → Envía el mensaje (Shift+Enter para nueva línea)
- **Clic fuera** → Cierra el chat

### 3. **Estados del Chat**
- **Inicializando** → Conectando con el backend
- **En línea** → Listo para recibir mensajes
- **Error** → Problema de conexión (botón de reintentar disponible)
- **Escribiendo** → Indicador de que el bot está procesando

## 🛠️ Personalización

### Cambiar Colores
Edita los colores en `src/config/colors.ts`:

```typescript
export const COLORS = {
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  // ... más colores
};
```

### Modificar Posición
En `ChatbotToggle.tsx`, cambia las clases de posición:

```tsx
// Esquina inferior izquierda
<div className="fixed bottom-6 left-6 z-40">

// Esquina superior derecha  
<div className="fixed top-6 right-6 z-40">
```

### Cambiar Tamaño de Ventana
En `ChatWindow.tsx`, modifica las clases de tamaño:

```tsx
// Ventana más grande
<div className="fixed bottom-4 right-4 w-96 h-[500px] ...">

// Ventana más pequeña
<div className="fixed bottom-4 right-4 w-72 h-80 ...">
```

## 🔍 Solución de Problemas

### Problema: El chatbot no aparece
**Solución:** Verifica que estés en la ruta `/dashboard` después de hacer login.

### Problema: Error de conexión
**Soluciones:**
1. Verifica que `NEXT_PUBLIC_CHATBOT_API_URL` esté configurado correctamente
2. Asegúrate de que tu backend esté ejecutándose
3. Verifica que los endpoints estén implementados correctamente
4. Revisa la consola del navegador para errores específicos

### Problema: Mensajes no se envían
**Soluciones:**
1. Verifica que el endpoint `/chatbot/message` esté funcionando
2. Revisa que el formato de request/response sea correcto
3. Comprueba que haya autenticación válida (token)

### Problema: Botón no muestra estado correcto
**Solución:** El endpoint `/chatbot/health` debe estar respondiendo correctamente.

## 🚀 Mejoras Futuras

### Funcionalidades Adicionales
- [ ] **Historial persistente** - Guardar conversaciones en localStorage
- [ ] **Comandos rápidos** - Botones de respuesta rápida
- [ ] **Archivos adjuntos** - Soporte para imágenes y documentos
- [ ] **Notificaciones** - Alertas de mensajes nuevos
- [ ] **Temas** - Modo oscuro/claro
- [ ] **Multi-idioma** - Soporte para varios idiomas
- [ ] **Voz** - Síntesis de voz y reconocimiento de voz

### Integraciones
- [ ] **WebSocket** - Para mensajes en tiempo real
- [ ] **Análiticas** - Métricas de uso del chatbot
- [ ] **Feedback** - Sistema de calificación de respuestas
- [ ] **Escalation** - Transferencia a agente humano

## 📞 Soporte

Si tienes problemas con el chatbot:

1. **Revisa la documentación** de tu backend
2. **Verifica los logs** en la consola del navegador
3. **Comprueba la configuración** de las variables de entorno
4. **Testa los endpoints** directamente con Postman o similar

---

**¡El chatbot está listo para usar! 🎉**

Asegúrate de que tu backend implemente los endpoints requeridos y disfruta de la nueva funcionalidad de asistencia inteligente en PARKINTIA. 