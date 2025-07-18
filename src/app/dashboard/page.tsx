'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useAuthRedirect';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PUBLIC_ROUTES } from '@/config/routes';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  // Proteger la ruta - usuarios no autenticados van al login
  const { isLoading } = useProtectedRoute(PUBLIC_ROUTES.LOGIN);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido a Parkintia</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Bienvenido, {user?.name}! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Has iniciado sesión correctamente en Parkintia. 
                Este es tu dashboard personal donde podrás gestionar tus espacios de parking.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-blue-800 text-sm">
                  <strong>Estado:</strong> Sistema de autenticación funcionando correctamente ✅
                </p>
              </div>
            </div>
          </Card>

          {/* User Info Card */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información de Usuario
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Nombre</label>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Rol</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user?.role}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              <Button variant="primary" fullWidth>
                Buscar Parking
              </Button>
              <Button variant="outline" fullWidth>
                Mis Reservas
              </Button>
              <Button variant="ghost" fullWidth>
                Configuración
              </Button>
            </div>
          </Card>

          {/* Stats Card */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estadísticas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reservas totales</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tiempo ahorrado</span>
                <span className="font-semibold text-gray-900">0h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Puntos acumulados</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Getting Started Section */}
        <div className="mt-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Siguientes Pasos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  🔧 Conectar Backend
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Reemplaza las funciones simuladas en <code>auth.service.ts</code> con llamadas reales a tu API.
                </p>
                <Button variant="outline" size="sm">
                  Ver documentación
                </Button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  🎨 Personalizar UI
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Modifica los componentes en <code>/components</code> para ajustar el diseño a tu marca.
                </p>
                <Button variant="outline" size="sm">
                  Explorar componentes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
