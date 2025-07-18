'use client';

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';

interface ClientOnlyAuthProviderProps {
  children: React.ReactNode;
}

export default function ClientOnlyAuthProvider({ children }: ClientOnlyAuthProviderProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Renderizar un placeholder durante la hidratación
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
