'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COLORS } from '@/config/colors';
import { 
  Bot, 
  Zap, 
  BarChart3, 
  Rocket, 
  Video, 
  ParkingCircle,
  Eye,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Camera
} from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 group">
              <div className="relative">
                <ParkingCircle 
                  className="w-8 h-8 transition-all duration-300 group-hover:scale-110" 
                  style={{ color: COLORS.primary.medium }} 
                />
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div 
                className="text-2xl font-bold bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: COLORS.gradients.primary
                }}
              >
                Parkintia
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Características
                </a>
              </nav>
              
              <div className="flex items-center space-x-3 ml-6">
                <Link 
                  href="/login"
                  className="group px-4 py-2 text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                >
                  <span className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Iniciar Sesión</span>
                  </span>
                </Link>
                <Link 
                  href="/register"
                  className="group px-6 py-2 text-sm font-medium text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  style={{
                    background: COLORS.gradients.primary,
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Registrarse</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
      <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gray-900">Gestión de </span>
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: COLORS.gradients.primary }}
                >
                  Parqueaderos
                </span>
                <br />
                <span className="text-gray-900">Inteligente</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Detecta automáticamente espacios disponibles con IA. 
                Optimiza la gestión de tu parqueadero en tiempo real.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link 
                  href="/login"
                  className="group px-8 py-4 text-lg font-medium text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 min-w-[200px]"
                  style={{
                    background: COLORS.gradients.primary,
                  }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Rocket className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                    <span>Comenzar Ahora</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <button className="group px-8 py-4 text-lg font-medium border-2 bg-transparent hover:bg-gray-50 hover:-translate-y-2 rounded-xl transition-all duration-500 min-w-[200px] hover:scale-105"
                  style={{
                    borderColor: COLORS.primary.medium,
                    color: COLORS.primary.medium,
                  }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Video className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>Ver Demo</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Demo Visual */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div 
                className="mx-auto max-w-4xl rounded-2xl p-8 shadow-2xl"
                style={{ 
                  background: COLORS.gradients.light,
                  boxShadow: '0 25px 50px rgba(30, 103, 211, 0.15)'
                }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                      <BarChart3 className="w-6 h-6" style={{ color: COLORS.primary.medium }} />
                      <span>Panel de Control</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">En vivo</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:scale-105 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold text-green-600">24</div>
                        <CheckCircle className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-gray-600">Espacios Disponibles</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl hover:scale-105 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold text-red-600">16</div>
                        <Camera className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-gray-600">Espacios Ocupados</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:scale-105 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold" style={{ color: COLORS.primary.medium }}>60%</div>
                        <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: COLORS.primary.medium }} />
                      </div>
                      <div className="text-gray-600">Ocupación</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir Parkintia?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnología de vanguardia para revolucionar la gestión de parqueaderos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: 'IA Avanzada',
                description: 'Detección automática con precisión del 98% usando visión por computadora',
                color: 'text-blue-600',
                bgColor: 'from-blue-50 to-blue-100'
              },
              {
                icon: Zap,
                title: 'Tiempo Real',
                description: 'Monitoreo instantáneo con actualizaciones cada segundo',
                color: 'text-yellow-600',
                bgColor: 'from-yellow-50 to-yellow-100'
              },
              {
                icon: BarChart3,
                title: 'Análisis Inteligente',
                description: 'Reportes detallados y predicciones de ocupación',
                color: 'text-green-600',
                bgColor: 'from-green-50 to-green-100'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgColor} mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className={`w-8 h-8 ${feature.color} group-hover:rotate-12 transition-all duration-300`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="rounded-3xl p-12 shadow-2xl"
            style={{ 
              background: COLORS.gradients.primary,
              boxShadow: '0 25px 50px rgba(30, 103, 211, 0.3)'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para optimizar tu parqueadero?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a las empresas que ya están revolucionando su gestión de espacios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login"
                className="group px-8 py-4 text-lg font-medium bg-white text-gray-700 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 min-w-[200px] hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Solicitar Demo</span>
                </span>
              </Link>
              <button className="group px-8 py-4 text-lg font-medium border-2 text-white border-white hover:bg-white hover:text-blue-600 rounded-xl transition-all duration-500 min-w-[200px] hover:scale-105 hover:-translate-y-2">
                <span className="flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Hablar con Ventas</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ParkingCircle className="w-8 h-8" style={{ color: COLORS.primary.light }} />
            <div 
              className="text-3xl font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: COLORS.gradients.primary }}
            >
              Parkintia
            </div>
          </div>
          <p className="text-gray-400 mb-6">
            Revolucionando la gestión de parqueaderos con inteligencia artificial
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
          </div>
      </div>
      </footer>
    </div>
  );
}
