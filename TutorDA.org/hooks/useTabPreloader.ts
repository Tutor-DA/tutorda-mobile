/**
 * Hook for preloading tab content to improve performance
 * Implements lazy loading and memory management for tab screens
 */

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface TabPreloaderConfig {
  /** Tabs to preload */
  tabsToPreload: string[];
  /** Delay before preloading (ms) */
  preloadDelay?: number;
  /** Whether to preload on web platform */
  enableWebPreload?: boolean;
}

interface TabPreloaderState {
  /** Currently preloaded tabs */
  preloadedTabs: Set<string>;
  /** Whether preloading is in progress */
  isPreloading: boolean;
  /** Preload a specific tab */
  preloadTab: (tabName: string) => void;
  /** Clear preloaded tabs */
  clearPreloadedTabs: () => void;
}

/**
 * Hook for managing tab preloading to improve navigation performance
 * Preloads specified tabs after a delay to reduce initial load time
 */
export function useTabPreloader({
  tabsToPreload,
  preloadDelay = 2000,
  enableWebPreload = true,
}: TabPreloaderConfig): TabPreloaderState {
  const [preloadedTabs, setPreloadedTabs] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);

  /**
   * Preload a specific tab
   */
  const preloadTab = (tabName: string) => {
    setPreloadedTabs((prev) => new Set([...prev, tabName]));
  };

  /**
   * Clear all preloaded tabs
   */
  const clearPreloadedTabs = () => {
    setPreloadedTabs(new Set());
  };

  /**
   * Preload tabs after delay
   */
  useEffect(() => {
    // Skip preloading on web if disabled
    if (Platform.OS === 'web' && !enableWebPreload) {
      return;
    }

    const timer = setTimeout(() => {
      setIsPreloading(true);

      // Preload tabs one by one with small delays
      tabsToPreload.forEach((tabName, index) => {
        setTimeout(() => {
          preloadTab(tabName);

          // Mark preloading as complete after last tab
          if (index === tabsToPreload.length - 1) {
            setIsPreloading(false);
          }
        }, index * 100); // 100ms delay between each tab
      });
    }, preloadDelay);

    return () => clearTimeout(timer);
  }, [tabsToPreload, preloadDelay, enableWebPreload]);

  return {
    preloadedTabs,
    isPreloading,
    preloadTab,
    clearPreloadedTabs,
  };
}
