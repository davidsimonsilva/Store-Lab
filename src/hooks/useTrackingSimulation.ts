import { useEffect, useState, useCallback } from 'react';
import { SanitizedTrackingInfo } from '../types';
import { getSanitizedTrackingInfo } from '../services/trackingService';

interface UseTrackingSimulationOptions {
  trackingQuery: string;
  currentUserId?: string;
  intervalMs?: number;
}

export const useTrackingSimulation = ({
  trackingQuery,
  currentUserId,
  intervalMs = 10000,
}: UseTrackingSimulationOptions) => {
  const [trackingInfo, setTrackingInfo] = useState<SanitizedTrackingInfo | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const refreshTracking = useCallback(() => {
    if (!trackingQuery || !trackingQuery.trim()) {
      setTrackingInfo(null);
      return;
    }

    const result = getSanitizedTrackingInfo(trackingQuery, currentUserId);
    setTrackingInfo(result);
  }, [trackingQuery, currentUserId]);

  useEffect(() => {
    if (!trackingQuery || !trackingQuery.trim()) {
      setTrackingInfo(null);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    const initialResult = getSanitizedTrackingInfo(trackingQuery, currentUserId);
    setTrackingInfo(initialResult);
    setIsSearching(false);

    if (initialResult?.isDelivered) {
      return;
    }

    const timerId = setInterval(() => {
      refreshTracking();
    }, intervalMs);

    return () => {
      clearInterval(timerId);
    };
  }, [trackingQuery, currentUserId, intervalMs, refreshTracking]);

  return {
    trackingInfo,
    isSearching,
    hasSearched,
    refreshTracking,
  };
};
