import { useState, useCallback } from 'react';
import { Address } from '../../../types';
import { getUserAddresses } from '../../../services/addressService';

export function useCheckoutAddress(userId?: string) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const loadAddresses = useCallback(() => {
    if (!userId) return;
    const userAddresses = getUserAddresses(userId);
    setAddresses(userAddresses);
    const defaultAddr = userAddresses.find((a: Address) => a.isDefault) || userAddresses[0] || null;
    setSelectedAddress(defaultAddr);
  }, [userId]);

  return {
    addresses,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    loadAddresses,
  };
}
