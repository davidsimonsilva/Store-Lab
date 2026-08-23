import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  anonymousUserId: string;
  isLoggedIn: boolean;
  loginUser: (name: string, email: string, cpf?: string, cep?: string) => void;
  logoutUser: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function generateSecureAnonId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'anon-';
  const lengthNeeded = 30 - result.length;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(lengthNeeded);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < lengthNeeded; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < lengthNeeded; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return result;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lab_user_session') || localStorage.getItem('store_lab_user');
        return saved ? JSON.parse(saved) : null;
      } catch (err) {
        console.error("Error reading localStorage user session", err);
      }
    }
    return null;
  });

  const [anonymousUserId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('store_lab_anon_id');
        if (saved) return saved;
        const newId = generateSecureAnonId();
        localStorage.setItem('store_lab_anon_id', newId);
        return newId;
      } catch (err) {
        console.error("Error with localStorage anon id", err);
      }
    }
    return generateSecureAnonId();
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (user) {
          localStorage.setItem('lab_user_session', JSON.stringify(user));
        } else {
          localStorage.removeItem('lab_user_session');
        }
      } catch (err) {
        console.error("Error writing localStorage user session", err);
      }
    }
  }, [user]);

  const loginUser = (name: string, email: string, cpf?: string, cep?: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      isLoggedIn: true,
      cpf,
      cep
    };
    setUser(newUser);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        anonymousUserId,
        isLoggedIn: !!(user && user.isLoggedIn),
        loginUser,
        logoutUser,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
