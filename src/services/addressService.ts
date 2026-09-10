import { Address } from '../types';
import { getStorageItem, setStorageItem } from './storageService';
import { STORAGE_KEYS } from '../constants';

const getAddressStorageKey = (userId: string): string => {
  const safeId = userId || 'guest';
  return `${STORAGE_KEYS.USER_ADDRESSES_PREFIX}${safeId}`;
};

export const getUserAddresses = (userId: string): Address[] => {
  const key = getAddressStorageKey(userId);
  const addresses = getStorageItem<Address[]>(key, []);
  return Array.isArray(addresses) ? addresses : [];
};

export const saveUserAddress = (
  userId: string,
  addressData: Omit<Address, 'id' | 'userId'> & { id?: string }
): Address => {
  const key = getAddressStorageKey(userId);
  const currentAddresses = getUserAddresses(userId);

  const isFirstAddress = currentAddresses.length === 0;
  const isDefault = addressData.isDefault || isFirstAddress;

  let savedAddress: Address;

  if (addressData.id) {
    savedAddress = {
      ...addressData,
      id: addressData.id,
      userId,
      isDefault,
    };

    const updatedList = currentAddresses.map((addr) => {
      if (addr.id === addressData.id) {
        return savedAddress;
      }
      return isDefault ? { ...addr, isDefault: false } : addr;
    });

    setStorageItem(key, updatedList);
  } else {
    savedAddress = {
      ...addressData,
      id: `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId,
      isDefault,
    };

    const updatedList = isDefault
      ? currentAddresses.map((addr) => ({ ...addr, isDefault: false }))
      : [...currentAddresses];

    updatedList.unshift(savedAddress);
    setStorageItem(key, updatedList);
  }

  return savedAddress;
};

export const deleteUserAddress = (userId: string, addressId: string): boolean => {
  const key = getAddressStorageKey(userId);
  const currentAddresses = getUserAddresses(userId);
  const filtered = currentAddresses.filter((addr) => addr.id !== addressId);

  if (filtered.length > 0 && !filtered.some((addr) => addr.isDefault)) {
    filtered[0].isDefault = true;
  }

  return setStorageItem(key, filtered);
};

export const setDefaultUserAddress = (userId: string, addressId: string): boolean => {
  const key = getAddressStorageKey(userId);
  const currentAddresses = getUserAddresses(userId);
  const updatedList = currentAddresses.map((addr) => ({
    ...addr,
    isDefault: addr.id === addressId,
  }));

  return setStorageItem(key, updatedList);
};

export const getDefaultUserAddress = (userId: string): Address | null => {
  const addresses = getUserAddresses(userId);
  return addresses.find((addr) => addr.isDefault) || addresses[0] || null;
};

export const getUserAddressesAsync = async (userId: string): Promise<Address[]> => {
  return Promise.resolve(getUserAddresses(userId));
};

export const saveUserAddressAsync = async (
  userId: string,
  addressData: Omit<Address, 'id' | 'userId'> & { id?: string }
): Promise<Address> => {
  return Promise.resolve(saveUserAddress(userId, addressData));
};

export const deleteUserAddressAsync = async (userId: string, addressId: string): Promise<boolean> => {
  return Promise.resolve(deleteUserAddress(userId, addressId));
};

export const setDefaultUserAddressAsync = async (userId: string, addressId: string): Promise<boolean> => {
  return Promise.resolve(setDefaultUserAddress(userId, addressId));
};

export const getDefaultUserAddressAsync = async (userId: string): Promise<Address | null> => {
  return Promise.resolve(getDefaultUserAddress(userId));
};

export const addressService = {
  getAddressesByUserId: getUserAddresses,
  getUserAddresses,
  getUserAddressesAsync,
  saveAddress: (data: Omit<Address, 'id'> & { id?: string }) => saveUserAddress(data.userId, data),
  saveUserAddress,
  saveUserAddressAsync,
  deleteAddress: deleteUserAddress,
  deleteUserAddress,
  deleteUserAddressAsync,
  setDefaultAddress: setDefaultUserAddress,
  setDefaultUserAddress,
  setDefaultUserAddressAsync,
  getDefaultAddress: getDefaultUserAddress,
  getDefaultUserAddress,
  getDefaultUserAddressAsync,
};
