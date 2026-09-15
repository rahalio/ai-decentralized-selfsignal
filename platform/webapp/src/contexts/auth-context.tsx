'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type OperatorRole = 'consumer' | 'publisher' | 'brand' | 'dpo' | 'auditor';

type AuthState = {
  role: OperatorRole;
  email: string;
  apiKey: string;
  setRole: (role: OperatorRole) => void;
  setEmail: (email: string) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<OperatorRole>('publisher');
  const [email, setEmail] = useState('admin@demo.local');
  const value = useMemo(
    () => ({
      role,
      email,
      apiKey: 'selfsignal_demo_local_dev_key',
      setRole,
      setEmail,
    }),
    [role, email]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}
