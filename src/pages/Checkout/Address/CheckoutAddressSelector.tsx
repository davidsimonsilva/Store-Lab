import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import {
  Plus,
} from 'lucide-react';
import { Address, User } from '../../../types';
import { saveUserAddress } from '../../../services/addressService';
import { AddressFormModal } from '../../../components/AddressFormModal/AddressFormModal';
import { AddressCard } from '../../../components/AddressCard/AddressCard';
import {
  addressAddButtonStyle,
} from './CheckoutAddressSelector.styles';

interface CheckoutAddressSelectorProps {
  user: User;
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (address: Address) => void;
  onRefreshAddresses: () => void;
}

export const CheckoutAddressSelector: React.FC<CheckoutAddressSelectorProps> = ({
  user,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onRefreshAddresses,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveNewAddress = (addressData: Omit<Address, 'id' | 'userId'> & { id?: string }) => {
    const saved = saveUserAddress(user.id, addressData);
    onRefreshAddresses();
    onSelectAddress(saved);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          return (
            <Grid size={{ xs: 12, sm: 6 }} key={addr.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <AddressCard
                address={addr}
                isSelected={isSelected}
                selectable
                onSelect={onSelectAddress}
              />
            </Grid>
          );
        })}

        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={addressAddButtonStyle} onClick={() => setModalOpen(true)}>
            <Plus size={24} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Adicionar Novo Endereço
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Preenchimento rápido via CEP
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <AddressFormModal
        open={modalOpen}
        defaultRecipientName={user?.name || ''}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNewAddress}
      />
    </Box>
  );
};
