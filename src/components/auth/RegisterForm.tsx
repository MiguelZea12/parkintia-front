'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuthForm } from '@/hooks/useAuthForm';
import { RegisterCredentials } from '@/types/auth';

// Icons (reutilizando los mismos del LoginForm)
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

interface RegisterFormProps {
  onSuccess?: () => void;
  showLoginLink?: boolean;
  onToggleMode?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  showLoginLink = true,
  onToggleMode
}) => {
  const { handleRegister, formErrors, authError, isLoading } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleRegister(credentials);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (field: keyof RegisterCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
        <p className="text-gray-600 mt-2">Únete a Parkintia hoy mismo</p>
      </div>

      {authError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{authError.message}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="text"
          label="Nombre completo"
          placeholder="Tu nombre"
          value={credentials.name}
          onChange={handleInputChange('name')}
          error={formErrors.name}
          icon={<UserIcon />}
          fullWidth
          required
        />

        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          value={credentials.email}
          onChange={handleInputChange('email')}
          error={formErrors.email}
          icon={<EmailIcon />}
          fullWidth
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={credentials.password}
            onChange={handleInputChange('password')}
            error={formErrors.password}
            icon={<LockIcon />}
            fullWidth
            required
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            value={credentials.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={formErrors.confirmPassword}
            icon={<LockIcon />}
            fullWidth
            required
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="text-sm">
          <label className="flex items-start">
            <input type="checkbox" className="mr-2 mt-1" required />
            <span className="text-gray-600">
              Acepto los{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                términos y condiciones
              </a>
              {' '}y la{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                política de privacidad
              </a>
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
        >
          Crear Cuenta
        </Button>
      </form>

      {showLoginLink && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      )}
    </Card>
  );
};
