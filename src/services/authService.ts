import { RegisteredUser, User } from '../types';
import { getStorageItem, setStorageItem } from './storageService';
import { hashPasswordSimulated, verifyPassword, sanitizeInput } from './securityService';
import { STORAGE_KEYS } from '../constants';

const USERS_STORAGE_KEY = STORAGE_KEYS.REGISTERED_USERS;

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cep?: string;
  avatarId?: string;
  avatarUrl?: string;
  phone?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
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

export const authService = {

  getRegisteredUsers: (): RegisteredUser[] => {
    return getStorageItem<RegisteredUser[]>(USERS_STORAGE_KEY, []);
  },

  findUserByEmail: (email: string): RegisteredUser | undefined => {
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const users = authService.getRegisteredUsers();
    return users.find((u) => u.email && u.email.toLowerCase() === cleanEmail);
  },

  findUserByCpf: (cpf: string): RegisteredUser | undefined => {
    const cleanCpf = cpf.replace(/\D/g, '');
    const users = authService.getRegisteredUsers();
    return users.find((u) => u.cpf && u.cpf.replace(/\D/g, '') === cleanCpf);
  },

  registerUser: (dto: RegisterDTO): AuthResult => {
    const sanitizedName = sanitizeInput(dto.name);
    const sanitizedEmail = sanitizeInput(dto.email).toLowerCase();
    const sanitizedCpf = sanitizeInput(dto.cpf);
    const cleanCpfDigits = sanitizedCpf.replace(/\D/g, '');

    if (!sanitizedName || !sanitizedEmail || !dto.password || !sanitizedCpf) {
      return { success: false, error: 'Todos os campos obrigatórios devem ser preenchidos.' };
    }

    const users = authService.getRegisteredUsers();

    if (users.some((u) => u.email && u.email.toLowerCase() === sanitizedEmail)) {
      return { success: false, error: 'Este endereço de e-mail já está cadastrado no sistema!' };
    }

    if (users.some((u) => u.cpf && u.cpf.replace(/\D/g, '') === cleanCpfDigits)) {
      return { success: false, error: 'Este CPF já está associado a outra conta cadastrada!' };
    }

    const passwordHash = hashPasswordSimulated(dto.password);

    const newUserRecord: RegisteredUser = {
      id: generateRegisteredUserId(),
      name: sanitizedName,
      email: sanitizedEmail,
      passwordHash, 
      cpf: sanitizedCpf,
      cep: dto.cep ? sanitizeInput(dto.cep) : '',
      avatarId: dto.avatarId ? sanitizeInput(dto.avatarId) : 'avatar_1',
      avatarUrl: dto.avatarUrl ? dto.avatarUrl : undefined,
      phone: dto.phone ? sanitizeInput(dto.phone) : '',
      createdAt: new Date().toISOString(),
    };

    users.push(newUserRecord);
    setStorageItem(USERS_STORAGE_KEY, users);

    const sessionUser: User = {
      id: newUserRecord.id || `usr_${Date.now()}`,
      name: newUserRecord.name,
      email: newUserRecord.email,
      cpf: newUserRecord.cpf,
      cep: newUserRecord.cep,
      avatarId: newUserRecord.avatarId,
      avatarUrl: newUserRecord.avatarUrl,
      phone: newUserRecord.phone,
      isLoggedIn: true,
    };

    return { success: true, user: sessionUser };
  },

  authenticateUser: (email: string, password: string): AuthResult => {
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const user = authService.findUserByEmail(cleanEmail);

    if (!user) {
      return {
        success: false,
        error: 'E-mail ou senha inválidos.',
      };
    }

    const storedHash = user.passwordHash || user.password || '';
    const isValid = verifyPassword(password, storedHash);

    if (!isValid) {
      return {
        success: false,
        error: 'E-mail ou senha inválidos.',
      };
    }

    const sessionUser: User = {
      id: user.id || `usr_${Date.now()}`,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      cep: user.cep,
      avatarId: user.avatarId,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      isLoggedIn: true,
    };

    return { success: true, user: sessionUser };
  },

  authenticateUserAsync: async (email: string, password: string): Promise<AuthResult> => {
    return Promise.resolve(authService.authenticateUser(email, password));
  },

  registerUserAsync: async (dto: RegisterDTO): Promise<AuthResult> => {
    return Promise.resolve(authService.registerUser(dto));
  },

  updateUser: (userId: string, updates: Partial<RegisteredUser>): boolean => {
    const users = authService.getRegisteredUsers();
    const index = users.findIndex(
      (u) => u.id === userId || (u.email && updates.email && u.email.toLowerCase() === updates.email.toLowerCase())
    );
    if (index === -1) {
      return false;
    }
    users[index] = {
      ...users[index],
      ...updates,
    };
    setStorageItem(USERS_STORAGE_KEY, users);
    return true;
  },
};
