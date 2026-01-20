'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useAuthRoute } from '@/hooks/useAuthRedirect';
import { PROTECTED_ROUTES } from '@/config/routes';
import { COLORS } from '@/config/colors';
import { LoginCredentials } from '@/types/auth';
import { 
  ParkingCircle, 
  Sun, 
  Moon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield,
  Sparkles,
  Car,
  Wifi,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  // Copiar texto al portapapeles y setear credenciales demo
  const handleDemoClick = (field: 'email' | 'password', value: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { handleLogin, authError, isLoading } = useAuthForm();

  const t = {
    es: {
      tagline: 'Sistema de Parking Inteligente',
      welcome: 'Bienvenido',
      subtitle: 'Ingresa a tu cuenta',
      email: 'Correo electrónico',
      password: 'Contraseña',
      forgot: '¿Olvidaste tu contraseña?',
      login: 'Ingresar',
      loading: 'Verificando...',
      demo: 'Cuenta demo',
      stat1: 'Espacios',
      stat2: 'Cámaras',
      stat3: 'Activo',
      secure: 'Conexión cifrada',
      online: 'En línea',
      iaVision: 'Visión IA',
      secure2: 'Seguro',
      uptime: '99.9% Disponible'
    },
    en: {
      tagline: 'Smart Parking System',
      welcome: 'Welcome',
      subtitle: 'Sign in to your account',
      email: 'Email address',
      password: 'Password',
      forgot: 'Forgot password?',
      login: 'Sign In',
      loading: 'Verifying...',
      demo: 'Demo account',
      stat1: 'Spaces',
      stat2: 'Cameras',
      stat3: 'Active',
      secure: 'Encrypted connection',
      online: 'Online',
      iaVision: 'AI Vision',
      secure2: 'Secure',
      uptime: '99.9% Uptime'
    }
  }[language];

  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language') as 'es' | 'en';
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const { isLoading: isAuthLoading, isAuthenticated, shouldRender } = useAuthRoute(PROTECTED_ROUTES.DASHBOARD);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(credentials);
    // useAuthRoute manejará la redirección automáticamente cuando isAuthenticated cambie a true
  };

  // Mostrar loader si:
  // 1. Está verificando autenticación inicial (isAuthLoading)
  // 2. El usuario está autenticado (esperando redirección)
  // 3. Está procesando el login (isLoading)
  if (isAuthLoading || isAuthenticated || isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #0D3A5C 100%)` }}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-2xl bg-white/10 animate-ping" />
            <div className="relative w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ParkingCircle className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-white text-sm mt-4 opacity-80">
            {isLoading ? 'Verificando credenciales...' : 'Redirigiendo...'}
          </p>
        </div>
      </div>
    );
  }

  // No renderizar el formulario si no debería mostrarse
  if (!shouldRender) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden transition-colors duration-500" style={{ backgroundColor: colors.background }}>
      {/* ===== LADO IZQUIERDO - VISUAL ===== */}
      <div 
        className="hidden lg:flex lg:w-[55%] relative transition-all duration-700"
        style={{ 
          background: isDarkMode 
            ? `linear-gradient(145deg, #0F172A 0%, ${COLORS.light.primary} 50%, #081A2E 100%)`
            : `linear-gradient(145deg, ${COLORS.light.primary} 0%, #0D3A5C 50%, #081A2E 100%)`
        }}
      >
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos animados */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
            style={{ 
              background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
              top: '-15%', left: '-10%',
              animation: 'float 8s ease-in-out infinite'
            }} 
          />
          <div 
            className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ 
              background: 'radial-gradient(circle, white 0%, transparent 70%)',
              bottom: '-10%', right: '-5%',
              animation: 'float 10s ease-in-out infinite reverse'
            }} 
          />
          <div 
            className="absolute w-[200px] h-[200px] rounded-full opacity-[0.1]"
            style={{ 
              background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
              top: '50%', right: '20%',
              animation: 'float 6s ease-in-out infinite 1s'
            }} 
          />

          {/* Grid de líneas */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12 xl:p-16">
          {/* Header */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                  backgroundColor: colors.accent,
                  boxShadow: `0 8px 32px ${colors.accent}60`
                }}
              >
                <ParkingCircle className="w-6 h-6 text-white transition-all duration-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white transition-all duration-300">Parkintia</h1>
                <p className="text-xs text-white/50 transition-all duration-300">{t.tagline}</p>
              </div>
            </Link>
          </div>

          {/* Centro - Stats visuales */}
          <div className={`flex-1 flex items-center justify-center transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="text-center">
              {/* Círculo central con animación */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                {/* Anillos animados */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-white/10"
                  style={{ animation: 'spin 20s linear infinite' }}
                />
                <div 
                  className="absolute inset-4 rounded-full border border-white/5"
                  style={{ animation: 'spin 15s linear infinite reverse' }}
                />
                <div 
                  className="absolute inset-8 rounded-full border border-dashed border-white/10"
                  style={{ animation: 'spin 25s linear infinite' }}
                />
                
                {/* Centro */}
                <div className="absolute inset-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-500">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-1 transition-all duration-500" style={{ textShadow: `0 0 40px ${colors.accent}` }}>
                      24/7
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-widest transition-all duration-300">
                      {t.stat3}
                    </div>
                  </div>
                </div>

                {/* Indicadores orbitales */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 transition-all duration-300"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  <Car className="w-3.5 h-3.5 text-white transition-all duration-300" />
                  <span className="text-xs font-medium text-white transition-all duration-300">500+ {t.stat1}</span>
                </div>
                <div 
                  className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 transition-all duration-300"
                  style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}
                >
                  <Wifi className="w-3.5 h-3.5 transition-all duration-300" style={{ color: COLORS.status.success }} />
                  <span className="text-xs font-medium text-white transition-all duration-300">8 {t.stat2}</span>
                </div>
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300"
                  style={{ 
                    backgroundColor: `${COLORS.status.success}20`,
                    border: `1px solid ${COLORS.status.success}40`,
                    animation: 'float 4.5s ease-in-out infinite 1s'
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.status.success }} />
                  <span className="text-xs font-medium transition-all duration-300" style={{ color: COLORS.status.success }}>{t.online}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex justify-center gap-4">
                {[
                  { icon: Sparkles, label: t.iaVision },
                  { icon: Shield, label: t.secure2 },
                  { icon: CheckCircle2, label: t.uptime }
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <item.icon className="w-3.5 h-3.5 transition-all duration-300" style={{ color: colors.accent }} />
                    <span className="text-xs font-medium text-white/80 transition-all duration-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.secure}</span>
            </div>
            <div className="text-white/30 text-xs">
              © 2025 Parkintia
            </div>
          </div>
        </div>

      </div>

      {/* ===== LADO DERECHO - FORMULARIO ===== */}
      <div className="flex-1 flex flex-col min-h-screen transition-colors duration-500" style={{ backgroundColor: colors.background }}>
        {/* Header */}
        <header className="flex justify-between items-center p-5">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500" style={{ backgroundColor: colors.accent }}>
              <ParkingCircle className="w-5 h-5 text-white transition-all duration-300" />
            </div>
            <span className="font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>Parkintia</span>
          </Link>
          <div className="lg:flex-1" />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="w-8 h-6 rounded overflow-hidden transition-transform hover:scale-110 cursor-pointer"
            >
              {language === 'es' ? (
                <svg viewBox="0 0 3 2" className="w-full h-full">
                  <rect width="3" height="2" fill="#c60b1e"/>
                  <rect width="3" height="1" y="0.5" fill="#ffc400"/>
                </svg>
              ) : (
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <rect width="60" height="30" fill="#012169"/>
                  <path stroke="#fff" strokeWidth="6" d="M0 0l60 30m0-30L0 30"/>
                  <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30"/>
                  <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/>
                  <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60"/>
                </svg>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer"
              style={{ backgroundColor: isDarkMode ? 'rgba(250,204,21,0.15)' : 'rgba(99,102,241,0.1)' }}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 transition-all duration-300" /> : <Moon className="w-4 h-4 text-indigo-500 transition-all duration-300" />}
            </button>
          </div>
        </header>

        {/* Formulario */}
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8 pb-8">
          <div className={`w-full max-w-sm transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Encabezado del form */}
            <div className="text-center mb-8">
              <div className="lg:hidden w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500" style={{ backgroundColor: `${colors.accent}15` }}>
                <ParkingCircle className="w-7 h-7 transition-all duration-500" style={{ color: colors.accent }} />
              </div>
              <h2 className="text-2xl font-bold mb-1 transition-colors duration-300" style={{ color: colors.textPrimary }}>
                {t.welcome}
              </h2>
              <p className="text-sm transition-colors duration-300" style={{ color: colors.textSecondary }}>
                {t.subtitle}
              </p>
            </div>

            {/* Error */}
            {authError && (
              <div 
                className="mb-6 p-3 rounded-lg flex items-center gap-2 animate-shake"
                style={{ 
                  backgroundColor: `${COLORS.status.error}10`,
                  border: `1px solid ${COLORS.status.error}30`
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.status.error }} />
                <span className="text-sm" style={{ color: COLORS.status.error }}>{authError.message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-2 transition-colors duration-300" style={{ color: colors.textSecondary }}>
                  {t.email}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : colors.surface,
                      border: `2px solid ${focusedField === 'email' ? colors.accent : colors.border}`,
                      color: colors.textPrimary,
                      boxShadow: focusedField === 'email' ? `0 0 0 4px ${colors.accent}15` : 'none'
                    }}
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium transition-colors duration-300" style={{ color: colors.textSecondary }}>
                    {t.password}
                  </label>
                  <button type="button" className="text-xs font-medium transition-all duration-300 hover:underline cursor-pointer" style={{ color: colors.accent }}>
                    {t.forgot}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : colors.surface,
                      border: `2px solid ${focusedField === 'password' ? colors.accent : colors.border}`,
                      color: colors.textPrimary,
                      boxShadow: focusedField === 'password' ? `0 0 0 4px ${colors.accent}15` : 'none'
                    }}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-all duration-300 cursor-pointer"
                    style={{ color: colors.textSecondary }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-500 disabled:opacity-60 hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: colors.accent,
                  boxShadow: `0 4px 20px ${colors.accent}40`
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.loading}</span>
                  </>
                ) : (
                  <>
                    <span>{t.login}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div 
              className="mt-6 p-4 rounded-xl text-center transition-all duration-500"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(20,184,166,0.08)' : `${colors.accent}08`,
                border: `1px dashed ${colors.accent}30`
              }}
            >
              <p className="text-xs mb-2 transition-colors duration-300" style={{ color: colors.textSecondary }}>
                {t.demo}
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <code 
                  className="px-2 py-1 rounded text-xs cursor-pointer transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: colors.textPrimary }}
                  title="Copiar correo demo"
                  onClick={() => handleDemoClick('email', 'demo@parkintia.com')}
                >
                  demo@parkintia.com
                </code>
                <span className="transition-colors duration-300" style={{ color: colors.textSecondary }}>/</span>
                <code 
                  className="px-2 py-1 rounded text-xs cursor-pointer transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: colors.textPrimary }}
                  title="Copiar contraseña demo"
                  onClick={() => handleDemoClick('password', 'demo123')}
                >
                  demo123
                </code>
              </div>
            </div>

            {/* Footer mobile */}
            <p className="lg:hidden text-center mt-6 text-xs transition-colors duration-300" style={{ color: colors.textSecondary }}>
              © 2025 Parkintia
            </p>
          </div>
        </main>
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
