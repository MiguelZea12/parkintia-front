# 🎨 PARKINTIA - PALETA DE COLORES Y SISTEMA DE DISEÑO

## 📋 TABLA DE CONTENIDOS
1. [Paleta de Colores](#paleta-de-colores)
2. [Modo Light](#modo-light)
3. [Modo Dark](#modo-dark)
4. [Colores de Estado](#colores-de-estado)
5. [Sistema de Diseño](#sistema-de-diseño)
6. [Componentes](#componentes)
7. [Animaciones](#animaciones)
8. [Responsive Design](#responsive-design)

---

## 🎨 PALETA DE COLORES

### 🌞 MODO LIGHT

#### **Colores Principales**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Primary** | `#0A2540` | Color principal (Azul petróleo) | `bg-primary` / `text-primary` |
| Primary Light | `#0D3A5C` | Hover states | `bg-primary-light` |
| Primary Dark | `#081A2E` | Estados activos | `bg-primary-dark` |
| **Accent** | `#14B8A6` | Color de acento (Teal tecnológico) | `bg-accent` / `text-accent` |
| Accent Light | `#2DD4BF` | Hover states | `bg-accent-light` |
| Accent Dark | `#0D9488` | Estados activos | `bg-accent-dark` |

#### **Colores de Fondo**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Background** | `#F8FAFC` | Fondo principal de la página | `bg-background` |
| **Surface** | `#FFFFFF` | Fondo de cards, modales, etc. | `bg-surface` |

#### **Colores de Texto**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Text Primary** | `#0F172A` | Texto principal (títulos, contenido importante) | `text-text-primary` |
| **Text Secondary** | `#64748B` | Texto secundario (descripciones, labels) | `text-text-secondary` |

#### **Colores de Bordes**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Border** | `#E2E8F0` | Bordes de cards, inputs, separadores | `border-border` |

---

### 🌙 MODO DARK

#### **Colores Principales**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Primary Dark** | `#38BDF8` | Color principal en dark mode (Azul claro) | `bg-primary-dark` / `text-primary-dark` |
| **Accent** | `#14B8A6` | Color de acento (mismo que light) | `bg-accent` / `text-accent` |

#### **Colores de Fondo**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Background Dark** | `#020617` | Fondo principal oscuro | `bg-background-dark` |
| **Surface Dark** | `#0F172A` | Fondo de cards, modales oscuros | `bg-surface-dark` |

#### **Colores de Texto**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Text Primary Dark** | `#E5E7EB` | Texto principal en dark mode | `text-text-primary-dark` |
| **Text Secondary Dark** | `#9CA3AF` | Texto secundario en dark mode | `text-text-secondary-dark` |

#### **Colores de Bordes**

| Color | Código HEX | Uso | Clase Tailwind |
|-------|------------|-----|----------------|
| **Border Dark** | `#1E293B` | Bordes en dark mode | `border-border-dark` |

---

## 🚦 COLORES DE ESTADO

| Estado | Código HEX | Uso | Clase Tailwind |
|--------|------------|-----|----------------|
| **Success** | `#22C55E` | Éxito, confirmación, disponible | `bg-success` / `text-success` |
| **Warning** | `#FACC15` | Advertencia, atención | `bg-warning` / `text-warning` |
| **Error** | `#EF4444` | Error, peligro, ocupado | `bg-error` / `text-error` |

---

## 🎯 SISTEMA DE DISEÑO

### **Principios de Diseño**

1. **Sin Degradados**: Todos los colores son sólidos, sin `gradient`
2. **Contraste Alto**: Texto legible en ambos modos
3. **Consistencia**: Misma paleta en toda la aplicación
4. **Responsive**: Funciona en todas las pantallas

### **Tipografía**

#### Headings
```css
h1: text-4xl sm:text-5xl lg:text-6xl font-bold
h2: text-3xl sm:text-4xl lg:text-5xl font-bold
h3: text-2xl sm:text-3xl lg:text-4xl font-bold
```

#### Body
```css
body: text-base text-text-secondary
body-large: text-lg text-text-secondary
body-small: text-sm text-text-secondary
```

### **Espaciado**

| Tamaño | Valor | Uso |
|--------|-------|-----|
| xs | `0.25rem` (4px) | Espaciado mínimo |
| sm | `0.5rem` (8px) | Espaciado pequeño |
| md | `1rem` (16px) | Espaciado medio |
| lg | `1.5rem` (24px) | Espaciado grande |
| xl | `2rem` (32px) | Espaciado extra grande |

### **Bordes y Redondeo**

| Elemento | Border Radius | Clase |
|----------|---------------|-------|
| Botones | `0.5rem` (8px) | `rounded-lg` |
| Cards | `0.75rem` (12px) | `rounded-xl` |
| Badges | `9999px` (full) | `rounded-full` |
| Inputs | `0.5rem` (8px) | `rounded-lg` |

---

## 🧩 COMPONENTES

### **Navbar**

**Características:**
- Fondo con `backdrop-blur` para efecto glassmorphism
- Logo con imagen `LOGOLETRA1.png`
- Navegación con línea inferior animada al hover
- Botón de tema con rotación
- Botón "Ingresar" con efecto de barrido

**Clases principales:**
```tsx
bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-xl
border-b border-border/50 dark:border-border-dark/50
```

### **Botones**

#### Botón Primary
```tsx
bg-accent text-white rounded-xl font-semibold
hover:bg-accent-dark transition-all duration-300
shadow-md hover:shadow-lg
```

#### Botón Secondary (Outline)
```tsx
border-2 border-accent text-accent rounded-xl font-bold
hover:bg-accent/10 transition-colors
```

### **Cards**

```tsx
bg-surface dark:bg-surface-dark
border border-border dark:border-border-dark
rounded-2xl p-6 shadow-lg
hover:shadow-xl hover:-translate-y-1
transition-all duration-300
```

### **Badges**

```tsx
// Success
bg-success/10 text-success border border-success/20 rounded-full

// Warning
bg-warning/10 text-warning border border-warning/20 rounded-full

// Error
bg-error/10 text-error border border-error/20 rounded-full
```

---

## ✨ ANIMACIONES

### **Animaciones Disponibles**

| Animación | Duración | Uso |
|-----------|----------|-----|
| `fade-in-up` | 0.8s | Elementos que aparecen desde abajo |
| `fade-in` | 0.6s | Elementos que aparecen suavemente |
| `slide-up` | 0.8s | Elementos que se deslizan hacia arriba |
| `float` | 3s (infinite) | Elementos flotantes |
| `blob` | 7s (infinite) | Fondos animados |
| `glow` | 2s (infinite) | Efectos de brillo |
| `pulse-slow` | 3s (infinite) | Indicadores de estado |

### **Transiciones**

```css
/* Transiciones estándar */
transition-all duration-300
transition-colors duration-300
transition-transform duration-500

/* Hover effects */
hover:scale-105
hover:-translate-y-1
hover:shadow-xl
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints**

| Breakpoint | Tamaño | Uso |
|------------|--------|-----|
| `sm` | ≥ 640px | Móvil grande |
| `md` | ≥ 768px | Tablet / Desktop pequeño |
| `lg` | ≥ 1024px | Desktop |
| `xl` | ≥ 1280px | Desktop grande |
| `2xl` | ≥ 1536px | Pantallas muy grandes |

### **Grid System**

```tsx
// 1 columna (móvil)
grid grid-cols-1

// 2 columnas (tablet)
grid grid-cols-1 md:grid-cols-2

// 3 columnas (desktop)
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// 4 columnas (desktop grande)
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

### **Espaciado Responsive**

```tsx
// Padding
px-4 sm:px-6 lg:px-8
py-16 lg:py-24

// Texto
text-3xl sm:text-4xl lg:text-5xl xl:text-6xl

// Altura
h-16 lg:h-20
```

---

## 🎨 EJEMPLOS DE USO

### **Ejemplo 1: Botón Primary**

```tsx
<button className="px-6 py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent-dark transition-all duration-300 shadow-md hover:shadow-lg">
  Ingresar
</button>
```

### **Ejemplo 2: Card con Hover**

```tsx
<div className="bg-surface dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  {/* Contenido */}
</div>
```

### **Ejemplo 3: Badge de Estado**

```tsx
<div className="inline-flex items-center px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium">
  <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
  LIVE
</div>
```

### **Ejemplo 4: Texto con Modo Dark**

```tsx
<h1 className="text-3xl font-black text-text-primary dark:text-text-primary-dark">
  Título Principal
</h1>
<p className="text-base text-text-secondary dark:text-text-secondary-dark">
  Descripción secundaria
</p>
```

---

## 📝 NOTAS IMPORTANTES

1. **NO usar degradados**: Todos los colores deben ser sólidos
2. **Siempre incluir dark mode**: Usar `dark:` para todas las variantes
3. **Contraste mínimo**: Asegurar legibilidad en ambos modos
4. **Transiciones suaves**: Usar `duration-300` o `duration-500`
5. **Responsive primero**: Diseñar mobile-first

---

## 🔗 ARCHIVOS DE CONFIGURACIÓN

- **Tailwind Config**: `tailwind.config.js`
- **Theme System**: `src/styles/theme.ts`
- **Global Styles**: `styles/styles.css`
- **Componente Principal**: `src/components/LandingPage.tsx`

---

## 📊 RESUMEN VISUAL

### Light Mode
```
Background: #F8FAFC (Gris muy claro)
Surface: #FFFFFF (Blanco)
Primary: #0A2540 (Azul petróleo)
Accent: #14B8A6 (Teal)
Text: #0F172A (Casi negro)
```

### Dark Mode
```
Background: #020617 (Casi negro)
Surface: #0F172A (Azul muy oscuro)
Primary: #38BDF8 (Azul claro)
Accent: #14B8A6 (Teal - mismo)
Text: #E5E7EB (Gris muy claro)
```

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0
