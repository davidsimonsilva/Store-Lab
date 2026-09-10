import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  MapPin,
  Plus,
} from 'lucide-react';
import { Address, User } from '../../../types';
import {
  getUserAddresses,
  getUserAddressesAsync,
  saveUserAddress,
  saveUserAddressAsync,
  deleteUserAddress,
  deleteUserAddressAsync,
  setDefaultUserAddress,
  setDefaultUserAddressAsync,
} from '../../../services/addressService';
import { AddressFormModal } from '../../../components/AddressFormModal/AddressFormModal';
import { AddressCard } from '../../../components/AddressCard/AddressCard';
import { BaseModal } from '../../../components/BaseModal/BaseModal';
import { useToast } from '../../../context/ToastContext';
import {
  addressesContainerStyle,
  addressesHeaderStyle,
  addressesHeaderTextContainerStyle,
  addressesHeaderTitleStyle,
  addressesHeaderSubtitleStyle,
  addAddressButtonStyle,
  emptyAddressesContainerStyle,
  emptyAddressIconContainerStyle,
  emptyAddressTitleStyle,
  emptyAddressDescriptionStyle,
  emptyAddressButtonStyle,
} from './ProfileAddressesTab.styles';

interface ProfileAddressesTabProps {
  user: User;
}

export const ProfileAddressesTab: React.FC<ProfileAddressesTabProps> = ({ user }) => {
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAddresses = async () => {
    try {
      setIsLoading(true);
      const list = await getUserAddressesAsync(user.id);
      setAddresses(list);
    } catch {
      const fallback = getUserAddresses(user.id);
      setAddresses(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [user.id]);

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (addr: Address) => {
    setEditingAddress(addr);
    setModalOpen(true);
  };

  const handleSaveAddress = async (
    addressData: Omit<Address, 'id' | 'userId'> & { id?: string }
  ) => {
    try {
      await saveUserAddressAsync(user.id, addressData);
      await loadAddresses();
      showToast('Endereço salvo com sucesso!', 'success');
    } catch {
      showToast('Erro ao salvar endereço.', 'error');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteUserAddressAsync(user.id, addressId);
      setDeleteConfirmId(null);
      await loadAddresses();
      showToast('Endereço removido.', 'info');
    } catch {
      showToast('Erro ao remover endereço.', 'error');
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultUserAddressAsync(user.id, addressId);
      await loadAddresses();
      showToast('Endereço principal atualizado!', 'success');
    } catch {
      showToast('Erro ao definir endereço padrão.', 'error');
    }
  };

  return (
    <Box sx={addressesContainerStyle}>
      <Box sx={addressesHeaderStyle}>
        <Box sx={addressesHeaderTextContainerStyle}>
          <Typography
            variant="h6"
            sx={addressesHeaderTitleStyle}
          >
            Endereços de Entrega
          </Typography>
          <Typography variant="body2" sx={addressesHeaderSubtitleStyle}>
            Gerencie múltiplos endereços residenciais e comerciais para agilizar o checkout.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpenAddModal}
          startIcon={<Plus size={18} />}
          sx={addAddressButtonStyle}
        >
          Novo Endereço
        </Button>
      </Box>

      {addresses.length === 0 ? (
        <Box sx={emptyAddressesContainerStyle}>
          <Box sx={emptyAddressIconContainerStyle}>
            <MapPin size={28} />
          </Box>
          <Typography variant="h6" sx={emptyAddressTitleStyle}>
            Nenhum endereço cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={emptyAddressDescriptionStyle}>
            Cadastre seu primeiro endereço para calcular o frete automaticamente e finalizar suas compras com rapidez.
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenAddModal}
            startIcon={<Plus size={18} />}
            sx={emptyAddressButtonStyle}
          >
            Cadastrar Endereço
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {addresses.map((addr) => (
            <Grid size={{ xs: 12, md: 6 }} key={addr.id}>
              <AddressCard
                address={addr}
                onEdit={handleOpenEditModal}
                onDelete={(id) => setDeleteConfirmId(id)}
                onSetDefault={handleSetDefault}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <AddressFormModal
        open={modalOpen}
        addressToEdit={editingAddress}
        defaultRecipientName={user.name}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddress}
      />

      <BaseModal
        open={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Excluir Endereço?"
        maxWidth="440px"
        secondaryActionText="Cancelar"
        onSecondaryAction={() => setDeleteConfirmId(null)}
        primaryActionText="Excluir"
        onPrimaryAction={() => deleteConfirmId && handleDeleteAddress(deleteConfirmId)}
      >
        <Typography variant="body1" color="text.secondary">
          Tem certeza de que deseja remover este endereço de entrega da sua conta?
        </Typography>
      </BaseModal>
    </Box>
  );
};
