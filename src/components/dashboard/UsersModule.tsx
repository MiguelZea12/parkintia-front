'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { COLORS } from '@/config/colors';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Miguel Zea',
    email: 'miguel@parkintia.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-01-18 10:30',
    createdAt: '2024-06-15',
    phone: '+1 234 567 8900'
  },
  {
    id: 'user-002',
    name: 'Ana García',
    email: 'ana.garcia@parkintia.com',
    role: 'operator',
    status: 'active',
    lastLogin: '2025-01-18 09:45',
    createdAt: '2024-08-22',
    phone: '+1 234 567 8901'
  },
  {
    id: 'user-003',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@parkintia.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2025-01-16 14:20',
    createdAt: '2024-11-10',
    phone: '+1 234 567 8902'
  },
  {
    id: 'user-004',
    name: 'Sofia Martinez',
    email: 'sofia@parkintia.com',
    role: 'operator',
    status: 'pending',
    lastLogin: 'Never',
    createdAt: '2025-01-17',
    phone: '+1 234 567 8903'
  }
];

const UserCard: React.FC<{ 
  user: User; 
  onEdit: (user: User) => void; 
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}> = ({ user, onEdit, onDelete, onToggleStatus }) => {
  const { t } = useLanguage();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#DC2626';
      case 'operator': return '#2563EB';
      case 'viewer': return '#059669';
      default: return COLORS.text.light;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'pending': return '#F59E0B';
      default: return COLORS.text.light;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return t('administrator');
      case 'operator': return t('operator');
      case 'viewer': return t('viewer');
      default: return role;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('active');
      case 'inactive': return t('inactive');
      case 'pending': return t('pending');
      default: return status;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: COLORS.primary.medium }}
          >
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg" style={{ color: COLORS.text.dark }}>
              {user.name}
            </h3>
            <p className="text-sm" style={{ color: COLORS.text.light }}>
              {user.email}
            </p>
            {user.phone && (
              <p className="text-sm" style={{ color: COLORS.text.light }}>
                {user.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            style={{ color: COLORS.text.light }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onToggleStatus(user.id)}
            className="p-2 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
            style={{ color: COLORS.text.light }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            style={{ color: COLORS.text.light }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: COLORS.text.light }}>
            {t('role')}:
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: getRoleColor(user.role) }}
          >
            {getRoleText(user.role)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: COLORS.text.light }}>
            {t('status')}:
          </span>
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(user.status) }}
            />
            <span 
              className="text-xs font-medium"
              style={{ color: getStatusColor(user.status) }}
            >
              {getStatusText(user.status)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: COLORS.text.light }}>
            {t('lastLogin')}:
          </span>
          <span className="text-sm font-medium" style={{ color: COLORS.text.dark }}>
            {user.lastLogin}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: COLORS.text.light }}>
            {t('member')} desde:
          </span>
          <span className="text-sm font-medium" style={{ color: COLORS.text.dark }}>
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export const UsersModule: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as const }
        : user
    ));
  };

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        status: 'pending' as const
      };
      setUsers([newUser, ...users]);
    }
    setShowUserForm(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.text.dark }}>
            {t('userManagement')}
          </h1>
          <p className="text-lg mt-1" style={{ color: COLORS.text.light }}>
            {activeUsers} usuarios activos • {pendingUsers} pendientes
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingUser(null);
            setShowUserForm(true);
          }}
          style={{ 
            background: COLORS.gradients.primary 
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('addUser')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div 
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                {t('totalUsers')}
              </p>
              <p className="text-2xl font-bold" style={{ color: COLORS.text.dark }}>
                {users.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div 
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                {t('activeUsers')}
              </p>
              <p className="text-2xl font-bold" style={{ color: COLORS.text.dark }}>
                {activeUsers}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div 
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                {t('pendingUsers')}
              </p>
              <p className="text-2xl font-bold" style={{ color: COLORS.text.dark }}>
                {pendingUsers}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div 
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: '#DC262620', color: '#DC2626' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Administradores
              </p>
              <p className="text-2xl font-bold" style={{ color: COLORS.text.dark }}>
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={t('searchUsers')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </div>
          <select 
            className="px-4 py-3 border rounded-xl"
            style={{ borderColor: COLORS.primary.light }}
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">{t('administrator')}</option>
            <option value="operator">{t('operator')}</option>
            <option value="viewer">{t('viewer')}</option>
          </select>
          <select 
            className="px-4 py-3 border rounded-xl"
            style={{ borderColor: COLORS.primary.light }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">{t('active')}</option>
            <option value="inactive">{t('inactive')}</option>
            <option value="pending">{t('pending')}</option>
          </select>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="p-12 text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.primary.light}20`, color: COLORS.primary.light }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2" style={{ color: COLORS.text.dark }}>
            No se encontraron usuarios
          </p>
          <p style={{ color: COLORS.text.light }}>
            Intenta ajustar los filtros de búsqueda
          </p>
        </Card>
      )}

      {/* User Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.text.dark }}>
                {editingUser ? t('editUser') : t('addUser')}
              </h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveUser({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    role: formData.get('role'),
                    status: formData.get('status') || 'pending'
                  });
                }}
                className="space-y-4"
              >
                <Input
                  name="name"
                  label={t('fullName')}
                  defaultValue={editingUser?.name || ''}
                  required
                  fullWidth
                />
                <Input
                  name="email"
                  type="email"
                  label={t('email')}
                  defaultValue={editingUser?.email || ''}
                  required
                  fullWidth
                />
                <Input
                  name="phone"
                  label={t('phone')}
                  defaultValue={editingUser?.phone || ''}
                  fullWidth
                />
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
                    {t('role')}
                  </label>
                  <select 
                    name="role"
                    className="w-full px-4 py-3 border rounded-xl"
                    style={{ borderColor: COLORS.primary.light }}
                    defaultValue={editingUser?.role || 'viewer'}
                    required
                  >
                    <option value="viewer">{t('viewer')}</option>
                    <option value="operator">{t('operator')}</option>
                    <option value="admin">{t('administrator')}</option>
                  </select>
                </div>
                {editingUser && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
                      {t('status')}
                    </label>
                    <select 
                      name="status"
                      className="w-full px-4 py-3 border rounded-xl"
                      style={{ borderColor: COLORS.primary.light }}
                      defaultValue={editingUser?.status || 'pending'}
                    >
                      <option value="pending">{t('pending')}</option>
                      <option value="active">{t('active')}</option>
                      <option value="inactive">{t('inactive')}</option>
                    </select>
                  </div>
                )}
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowUserForm(false);
                      setEditingUser(null);
                    }}
                    fullWidth
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ background: COLORS.gradients.primary }}
                    fullWidth
                  >
                    {editingUser ? t('saveChanges') : t('addUser')}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
