/**
 * Hook for handling offline functionality
 */

import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface OfflineState {
  isOnline: boolean;
  isOfflineReady: boolean;
}

export function useOfflineSupport(): OfflineState {
  const [isOnline, setIsOnline] = useState(true);
  const [isOfflineReady, setIsOfflineReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web platform - use navigator.onLine
      const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
      };

      // Set initial state
      setIsOnline(navigator.onLine);

      // Listen for online/offline events
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      };
    } else {
      // Mobile platforms - would use NetInfo in a real app
      // For now, assume always online on mobile
      setIsOnline(true);
    }

    // Simulate offline readiness setup
    const timer = setTimeout(() => {
      setIsOfflineReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return {
    isOnline,
    isOfflineReady,
  };
}
