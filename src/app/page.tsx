'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { COLORS } from '@/config/colors';
import { 
  Bot, 
  Zap, 
  BarChart3, 
  Rocket, 
  ParkingCircle,
  LogIn,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Camera,
  Sun,
  Moon,
  Shield,
  Clock,
  MapPin,
  Car,
  ChevronRight,
  Star,
  Gauge,
  Wifi,
  Menu,
  X,
  Target,
  Activity,
  Timer,
  MessageCircle,
  Headphones,
  DollarSign,
  Percent,
  Building2,
  GraduationCap,
  Hospital,
  ShoppingBag,
  BadgeCheck,
  Layers,
  Globe,
  Award,
  CircleCheck,
  Sparkles,
  Check,
  Crown,
  Briefcase,
  Building
} from 'lucide-react';
import { ChatbaseWidget } from '@/components/chatbot/ChatbaseWidget';

// Hook personalizado para animar números
function useCountUp(end: number, duration: number = 2000, start: number = 0, suffix: string = '') {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, start, duration]);

  return { count: count + suffix, ref };
}

// Hook para animaciones de scroll
function useScrollAnimation(threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isInView, ref };
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPricingCard, setSelectedPricingCard] = useState<number | null>(null);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Traducciones
  const translations = {
    es: {
      nav: {
        features: 'Características',
        benefits: 'Beneficios',
        pricing: 'Precios',
        demo: 'Demo',
        login: 'Ingresar'
      },
      hero: {
        badge: 'Tecnología de Vanguardia',
        title1: 'Revoluciona tu',
        title2: 'Parqueadero',
        subtitle: 'Sistema completo de gestión con',
        feature1: 'visión por computador',
        feature2: 'chatbot integrado',
        feature3: 'y análisis en tiempo real.',
        cta1: 'Comenzar Ahora',
        cta2: 'Ver Demo',
        stats: {
          precision: 'Precisión de IA',
          latency: 'Tiempo respuesta',
          uptime: 'Disponibilidad',
          savings: 'Ahorro costos'
        }
      },
      features: {
        badge: 'Características Principales',
        title: 'Todo lo que Necesitas',
        subtitle: 'Herramientas avanzadas para la gestión inteligente de tu parqueadero',
        items: [
          { title: 'Detección por IA', desc: 'Identificación automática de vehículos con visión por computador de alta precisión' },
          { title: 'Chatbot 24/7', desc: 'Asistente virtual inteligente para consultas y reservas en cualquier momento' },
          { title: 'Dashboard en Vivo', desc: 'Monitoreo en tiempo real de ocupación, ingresos y estadísticas' },
          { title: 'Análisis Predictivo', desc: 'Predicciones de demanda y optimización automática de espacios' },
          { title: 'Multi-ubicación', desc: 'Gestiona múltiples parqueaderos desde una sola plataforma' },
          { title: 'Reportes Avanzados', desc: 'Informes detallados y exportables para toma de decisiones' }
        ]
      },
      benefits: {
        badge: 'Beneficios Clave',
        title: '¿Por qué elegir',
        titleHighlight: 'Parkintia',
        subtitle: 'Transforma la gestión de tu parqueadero con tecnología de punta',
        items: [
          { title: 'Reduce Costos', desc: 'Elimina la necesidad de personal de control manual y sensores costosos' },
          { title: 'Aumenta Ingresos', desc: 'Optimiza la rotación de vehículos y maximiza la ocupación' },
          { title: 'Mejora Experiencia', desc: 'Ofrece a tus clientes una experiencia moderna y sin fricciones' },
          { title: 'Datos en Tiempo Real', desc: 'Toma decisiones informadas con analytics avanzados' }
        ]
      },
      pricing: {
        badge: 'Planes y Precios',
        title: 'Elige el Plan Perfecto para tu',
        titleHighlight: 'Negocio',
        subtitle: 'Precios transparentes sin costos ocultos. Todos los planes incluyen soporte técnico y actualizaciones.',
        monthly: 'Mensual',
        yearly: 'Anual',
        discount: '-17%',
        saveBadge: 'Ahorra 2 meses con el plan anual',
        perMonth: '/mes',
        savings: '2 meses gratis incluidos',
        cta: 'Comenzar Ahora',
        selected: 'Plan Seleccionado',
        popular: 'MÁS POPULAR'
      },
      cta: {
        badge: 'Sin compromiso',
        title1: 'Transforma tu',
        title2: 'Parqueadero',
        title3: 'Hoy',
        subtitle: 'Solicita una demostración personalizada y descubre cómo Parkintia puede revolucionar la gestión de tu espacio de estacionamiento.',
        feature1: 'Demo gratuita',
        feature2: 'Implementación rápida',
        feature3: 'Soporte 24/7',
        cta1: 'Solicitar Demo Gratis',
        cta2: 'Hablar con Ventas'
      },
      footer: {
        description: 'Sistema inteligente de gestión de parqueaderos con IA y visión por computador.',
        security: 'Datos seguros',
        support: 'Soporte 24/7',
        product: 'Producto',
        company: 'Empresa',
        legal: 'Legal',
        rights: 'Todos los derechos reservados.'
      }
    },
    en: {
      nav: {
        features: 'Features',
        benefits: 'Benefits',
        pricing: 'Pricing',
        demo: 'Demo',
        login: 'Login'
      },
      hero: {
        badge: 'Cutting-edge Technology',
        title1: 'Revolutionize your',
        title2: 'Parking Lot',
        subtitle: 'Complete management system with',
        feature1: 'computer vision',
        feature2: 'integrated chatbot',
        feature3: 'and real-time analytics.',
        cta1: 'Get Started',
        cta2: 'View Demo',
        stats: {
          precision: 'AI Precision',
          latency: 'Response Time',
          uptime: 'Availability',
          savings: 'Cost Savings'
        }
      },
      features: {
        badge: 'Main Features',
        title: 'Everything You Need',
        subtitle: 'Advanced tools for intelligent parking management',
        items: [
          { title: 'AI Detection', desc: 'Automatic vehicle identification with high-precision computer vision' },
          { title: '24/7 Chatbot', desc: 'Intelligent virtual assistant for queries and reservations anytime' },
          { title: 'Live Dashboard', desc: 'Real-time monitoring of occupancy, revenue and statistics' },
          { title: 'Predictive Analytics', desc: 'Demand predictions and automatic space optimization' },
          { title: 'Multi-location', desc: 'Manage multiple parking lots from a single platform' },
          { title: 'Advanced Reports', desc: 'Detailed and exportable reports for decision making' }
        ]
      },
      benefits: {
        badge: 'Key Benefits',
        title: 'Why choose',
        titleHighlight: 'Parkintia',
        subtitle: 'Transform your parking management with cutting-edge technology',
        items: [
          { title: 'Reduce Costs', desc: 'Eliminate the need for manual control staff and expensive sensors' },
          { title: 'Increase Revenue', desc: 'Optimize vehicle turnover and maximize occupancy' },
          { title: 'Improve Experience', desc: 'Offer your customers a modern, frictionless experience' },
          { title: 'Real-time Data', desc: 'Make informed decisions with advanced analytics' }
        ]
      },
      pricing: {
        badge: 'Plans & Pricing',
        title: 'Choose the Perfect Plan for your',
        titleHighlight: 'Business',
        subtitle: 'Transparent pricing with no hidden costs. All plans include technical support and updates.',
        monthly: 'Monthly',
        yearly: 'Yearly',
        discount: '-17%',
        saveBadge: 'Save 2 months with annual plan',
        perMonth: '/month',
        savings: '2 months free included',
        cta: 'Get Started',
        selected: 'Selected Plan',
        popular: 'MOST POPULAR'
      },
      cta: {
        badge: 'No commitment',
        title1: 'Transform your',
        title2: 'Parking Lot',
        title3: 'Today',
        subtitle: 'Request a personalized demo and discover how Parkintia can revolutionize your parking space management.',
        feature1: 'Free demo',
        feature2: 'Quick implementation',
        feature3: '24/7 Support',
        cta1: 'Request Free Demo',
        cta2: 'Talk to Sales'
      },
      footer: {
        description: 'Intelligent parking management system with AI and computer vision.',
        security: 'Secure data',
        support: '24/7 Support',
        product: 'Product',
        company: 'Company',
        legal: 'Legal',
        rights: 'All rights reserved.'
      }
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  // Animación de contadores
  const precision = useCountUp(98, 2000, 0, '%');
  const latency = useCountUp(1, 1500, 0, '');
  const uptime = useCountUp(24, 1800, 0, '');
  const savings = useCountUp(40, 2200, 0, '%');

  // Animaciones de scroll para cada sección
  const featuresAnim = useScrollAnimation(0.1);
  const benefitsAnim = useScrollAnimation(0.1);
  const pricingAnim = useScrollAnimation(0.1);
  const ctaAnim = useScrollAnimation(0.1);
  const techAnim = useScrollAnimation(0.1);

  useEffect(() => {
    setIsVisible(true);
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['features', 'benefits', 'pricing', 'demo'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Estadísticas del Hero
  const heroStats = [
    {
      icon: Target,
      value: precision.count,
      ref: precision.ref,
      label: language === 'es' ? 'Precisión de IA' : 'AI Accuracy',
      description: language === 'es' ? 'Detección exacta de vehículos' : 'Precise vehicle detection',
      color: COLORS.status.success
    },
    {
      icon: Timer,
      value: `<${latency.count}s`,
      ref: latency.ref,
      label: language === 'es' ? 'Respuesta Inmediata' : 'Instant Response',
      description: language === 'es' ? 'Actualización en tiempo real' : 'Real-time updates',
      color: COLORS.status.warning
    },
    {
      icon: Activity,
      value: `${uptime.count}/7`,
      ref: uptime.ref,
      label: language === 'es' ? 'Siempre Activo' : 'Always Active',
      description: language === 'es' ? 'Monitoreo sin interrupciones' : 'Uninterrupted monitoring',
      color: colors.accent
    }
  ];

  // Features
  const features = [
    {
      icon: Camera,
      title: language === 'es' ? 'Visión por Computador' : 'Computer Vision',
      description: language === 'es' 
        ? 'Algoritmos de IA que detectan vehículos con precisión del 98%. Sin sensores físicos, solo cámaras inteligentes.'
        : 'AI algorithms that detect vehicles with 98% accuracy. No physical sensors, just intelligent cameras.',
      stat: '98%',
      statLabel: language === 'es' ? 'Precisión' : 'Accuracy',
      highlight: true
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Monitoreo en Tiempo Real' : 'Real-Time Monitoring',
      description: language === 'es'
        ? 'Actualización instantánea del estado de cada espacio. Latencia menor a 1 segundo para decisiones inmediatas.'
        : 'Instant status updates for each space. Less than 1 second latency for immediate decisions.',
      stat: '<1s',
      statLabel: language === 'es' ? 'Latencia' : 'Latency'
    },
    {
      icon: MessageCircle,
      title: language === 'es' ? 'Asistente Virtual 24/7' : 'Virtual Assistant 24/7',
      description: language === 'es'
        ? 'Chatbot inteligente integrado que responde consultas, guía a usuarios y proporciona soporte automático.'
        : 'Integrated intelligent chatbot that answers queries, guides users, and provides automatic support.',
      stat: '24/7',
      statLabel: language === 'es' ? 'Disponible' : 'Available',
      highlight: true
    },
    {
      icon: BarChart3,
      title: language === 'es' ? 'Análisis y Reportes' : 'Analytics & Reports',
      description: language === 'es'
        ? 'Dashboard completo con métricas de ocupación, tendencias históricas y predicciones basadas en datos.'
        : 'Complete dashboard with occupancy metrics, historical trends, and data-driven predictions.',
      stat: '100+',
      statLabel: language === 'es' ? 'Métricas' : 'Metrics'
    },
    {
      icon: Camera,
      title: language === 'es' ? 'Compatible con Cámaras' : 'Camera Compatible',
      description: language === 'es'
        ? 'Funciona con cualquier cámara IP o CCTV existente. Aprovecha tu infraestructura actual sin inversión adicional.'
        : 'Works with any existing IP or CCTV camera. Leverage your current infrastructure without additional investment.',
      stat: '0',
      statLabel: language === 'es' ? 'Sensores' : 'Sensors'
    },
    {
      icon: Shield,
      title: language === 'es' ? 'Seguridad Empresarial' : 'Enterprise Security',
      description: language === 'es'
        ? 'Encriptación de nivel bancario para proteger los datos de tu negocio y la privacidad de tus usuarios.'
        : 'Bank-level encryption to protect your business data and user privacy.',
      stat: '256-bit',
      statLabel: language === 'es' ? 'Encriptación' : 'Encryption'
    }
  ];

  // Beneficios
  const benefits = [
    { 
      icon: DollarSign, 
      title: language === 'es' ? 'Reduce Costos Operativos' : 'Reduce Operating Costs',
      description: language === 'es' 
        ? 'Elimina la necesidad de personal de control manual y sensores costosos'
        : 'Eliminates the need for manual control personnel and expensive sensors'
    },
    { 
      icon: Clock, 
      title: language === 'es' ? 'Ahorra Tiempo a tus Clientes' : 'Save Your Customers Time',
      description: language === 'es'
        ? 'Los usuarios encuentran estacionamiento hasta 70% más rápido'
        : 'Users find parking up to 70% faster'
    },
    { 
      icon: TrendingUp, 
      title: language === 'es' ? 'Aumenta la Rotación' : 'Increase Turnover',
      description: language === 'es'
        ? 'Optimiza el flujo vehicular y maximiza el uso de cada espacio'
        : 'Optimize vehicle flow and maximize the use of each space'
    },
    { 
      icon: Users, 
      title: language === 'es' ? 'Mejora la Experiencia' : 'Improve Experience',
      description: language === 'es'
        ? 'Usuarios más satisfechos que regresan y recomiendan tu establecimiento'
        : 'More satisfied users who return and recommend your establishment'
    },
    { 
      icon: BarChart3, 
      title: language === 'es' ? 'Decisiones Basadas en Datos' : 'Data-Driven Decisions',
      description: language === 'es'
        ? 'Reportes detallados para planificación y optimización continua'
        : 'Detailed reports for planning and continuous optimization'
    },
    { 
      icon: Headphones, 
      title: language === 'es' ? 'Soporte Automatizado' : 'Automated Support',
      description: language === 'es'
        ? 'Chatbot que resuelve dudas sin intervención humana 24/7'
        : 'Chatbot that resolves queries without human intervention 24/7'
    }
  ];

  // Planes de precios oficiales
  const pricingPlans = [
    {
      name: 'Starter',
      icon: Briefcase,
      description: language === 'es' 
        ? 'Parqueaderos pequeños (hasta 30-40 espacios)'
        : 'Small parking lots (up to 30-40 spaces)',
      monthlyPrice: 29,
      yearlyPrice: 290,
      spaces: language === 'es' ? 'Hasta 30-40 espacios' : 'Up to 30-40 spaces',
      cameras: language === 'es' ? '1 cámara' : '1 camera',
      features: language === 'es' ? [
        'Detección ocupado/libre',
        'Dashboard básico',
        'Reporte mensual',
        'Soporte básico'
      ] : [
        'Occupied/free detection',
        'Basic dashboard',
        'Monthly report',
        'Basic support'
      ],
      popular: false
    },
    {
      name: language === 'es' ? 'Profesional' : 'Professional',
      icon: Building,
      description: language === 'es'
        ? 'Negocios medianos (malls pequeños, clínicas, universidades)'
        : 'Medium businesses (small malls, clinics, universities)',
      monthlyPrice: 99,
      yearlyPrice: 990,
      spaces: language === 'es' ? 'Hasta 200 espacios' : 'Up to 200 spaces',
      cameras: language === 'es' ? 'Hasta 4 cámaras' : 'Up to 4 cameras',
      features: language === 'es' ? [
        'Dashboard avanzado',
        'Reportes automáticos (PDF / Excel)',
        'Chatbot activo',
        'Historial y estadísticas',
        'Soporte prioritario'
      ] : [
        'Advanced dashboard',
        'Automated reports (PDF / Excel)',
        'Active chatbot',
        'History and statistics',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: language === 'es'
        ? 'Grandes empresas / cadenas'
        : 'Large companies / chains',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      spaces: language === 'es' ? 'Espacios ilimitados' : 'Unlimited spaces',
      cameras: language === 'es' ? 'Cámaras ilimitadas' : 'Unlimited cameras',
      features: language === 'es' ? [
        'Múltiples parqueaderos',
        'Chatbot avanzado',
        'Reportes personalizados',
        'Usuarios por rol',
        'Soporte dedicado + SLA'
      ] : [
        'Multiple parking lots',
        'Advanced chatbot',
        'Custom reports',
        'Role-based users',
        'Dedicated support + SLA'
      ],
      popular: false
    }
  ];

  // Sectores
  const sectors = [
    { icon: ShoppingBag, name: language === 'es' ? 'Centros Comerciales' : 'Shopping Centers' },
    { icon: Building2, name: language === 'es' ? 'Edificios Corporativos' : 'Corporate Buildings' },
    { icon: GraduationCap, name: language === 'es' ? 'Universidades' : 'Universities' },
    { icon: Hospital, name: language === 'es' ? 'Hospitales y Clínicas' : 'Hospitals & Clinics' },
    { icon: MapPin, name: language === 'es' ? 'Espacios Públicos' : 'Public Spaces' },
    { icon: Globe, name: language === 'es' ? 'Aeropuertos' : 'Airports' }
  ];

  const stats = [
    { value: '24', label: language === 'es' ? 'Espacios Disponibles' : 'Available Spaces', color: COLORS.status.success, icon: CheckCircle },
    { value: '16', label: language === 'es' ? 'Espacios Ocupados' : 'Occupied Spaces', color: COLORS.status.error, icon: Car },
    { value: '60%', label: language === 'es' ? 'Ocupación Actual' : 'Current Occupancy', color: colors.accent, icon: Gauge },
    { value: '4', label: language === 'es' ? 'Cámaras Activas' : 'Active Cameras', color: colors.primary, icon: Wifi }
  ];

  const navLinks = [
    { href: '#features', label: t.nav.features },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#demo', label: t.nav.demo }
  ];

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.background }}
    >
      {/* ============================================
          NAVBAR MEJORADO
          ============================================ */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2 shadow-lg' : 'py-3'
        }`}
        style={{ 
          backgroundColor: scrolled 
            ? isDarkMode 
              ? `${colors.surface}FA` 
              : `${colors.surface}F8`
            : isDarkMode
              ? `${colors.surface}E8`
              : `${colors.surface}E5`,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? colors.border : 'transparent'}`,
          boxShadow: scrolled 
            ? isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.12)'
            : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            {/* Logo Mejorado - Más compacto en móvil */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 sm:space-x-3 group relative flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div 
                  className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                  style={{ 
                    backgroundColor: colors.accent,
                    boxShadow: `0 4px 12px ${colors.accent}40`
                  }}
                >
                  <ParkingCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Efecto de brillo */}
                <div 
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle, ${colors.accent}40 0%, transparent 70%)`
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-base sm:text-xl lg:text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                  style={{ color: colors.textPrimary }}
                >
                  Parkintia
                </span>
                <span 
                  className="text-[9px] sm:text-[10px] lg:text-xs font-medium -mt-0.5 hidden sm:block opacity-80"
                  style={{ color: colors.accent }}
                >
                  Intelligent Parking Management
                </span>
              </div>
            </Link>

            {/* Navigation Links - Desktop Mejorado */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a 
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl group"
                    style={{ 
                      color: isActive ? colors.accent : colors.textSecondary
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Fondo hover */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: `${colors.accent}10` }}
                    />
                    {/* Indicador activo */}
                    {isActive && (
                      <div 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full transition-all duration-300"
                        style={{ backgroundColor: colors.accent }}
                      />
                    )}
                    {/* Indicador hover */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-6"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Actions Mejorados - Optimizados para móvil */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">
              {/* Language Toggle - Animación suave con fade */}
              <button
                onClick={toggleLanguage}
                className="relative cursor-pointer hover:scale-110 transition-all duration-300 flex-shrink-0 border-0 bg-transparent p-0"
                style={{ 
                  width: '28px',
                  height: '28px'
                }}
                aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                {/* Bandera de España */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 3 2" 
                  className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    opacity: language === 'es' ? 1 : 0,
                    transform: language === 'es' ? 'scale(1)' : 'scale(0.8)',
                    pointerEvents: language === 'es' ? 'auto' : 'none',
                    borderRadius: '4px'
                  }}
                >
                  <rect width="3" height="2" fill="#c60b1e"/>
                  <rect width="3" height="1" y="0.5" fill="#ffc400"/>
                </svg>
                
                {/* Bandera del Reino Unido */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 60 30" 
                  className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    opacity: language === 'en' ? 1 : 0,
                    transform: language === 'en' ? 'scale(1)' : 'scale(0.8)',
                    pointerEvents: language === 'en' ? 'auto' : 'none',
                    borderRadius: '4px'
                  }}
                >
                  <clipPath id="ukClip"><rect width="60" height="30"/></clipPath>
                  <g clipPath="url(#ukClip)">
                    <path fill="#012169" d="M0 0v30h60V0z"/>
                    <path stroke="#fff" strokeWidth="6" d="M0 0l60 30m0-30L0 30"/>
                    <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30" clipPath="url(#ukClip)"/>
                    <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/>
                    <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60"/>
                  </g>
                </svg>
              </button>

              {/* Theme Toggle Mejorado - Más compacto en móvil */}
              <button
                onClick={toggleTheme}
                className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-500 hover:scale-110 overflow-hidden group cursor-pointer flex-shrink-0"
                style={{ 
                  backgroundColor: `${colors.border}60`,
                  color: colors.textPrimary
                }}
                aria-label="Cambiar tema"
              >
                <div className={`transition-all duration-500 ${isDarkMode ? 'rotate-0 scale-100' : 'rotate-90 scale-0'} absolute inset-0 flex items-center justify-center`}>
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </div>
                <div className={`transition-all duration-500 ${isDarkMode ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`}>
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                </div>
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"
                  style={{ 
                    boxShadow: isDarkMode 
                      ? '0 0 20px rgba(250, 204, 21, 0.4)' 
                      : '0 0 20px rgba(99, 102, 241, 0.4)'
                  }}
                />
              </button>

              {/* Botón Ingresar - Oculto en móvil pequeño, visible desde sm */}
              <Link 
                href="/login"
                className="hidden sm:flex group relative items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-lg cursor-pointer flex-shrink-0 whitespace-nowrap"
                style={{ 
                  color: isDarkMode ? colors.textPrimary : '#FFFFFF',
                  backgroundColor: isDarkMode ? colors.surface : colors.primary,
                  border: `2px solid ${isDarkMode ? colors.border : colors.primary}`,
                  boxShadow: isDarkMode 
                    ? `0 2px 8px ${colors.border}40` 
                    : `0 4px 12px ${colors.primary}30`
                }}
              >
                {/* Animated gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.accent}40 100%)`
                  }}
                />
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                
                {/* Icon with pulse animation */}
                <LogIn 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 group-hover:scale-110 relative z-10" 
                  style={{ color: isDarkMode ? colors.accent : '#FFFFFF' }}
                />
                
                {/* Text */}
                <span className="relative z-10 tracking-wide">
                  {t.nav.login}
                </span>
                
                {/* Arrow with slide animation - Oculta en pantallas pequeñas */}
                <ArrowRight 
                  className="hidden lg:block w-4 h-4 transition-all duration-300 group-hover:translate-x-1 relative z-10"
                  style={{ color: isDarkMode ? colors.accent : '#FFFFFF' }}
                />
              </Link>

              {/* Mobile Menu Button Mejorado - Más compacto */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 relative cursor-pointer flex-shrink-0"
                style={{ 
                  backgroundColor: `${colors.border}60`,
                  color: colors.textPrimary
                }}
                aria-label="Menú móvil"
              >
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Mejorado - Mejor espaciado */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-3 sm:mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div 
              className="rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-1.5 sm:space-y-2 shadow-xl"
              style={{ 
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 20px 40px -12px ${isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'}`
              }}
            >
              {/* Botón Ingresar en móvil - Visible solo en pantallas muy pequeñas (donde está oculto arriba) */}
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="sm:hidden group relative flex items-center justify-center gap-3 p-4 rounded-xl font-bold transition-all duration-300 mb-3 overflow-hidden active:scale-95 cursor-pointer"
                style={{ 
                  backgroundColor: colors.accent,
                  color: '#FFFFFF',
                  border: `2px solid ${colors.accent}`,
                  boxShadow: `0 6px 20px ${colors.accent}40`
                }}
              >
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.accentLight}30 0%, ${colors.accentDark}30 100%)`
                  }}
                />
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 -translate-x-full group-active:translate-x-full transition-transform duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)'
                  }}
                />
                
                {/* Icon */}
                <LogIn className="w-5 h-5 transition-all duration-300 group-active:scale-110 relative z-10" />
                
                {/* Text */}
                <span className="relative z-10 text-base tracking-wide">Ingresar a mi cuenta</span>
                
                {/* Arrow */}
                <ArrowRight className="w-5 h-5 transition-all duration-300 group-active:translate-x-1 relative z-10" />
              </Link>

              {/* Links de navegación - Mejor espaciado */}
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 active:scale-95 ${
                      isActive ? 'shadow-md' : ''
                    }`}
                    style={{ 
                      backgroundColor: isActive ? `${colors.accent}15` : 'transparent',
                      color: isActive ? colors.accent : colors.textPrimary,
                      border: isActive ? `1px solid ${colors.accent}30` : `1px solid transparent`,
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div 
                      className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                        isActive ? 'scale-150' : ''
                      }`}
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span className="font-semibold text-sm sm:text-base">{link.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: colors.accent }} />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div 
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 group cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: `${colors.accent}15`,
                  border: `1px solid ${colors.accent}30`
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.accent }}>
                  {t.hero.badge}
                </span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: colors.accent }} />
              </div>

              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
                style={{ color: colors.textPrimary }}
              >
                {t.hero.title1}{' '}
                <span style={{ color: colors.accent }}>{t.hero.title2}</span>
                <br />
                {language === 'es' ? 'en Inteligente' : 'Smart'}
              </h1>

              <p 
                className="text-lg lg:text-xl mb-8 max-w-xl leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {t.hero.subtitle} <strong style={{ color: colors.textPrimary }}>{t.hero.feature1}</strong>, 
                {' '}<strong style={{ color: colors.textPrimary }}>{t.hero.feature2}</strong> {t.hero.feature3}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {(language === 'es' ? [
                  { icon: CircleCheck, text: 'Sin sensores físicos' },
                  { icon: CircleCheck, text: 'Instalación en 24h' },
                  { icon: CircleCheck, text: 'ROI en 3 meses' }
                ] : [
                  { icon: CircleCheck, text: 'No physical sensors' },
                  { icon: CircleCheck, text: '24h Installation' },
                  { icon: CircleCheck, text: 'ROI in 3 months' }
                ]).map((prop, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <prop.icon className="w-5 h-5" style={{ color: COLORS.status.success }} />
                    <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{prop.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/login"
                  className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                  style={{ backgroundColor: colors.accent }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <Rocket className="w-5 h-5 transition-transform group-hover:rotate-12 relative z-10" />
                  <span className="relative z-10">{t.hero.cta1}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                </Link>

                <a
                  href="#pricing" 
                  className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: `2px solid ${colors.primary}`,
                    color: colors.primary
                  }}
                >
                  <DollarSign className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{language === 'es' ? 'Ver Precios' : 'View Pricing'}</span>
                </a>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={index}
                      ref={stat.ref}
                      className={`group relative p-4 lg:p-5 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ 
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.border}`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        transitionDelay: `${(index + 1) * 150}ms`
                      }}
                    >
                      <div 
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ 
                          backgroundColor: `${stat.color}20`,
                          border: `2px solid ${stat.color}30`
                        }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: stat.color }} />
                      </div>

                      <div 
                        className="text-3xl lg:text-4xl font-bold mb-1 transition-all duration-300 group-hover:scale-105"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>

                      <div className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                        {stat.label}
                      </div>

                      <div className="text-xs" style={{ color: colors.textSecondary }}>
                        {stat.description}
                      </div>

                      <div 
                        className="mt-3 h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-1000 group-hover:w-full"
                          style={{ 
                            backgroundColor: stat.color,
                            width: isVisible ? '75%' : '0%',
                            transitionDelay: `${(index + 1) * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Visual */}
            <div 
              id="demo"
              className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div 
                className="rounded-2xl lg:rounded-3xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 25px 50px -12px ${isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'}`
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                        {language === 'es' ? 'Panel de Control' : 'Control Panel'}
                      </h3>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        {language === 'es' ? 'Vista en tiempo real' : 'Real-time view'}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full"
                    style={{ 
                      backgroundColor: `${COLORS.status.success}15`,
                      border: `1px solid ${COLORS.status.success}30`
                    }}
                  >
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.status.success }} />
                      <div className="absolute inset-0 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: COLORS.status.success }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: COLORS.status.success }}>
                      {language === 'es' ? 'EN VIVO' : 'LIVE'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={index}
                        className="group p-4 lg:p-5 rounded-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                        style={{ 
                          backgroundColor: `${stat.color}10`,
                          border: `1px solid ${stat.color}20`
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-2xl lg:text-3xl font-bold transition-all duration-300 group-hover:scale-110"
                            style={{ color: stat.color }}
                          >
                            {stat.value}
                          </span>
                          <IconComponent 
                            className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:rotate-12"
                            style={{ color: stat.color }}
                          />
                        </div>
                        <span className="text-xs lg:text-sm" style={{ color: colors.textSecondary }}>{stat.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div 
                  className="rounded-xl p-4"
                  style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                      {language === 'es' ? 'Zona A - Planta Baja' : 'Zone A - Ground Floor'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: COLORS.status.success }} />
                      <Camera className="w-4 h-4" style={{ color: colors.textSecondary }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[...Array(10)].map((_, i) => {
                      const isOccupied = [1, 2, 4, 7, 9].includes(i);
                      return (
                        <div
                          key={i}
                          className="group aspect-[3/4] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                          style={{ 
                            backgroundColor: isOccupied ? `${COLORS.status.error}20` : `${COLORS.status.success}20`,
                            border: `2px solid ${isOccupied ? COLORS.status.error : COLORS.status.success}40`
                          }}
                        >
                          {isOccupied ? (
                            <Car className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110" style={{ color: COLORS.status.error }} />
                          ) : (
                            <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110" style={{ color: COLORS.status.success }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.status.success }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {language === 'es' ? 'Disponible' : 'Available'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.status.error }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {language === 'es' ? 'Ocupado' : 'Occupied'}
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  className="mt-4 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-all"
                  style={{ backgroundColor: `${colors.accent}10`, border: `1px solid ${colors.accent}20` }}
                  onClick={() => {
                    // Aquí puedes abrir el chatbot o hacer scroll a la sección del chatbot
                    if (typeof window !== 'undefined') {
                      const chatbot = document.getElementById('chatbot-toggle');
                      if (chatbot) chatbot.click();
                    }
                  }}
                  title={language === 'es' ? 'Habla con el asistente virtual' : 'Talk to the virtual assistant'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                        {language === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}
                      </p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        {language === 'es' ? '¿Necesitas ayuda? Estoy disponible 24/7' : 'Need help? I\'m available 24/7'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: colors.accent }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section 
        id="features" 
        ref={featuresAnim.ref}
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
              featuresAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
            >
              <Layers className="w-4 h-4" />
              <span>{language === 'es' ? 'Solución Integral' : 'Complete Solution'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              {language === 'es' ? (
                <>¿Por qué elegir <span style={{ color: colors.accent }}>Parkintia</span>?</>
              ) : (
                <>Why choose <span style={{ color: colors.accent }}>Parkintia</span>?</>
              )}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              {language === 'es' 
                ? 'La única plataforma que combina visión artificial, asistente virtual y análisis predictivo para transformar completamente la gestión de tu parqueadero.'
                : 'The only platform that combines computer vision, virtual assistant, and predictive analytics to completely transform your parking lot management.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group p-6 lg:p-8 rounded-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer relative overflow-hidden ${
                    featuresAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${feature.highlight ? `${colors.accent}40` : colors.border}`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {feature.highlight && (
                    <div 
                      className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: colors.accent, color: 'white' }}
                    >
                      Popular
                    </div>
                  )}

                  <div 
                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <IconComponent className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: colors.accent }} />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: colors.textPrimary }}>
                    {feature.title}
                  </h3>
                  <p className="mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${colors.border}` }}>
                    <span 
                      className="text-2xl lg:text-3xl font-bold transition-all duration-300 group-hover:scale-110"
                      style={{ color: colors.accent }}
                    >
                      {feature.stat}
                    </span>
                    <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                      {feature.statLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          BENEFITS SECTION
          ============================================ */}
      <section 
        id="benefits"
        ref={benefitsAnim.ref}
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-700 ${benefitsAnim.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div 
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{language === 'es' ? 'Retorno de Inversión' : 'Return on Investment'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                {language === 'es' ? (
                  <>Maximiza el Valor de tu <span style={{ color: colors.accent }}>Parqueadero</span></>
                ) : (
                  <>Maximize Your <span style={{ color: colors.accent }}>Parking Lot</span> Value</>
                )}
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
                {language === 'es' ? (
                  <>Nuestros clientes reportan hasta un <strong style={{ color: colors.accent }}>40% de reducción en costos operativos</strong> y 
                  un aumento significativo en la satisfacción de sus usuarios desde el primer mes.</>
                ) : (
                  <>Our clients report up to a <strong style={{ color: colors.accent }}>40% reduction in operating costs</strong> and 
                  a significant increase in user satisfaction from the first month.</>
                )}
              </p>

              <div 
                ref={savings.ref}
                className="p-6 rounded-2xl mb-8"
                style={{ backgroundColor: `${COLORS.status.success}10`, border: `1px solid ${COLORS.status.success}20` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      {language === 'es' ? 'Ahorro promedio en costos' : 'Average cost savings'}
                    </p>
                    <p className="text-4xl lg:text-5xl font-bold" style={{ color: COLORS.status.success }}>{savings.count}</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.status.success}20` }}>
                    <Percent className="w-8 h-8" style={{ color: COLORS.status.success }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className={`group flex items-start space-x-3 p-4 rounded-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                        benefitsAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                      }`}
                      style={{ 
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.border}`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${colors.accent}15` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: colors.accent }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1" style={{ color: colors.textPrimary }}>{benefit.title}</p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${benefitsAnim.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div 
                className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 25px 50px -12px ${isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`
                }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Award className="w-5 h-5" style={{ color: colors.accent }} />
                  <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                    {language === 'es' ? 'Solución para Todo Tipo de Negocio' : 'Solution for All Business Types'}
                  </h3>
                </div>
                
                <p className="mb-6" style={{ color: colors.textSecondary }}>
                  {language === 'es' 
                    ? 'Parkintia se adapta a las necesidades específicas de cada sector.'
                    : 'Parkintia adapts to the specific needs of each sector.'
                  }
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {sectors.map((sector, index) => {
                    const IconComponent = sector.icon;
                    return (
                      <div 
                        key={index}
                        className="group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${colors.accent}15` }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: colors.accent }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{sector.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div 
                  className="mt-6 p-4 rounded-xl"
                  style={{ backgroundColor: `${colors.accent}10`, borderLeft: `4px solid ${colors.accent}` }}
                >
                  <p className="text-sm italic mb-2" style={{ color: colors.textPrimary }}>
                    {language === 'es'
                      ? '«Parkintia nace como una propuesta académica para optimizar la gestión de parqueaderos mediante visión artificial e inteligencia artificial.»'
                      : '«Parkintia was born as an academic proposal to optimize parking lot management through computer vision and artificial intelligence.»'
                    }
                  </p>
                  <p className="text-xs font-medium" style={{ color: colors.accent }}>
                    {language === 'es' ? '— Equipo de Desarrollo Parkintia' : '— Parkintia Development Team'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PRICING SECTION
          ============================================ */}
      <section 
        id="pricing"
        ref={pricingAnim.ref}
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
              pricingAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
            >
              <DollarSign className="w-4 h-4" />
              <span>{t.pricing.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              {t.pricing.title} <span style={{ color: colors.accent }}>{t.pricing.titleHighlight}</span>
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6" style={{ color: colors.textSecondary }}>
              {t.pricing.subtitle}
            </p>

            {/* Billing Toggle - Diseño Premium */}
            <div className="flex flex-col items-center gap-4">
              <div 
                className="relative inline-flex items-center p-1 rounded-full"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
                }}
              >
                {/* Indicador deslizante animado */}
                <div 
                  className="absolute top-1 bottom-1 rounded-full transition-all duration-400 ease-out"
                  style={{ 
                    backgroundColor: colors.accent,
                    width: 'calc(50% - 4px)',
                    left: selectedPlan === 'monthly' ? '4px' : 'calc(50% + 0px)',
                    boxShadow: `0 4px 12px ${colors.accent}50`
                  }}
                />
                
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className="relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{ 
                    color: selectedPlan === 'monthly' ? 'white' : colors.textSecondary,
                    cursor: 'pointer'
                  }}
                >
                  {t.pricing.monthly}
                </button>
                <button
                  onClick={() => setSelectedPlan('yearly')}
                  className="relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                  style={{ 
                    color: selectedPlan === 'yearly' ? 'white' : colors.textSecondary,
                    cursor: 'pointer'
                  }}
                >
                  {t.pricing.yearly}
                  <span 
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                    style={{ 
                      backgroundColor: selectedPlan === 'yearly' ? 'rgba(255,255,255,0.25)' : COLORS.status.success,
                      color: selectedPlan === 'yearly' ? 'white' : 'white'
                    }}
                  >
                    {t.pricing.discount}
                  </span>
                </button>
              </div>
              
              {/* Badge de ahorro */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                  color: COLORS.status.success,
                  border: `1px solid ${isDarkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'}`
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.pricing.saveBadge}</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards - Diseño Premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              const price = selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const isYearly = selectedPlan === 'yearly';
              const isSelected = selectedPricingCard === index;
              const isPopular = plan.popular;
              
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedPricingCard(index)}
                  className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-pointer group ${
                    pricingAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${isSelected ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'} ${isPopular && !isSelected ? 'md:-translate-y-4' : ''}`}
                  style={{ 
                    backgroundColor: isDarkMode 
                      ? isSelected 
                        ? 'rgba(20, 184, 166, 0.08)' 
                        : 'rgba(255,255,255,0.03)'
                      : isSelected 
                        ? 'rgba(20, 184, 166, 0.05)' 
                        : colors.surface,
                    border: `2px solid ${
                      isSelected 
                        ? colors.accent 
                        : isPopular 
                          ? `${colors.accent}60`
                          : isDarkMode ? 'rgba(255,255,255,0.08)' : colors.border
                    }`,
                    boxShadow: isSelected 
                      ? `0 25px 50px -12px ${colors.accent}30, 0 0 0 1px ${colors.accent}20`
                      : isPopular 
                        ? `0 20px 40px -15px ${colors.accent}20`
                        : isDarkMode 
                          ? '0 4px 20px rgba(0,0,0,0.3)'
                          : '0 4px 20px rgba(0,0,0,0.08)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Badge Popular */}
                  {isPopular && (
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                      style={{ 
                        backgroundColor: colors.accent, 
                        color: 'white',
                        boxShadow: `0 4px 14px ${colors.accent}50`
                      }}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>MÁS POPULAR</span>
                    </div>
                  )}

                  {/* Indicador de selección */}
                  {isSelected && (
                    <div 
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ 
                        backgroundColor: colors.accent,
                        boxShadow: `0 4px 12px ${colors.accent}50`
                      }}
                    >
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  )}

                  {/* Header del plan */}
                  <div className="text-center mb-6">
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                      style={{ 
                        backgroundColor: isSelected 
                          ? `${colors.accent}20` 
                          : isDarkMode ? 'rgba(255,255,255,0.05)' : `${colors.accent}10`
                      }}
                    >
                      <IconComponent 
                        className="w-7 h-7 sm:w-8 sm:h-8" 
                        style={{ color: isSelected ? colors.accent : isDarkMode ? colors.textSecondary : colors.accent }} 
                      />
                    </div>
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-2" 
                      style={{ color: isSelected ? colors.accent : colors.textPrimary }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{plan.description}</p>
                  </div>

                  {/* Precio */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg" style={{ color: colors.textSecondary }}>$</span>
                      <span 
                        className="text-5xl sm:text-6xl font-bold tracking-tight" 
                        style={{ color: isSelected ? colors.accent : colors.textPrimary }}
                      >
                        {price}
                      </span>
                      <span className="text-lg ml-1" style={{ color: colors.textSecondary }}>/mes</span>
                    </div>
                    {isYearly && (
                      <div 
                        className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${COLORS.status.success}15`,
                          color: COLORS.status.success
                        }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>2 meses gratis incluidos</span>
                      </div>
                    )}
                  </div>

                  {/* Info de espacios */}
                  <div 
                    className="p-4 rounded-xl mb-6 text-center"
                    style={{ 
                      backgroundColor: isDarkMode 
                        ? 'rgba(255,255,255,0.03)' 
                        : isSelected ? `${colors.accent}08` : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>{plan.spaces}</p>
                    <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>{plan.cameras}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ 
                            backgroundColor: isSelected ? `${colors.accent}20` : `${COLORS.status.success}15`
                          }}
                        >
                          <Check 
                            className="w-3 h-3" 
                            style={{ color: isSelected ? colors.accent : COLORS.status.success }} 
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm" style={{ color: colors.textPrimary }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón CTA */}
                  <Link
                    href="/login"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{ 
                      backgroundColor: isSelected || isPopular ? colors.accent : 'transparent',
                      border: isSelected || isPopular ? 'none' : `2px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : colors.border}`,
                      color: isSelected || isPopular ? 'white' : colors.textPrimary,
                      boxShadow: isSelected || isPopular ? `0 8px 20px ${colors.accent}30` : 'none'
                    }}
                  >
                    <span>{isSelected ? 'Plan Seleccionado' : 'Comenzar Ahora'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section 
        ref={ctaAnim.ref}
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-5xl mx-auto">
          <div 
            className={`rounded-2xl lg:rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden transition-all duration-700 ${
              ctaAnim.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ backgroundColor: colors.primary }}
          >
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
              style={{ backgroundColor: 'white', transform: 'translate(-30%, 30%)' }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <BadgeCheck className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">{t.cta.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t.cta.title1} {t.cta.title2} {t.cta.title3}
              </h2>
              <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {t.cta.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  { icon: CheckCircle, text: t.cta.feature1 },
                  { icon: Clock, text: t.cta.feature2 },
                  { icon: Headphones, text: t.cta.feature3 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5" style={{ color: colors.accent }} />
                    <span className="text-sm font-medium text-white">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/login"
                  className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{ backgroundColor: 'white', color: colors.primary }}
                >
                  <Rocket className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  <span>{t.cta.cta1}</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button 
                  className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  style={{ backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.5)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.cta.cta2}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TECH STACK SECTION
          ============================================ */}
      <section 
        ref={techAnim.ref}
        className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundColor: colors.surface,
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-10 transition-all duration-700 ${
              techAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5" style={{ color: colors.accent }} />
              <h3 className="text-lg font-semibold" style={{ color: colors.textSecondary }}>
                {language === 'es' ? 'Tecnología que Impulsa Parkintia' : 'Technology Powering Parkintia'}
              </h3>
            </div>
          </div>
          <div 
            className={`flex flex-wrap justify-center items-center gap-6 lg:gap-12 transition-all duration-700 delay-200 ${
              techAnim.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              { name: language === 'es' ? 'Visión por Computador' : 'Computer Vision', icon: Camera },
              { name: language === 'es' ? 'Inteligencia Artificial' : 'Artificial Intelligence', icon: Bot },
              { name: language === 'es' ? 'Chatbot Integrado' : 'Integrated Chatbot', icon: MessageCircle },
              { name: language === 'es' ? 'Análisis Predictivo' : 'Predictive Analytics', icon: TrendingUp },
              { name: language === 'es' ? 'Tiempo Real' : 'Real-Time', icon: Zap }
            ].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: `${colors.accent}10`, border: `1px solid ${colors.accent}20` }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: colors.accent }} />
                  <span className="font-medium text-sm" style={{ color: colors.textPrimary }}>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer 
        className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: isDarkMode ? colors.surface : colors.primary, color: 'white' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                  <ParkingCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Parkintia</span>
              </div>
              <p className="max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t.footer.description}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.footer.security}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Headphones className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.footer.support}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.product}</h4>
              <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">{t.nav.benefits}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">{t.nav.demo}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'es' ? 'Sobre Nosotros' : 'About Us'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'es' ? 'Términos' : 'Terms'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'es' ? 'Privacidad' : 'Privacy'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'es' ? 'Contacto' : 'Contact'}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026 Parkintia. {t.footer.rights}</p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" style={{ color: colors.accent }} />
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{language === 'es' ? 'Tecnología de visión artificial aplicada a la gestión de parqueaderos' : 'Computer vision technology applied to parking management'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbase Widget - Se carga automáticamente */}
      <ChatbaseWidget />
    </div>
  );
}
