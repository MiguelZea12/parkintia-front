'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { LoginCredentials } from '@/types/auth';
import { COLORS } from '@/config/colors';

// Icons mejorados
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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

interface LoginFormProps {
  onSuccess?: () => void;
  showRegisterLink?: boolean;
  onToggleMode?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  showRegisterLink = true,
  onToggleMode
}) => {
  const { handleLogin, formErrors, authError, isLoading } = useAuthForm();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin(credentials);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto" shadow="lg">
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <LanguageToggle />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.text.dark }}>
          {t('welcomeBack')}
        </h2>
        <p className="text-base" style={{ color: COLORS.text.light }}>
          {t('signInDescription')}
        </p>
      </div>

      {/* Error Alert */}
      {authError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-medium">{authError.message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder={t('email')}
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
            placeholder={t('password')}
            value={credentials.password}
            onChange={handleInputChange('password')}
            error={formErrors.password}
            icon={<LockIcon />}
            fullWidth
            required
          />
          <button
            type="button"
            className="absolute right-4 top-3 transition-colors duration-200"
            style={{ color: COLORS.text.light }}
            onClick={() => setShowPassword(!showPassword)}
            onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary.medium}
            onMouseLeave={(e) => e.currentTarget.style.color = COLORS.text.light}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Remember me and Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              style={{ accentColor: COLORS.primary.medium }}
            />
            <span className="ml-2 text-sm" style={{ color: COLORS.text.light }}>
              {t('rememberMe')}
            </span>
          </label>
          <button
            type="button"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: COLORS.primary.medium }}
            onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary.dark}
            onMouseLeave={(e) => e.currentTarget.style.color = COLORS.primary.medium}
          >
            {t('forgotPassword')}
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          style={{ 
            marginTop: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? t('signingIn') : t('signIn')}
        </Button>
      </form>

      {/* Register Link */}
      {showRegisterLink && (
        <div className="mt-8 text-center">
          <p style={{ color: COLORS.text.light }}>
            {t('noAccount')}{' '}
            <button
              onClick={onToggleMode}
              className="font-semibold transition-colors duration-200"
              style={{ color: COLORS.primary.medium }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary.dark}
              onMouseLeave={(e) => e.currentTarget.style.color = COLORS.primary.medium}
            >
              {t('signUp')}
            </button>
          </p>
        </div>
      )}

      {/* Demo Credentials */}
      <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${COLORS.secondary.green}40` }}>
        <p className="text-xs text-center font-medium" style={{ color: COLORS.text.light }}>
          Demo: <span className="font-mono bg-white px-2 py-1 rounded">demo@parkintia.com</span> / <span className="font-mono bg-white px-2 py-1 rounded">demo123</span>
        </p>
      </div>
    </Card>
  );
};
