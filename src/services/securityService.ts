

import { SECURITY_CONSTANTS } from '../constants';

const SALT_PREFIX = SECURITY_CONSTANTS.SALT_PREFIX;

export function hashPasswordSimulated(password: string): string {
  if (!password) return '';

  const salted = `${SALT_PREFIX}${password}`;
  let hash1 = 0x811c9dc5;
  let hash2 = 0x9e3779b9;

  for (let i = 0; i < salted.length; i++) {
    const charCode = salted.charCodeAt(i);
    hash1 ^= charCode;
    hash1 = Math.imul(hash1, 0x01000193);
    hash2 = Math.imul(hash2 ^ charCode, 0x5bd1e995);
    hash2 ^= hash2 >>> 15;
  }

  const hex1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (hash2 >>> 0).toString(16).padStart(8, '0');

  return `${SECURITY_CONSTANTS.HASH_PREFIX}${hex1}${hex2}`;
}

export function verifyPassword(password: string, storedHashOrPassword: string): boolean {
  if (!password || !storedHashOrPassword) return false;

  if (storedHashOrPassword.startsWith(SECURITY_CONSTANTS.HASH_PREFIX) || storedHashOrPassword.startsWith('sl_hash_')) {
    return hashPasswordSimulated(password) === storedHashOrPassword;
  }

  return password === storedHashOrPassword;
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

export function sanitizeObject<T>(data: T): T {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return sanitizeInput(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeObject(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedObj[key] = sanitizeObject(value);
    }
    return sanitizedObj as T;
  }

  return data;
}

export const securityService = {
  hashPassword: hashPasswordSimulated,
  verifyPassword,
  sanitizeInput,
  sanitizeObject,
};
