import { useEffect, useCallback, useRef } from 'react';
import { Order } from '../types';
import { simulateOrdersProgression } from '../services/orderTimelineService';
import { getUserOrders } from '../services/orderService';

interface UseOrderTimelineSimulationOptions {
  userId?: string;
  intervalMs?: number;
  onOrdersUpdated?: (updatedOrders: Order[]) => void;
}

export const useOrderTimelineSimulation = ({
  userId,
  intervalMs = 10000,
  onOrdersUpdated,
}: UseOrderTimelineSimulationOptions) => {
  const onOrdersUpdatedRef = useRef(onOrdersUpdated);
  onOrdersUpdatedRef.current = onOrdersUpdated;

  const runSimulation = useCallback(() => {
    if (!userId) return;

    const currentOrders = getUserOrders(userId);

    const hasActiveOrders = currentOrders.some(
      (order) => order.status !== 'delivered' && order.status !== 'cancelled'
    );

    if (!hasActiveOrders) return;

    const result = simulateOrdersProgression(userId, new Date());
    if (result.hasUpdates && onOrdersUpdatedRef.current) {
      onOrdersUpdatedRef.current(result.orders);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    runSimulation();

    const timerId = setInterval(() => {
      runSimulation();
    }, intervalMs);

    return () => {
      clearInterval(timerId);
    };
  }, [userId, intervalMs, runSimulation]);

  return { runSimulation };
};
