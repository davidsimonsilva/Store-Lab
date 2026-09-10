import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Package } from 'lucide-react';
import { Order, User } from '../../../types';
import { getUserOrders, getUserOrdersPagedAsync } from '../../../services/orderService';
import { useOrderTimelineSimulation } from '../../../hooks/useOrderTimelineSimulation';
import { ProfileOrderCard } from './components/ProfileOrderCard';
import {
  ordersContainerStyle,
  orderCardStyle,
  orderCardHeaderStyle,
  orderCardContentStyle,
  ordersLoadingContainerStyle,
  ordersLoadMoreContainerStyle,
  ordersLoadMoreButtonStyle,
  orderSectionHeaderTitleStyle,
  orderSectionHeaderSubtitleStyle,
  ordersEmptyBoxStyle,
  ordersEmptyIconContainerStyle,
  ordersEmptyTitleStyle,
  ordersEmptyDescriptionStyle,
  ordersListWrapperStyle,
} from './ProfileOrdersTab.styles';

interface ProfileOrdersTabProps {
  user: User;
}

export const ProfileOrdersTab: React.FC<ProfileOrdersTabProps> = ({ user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useOrderTimelineSimulation({
    userId: user.id,
    intervalMs: 10000,
    onOrdersUpdated: (updatedList) => {
      setOrders(updatedList);
    },
  });

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getUserOrdersPagedAsync(user.id, 1, 10)
      .then((result) => {
        if (isMounted) {
          setOrders(result.orders);
          setHasMore(result.hasMore);
          setPage(1);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          const fallback = getUserOrders(user.id);
          setOrders(fallback);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user.id]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const result = await getUserOrdersPagedAsync(user.id, nextPage, 10);
    setOrders(result.orders);
    setHasMore(result.hasMore);
    setPage(nextPage);
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <Box sx={ordersContainerStyle}>
      <Box>
        <Typography
          variant="h6"
          sx={orderSectionHeaderTitleStyle}
        >
          Meus Pedidos e Rastreamento
        </Typography>
        <Typography variant="body2" sx={orderSectionHeaderSubtitleStyle}>
          Acompanhe o status em tempo real, etapas de entrega e histórico de compras.
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={ordersLoadingContainerStyle}>
          {[1, 2, 3].map((skeletonId) => (
            <Box key={skeletonId} sx={orderCardStyle}>
              <Box sx={orderCardHeaderStyle}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Skeleton variant="text" width={140} height={28} />
                    <Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: '12px' }} />
                  </Box>
                  <Skeleton variant="text" width={180} height={20} />
                </Box>
              </Box>
              <Box sx={orderCardContentStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Skeleton variant="rounded" width={52} height={52} sx={{ borderRadius: '8px' }} />
                    <Box>
                      <Skeleton variant="text" width={200} height={24} />
                      <Skeleton variant="text" width={100} height={18} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" width={80} height={24} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : orders.length === 0 ? (
        <Box sx={ordersEmptyBoxStyle}>
          <Box sx={ordersEmptyIconContainerStyle}>
            <Package size={28} />
          </Box>
          <Typography variant="h6" sx={ordersEmptyTitleStyle}>
            Você ainda não possui pedidos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ordersEmptyDescriptionStyle}>
            Quando você realizar uma compra no StoreLab, todos os detalhes de envio e rastreamento aparecerão aqui.
          </Typography>
        </Box>
      ) : (
        <Box sx={ordersListWrapperStyle}>
          {orders.map((order, index) => {
            const orderSequence = orders.length - index;
            const isExpanded = expandedOrderId === order.id;

            return (
              <ProfileOrderCard
                key={order.id}
                order={order}
                orderSequence={orderSequence}
                isExpanded={isExpanded}
                onToggleExpand={toggleExpand}
                isMobile={isMobile}
              />
            );
          })}

          {hasMore && (
            <Box sx={ordersLoadMoreContainerStyle}>
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                sx={ordersLoadMoreButtonStyle}
              >
                Carregar mais
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileOrdersTab;
