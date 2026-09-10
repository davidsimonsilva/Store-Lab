import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getStorageItem, setStorageItem, removeStorageItem } from '../services/storageService';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../constants';

interface AuthContextType {
  user: User | null;
  anonymousUserId: string;
  isLoggedIn: boolean;
  loginUser: (nameOrUser: string | Partial<User>, email?: string, cpf?: string, cep?: string, id?: string) => void;
  logoutUser: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_SESSION_KEY = STORAGE_KEYS.USER_SESSION;
const ANON_ID_KEY = STORAGE_KEYS.ANON_ID;

function generateSecureAnonId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomPart = '';
  const lengthNeeded = 21; 
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(lengthNeeded);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < lengthNeeded; i++) {
      randomPart += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < lengthNeeded; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return `usr_${randomPart}`;
}

function generateRegisteredUserId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(25);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 25; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 25; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return result;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return getStorageItem<User | null>(USER_SESSION_KEY, null);
  });

  const [anonymousUserId, setAnonymousUserId] = useState<string>(() => {
    const saved = getStorageItem<string | null>(ANON_ID_KEY, null);
    if (saved) return saved;
    const newId = generateSecureAnonId();
    setStorageItem(ANON_ID_KEY, newId);
    return newId;
  });

  useEffect(() => {
    if (user) {
      setStorageItem(USER_SESSION_KEY, user);
    } else {
      removeStorageItem(USER_SESSION_KEY);
    }
  }, [user]);

  const loginUser = (
    nameOrUser: string | Partial<User>,
    email?: string,
    cpf?: string,
    cep?: string,
    id?: string
  ) => {
    let nameVal = '';
    let emailVal = '';
    let cpfVal = cpf;
    let cepVal = cep;
    let idVal = id;

    if (typeof nameOrUser === 'object' && nameOrUser !== null) {
      nameVal = nameOrUser.name || '';
      emailVal = nameOrUser.email || '';
      cpfVal = nameOrUser.cpf || cpf;
      cepVal = nameOrUser.cep || cep;
      idVal = nameOrUser.id || id;
    } else {
      nameVal = nameOrUser || '';
      emailVal = email || '';
    }

    let avatarIdVal = typeof nameOrUser === 'object' && nameOrUser !== null ? nameOrUser.avatarId : undefined;
    let avatarUrlVal = typeof nameOrUser === 'object' && nameOrUser !== null ? nameOrUser.avatarUrl : undefined;

    if (emailVal) {
      const found = authService.findUserByEmail(emailVal);
      if (found?.id && !idVal) {
        idVal = found.id;
      }
      if (found?.avatarId && !avatarIdVal) {
        avatarIdVal = found.avatarId;
      }
      if (found?.avatarUrl && !avatarUrlVal) {
        avatarUrlVal = found.avatarUrl;
      }
    }
    if (cpfVal) {
      const found = authService.findUserByCpf(cpfVal);
      if (found?.id && !idVal) {
        idVal = found.id;
      }
      if (found?.avatarId && !avatarIdVal) {
        avatarIdVal = found.avatarId;
      }
      if (found?.avatarUrl && !avatarUrlVal) {
        avatarUrlVal = found.avatarUrl;
      }
    }

    const userId = idVal || generateRegisteredUserId();

    const newUser: User = {
      id: userId,
      name: nameVal,
      email: emailVal,
      isLoggedIn: true,
      cpf: cpfVal,
      cep: cepVal,
      avatarId: avatarIdVal,
      avatarUrl: avatarUrlVal,
    };

    removeStorageItem(ANON_ID_KEY);
    const freshAnonId = generateSecureAnonId();
    setStorageItem(ANON_ID_KEY, freshAnonId);
    setAnonymousUserId(freshAnonId);

    setUser(newUser);
  };

  const logoutUser = () => {
    setUser(null);
    removeStorageItem(USER_SESSION_KEY);

    let currentAnon = getStorageItem<string | null>(ANON_ID_KEY, null);
    if (!currentAnon) {
      currentAnon = generateSecureAnonId();
      setStorageItem(ANON_ID_KEY, currentAnon);
    }
    setAnonymousUserId(currentAnon);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      if (updated.id || updated.email) {
        authService.updateUser(updated.id, {
          name: updated.name,
          email: updated.email,
          cpf: updated.cpf,
          cep: updated.cep,
          phone: updated.phone,
          avatarId: updated.avatarId,
          avatarUrl: updated.avatarUrl,
        });
      }
      return updated;
    });
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

const defaultAuthContext: AuthContextType = {
  user: null,
  anonymousUserId: 'guest',
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
  updateProfile: () => {},
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth was called outside of an AuthProvider. Returning default fallback context.');
    return defaultAuthContext;
  }
  return context;
};
