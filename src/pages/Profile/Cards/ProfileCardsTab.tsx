import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  CreditCard,
  Plus,
} from 'lucide-react';
import { SavedCard, User } from '../../../types';
import { cardService } from '../../../services/cardService';
import { CreditCardCard } from '../../../components/CreditCardCard/CreditCardCard';
import { CardFormModal } from './CardFormModal/CardFormModal';
import { BaseModal } from '../../../components/BaseModal/BaseModal';
import { useToast } from '../../../context/ToastContext';
import {
  cardsContainerStyle,
  cardsHeaderStyle,
  cardsHeaderTextContainerStyle,
  cardsHeaderTitleStyle,
  cardsHeaderSubtitleStyle,
  addCardButtonStyle,
  emptyCardsContainerStyle,
  emptyCardsIconContainerStyle,
  emptyCardsTitleStyle,
  emptyCardsSubtitleStyle,
  emptyCardsButtonStyle,
} from './ProfileCardsTab.styles';

interface ProfileCardsTabProps {
  user: User;
}

export const ProfileCardsTab: React.FC<ProfileCardsTabProps> = ({ user }) => {
  const { showToast } = useToast();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadCards = async () => {
    try {
      const list = await cardService.getCardsByUserIdAsync(user.id);
      setCards(list);
    } catch {
      const fallback = cardService.getCardsByUserId(user.id);
      setCards(fallback);
    }
  };

  useEffect(() => {
    loadCards();
  }, [user.id]);

  const handleDeleteCard = async (cardId: string) => {
    try {
      const updated = await cardService.deleteCardAsync(user.id, cardId);
      setCards(updated);
      setDeleteConfirmId(null);
      showToast('Cartão removido.', 'info');
    } catch {
      showToast('Erro ao remover cartão.', 'error');
    }
  };

  const handleSetDefault = async (cardId: string) => {
    try {
      const updated = await cardService.setDefaultCardAsync(user.id, cardId);
      setCards(updated);
      showToast('Cartão principal atualizado!', 'success');
    } catch {
      showToast('Erro ao definir cartão principal.', 'error');
    }
  };

  return (
    <Box sx={cardsContainerStyle}>
      <Box sx={cardsHeaderStyle}>
        <Box sx={cardsHeaderTextContainerStyle}>
          <Typography
            variant="h6"
            sx={cardsHeaderTitleStyle}
          >
            Cartões Salvos e Pagamentos
          </Typography>
          <Typography variant="body2" sx={cardsHeaderSubtitleStyle}>
            Gerencie seus cartões de crédito para um checkout rápido e seguro.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          startIcon={<Plus size={18} />}
          sx={addCardButtonStyle}
        >
          Novo Cartão
        </Button>
      </Box>

      {cards.length === 0 ? (
        <Box sx={emptyCardsContainerStyle}>
          <Box sx={emptyCardsIconContainerStyle}>
            <CreditCard size={28} />
          </Box>
          <Typography variant="h6" sx={emptyCardsTitleStyle}>
            Nenhum cartão cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={emptyCardsSubtitleStyle}>
            Adicione um cartão de crédito para compras rápidas e seguras.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            startIcon={<Plus size={18} />}
            sx={emptyCardsButtonStyle}
          >
            Adicionar Cartão
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {cards.map((card) => (
            <Grid size={{ xs: 12, sm: 6 }} key={card.id}>
              <CreditCardCard
                card={card}
                onDelete={(id) => setDeleteConfirmId(id)}
                onSetDefault={handleSetDefault}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <CardFormModal
        open={modalOpen}
        userId={user.id}
        onClose={() => setModalOpen(false)}
        onSaved={loadCards}
      />

      <BaseModal
        open={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Excluir Cartão?"
        maxWidth="440px"
        secondaryActionText="Cancelar"
        onSecondaryAction={() => setDeleteConfirmId(null)}
        primaryActionText="Excluir"
        onPrimaryAction={() => deleteConfirmId && handleDeleteCard(deleteConfirmId)}
      >
        <Typography variant="body1" color="text.secondary">
          Tem certeza de que deseja remover este cartão salvo da sua conta?
        </Typography>
      </BaseModal>
    </Box>
  );
};

