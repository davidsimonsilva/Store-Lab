import React, { createContext, useContext, useState } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../services/storageService';
import { STORAGE_KEYS } from '../constants';

export function formatUrlName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface UIStateContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProductId: string | number | null;
  setSelectedProductId: (id: string | number | null) => void;
  formatUrlName: (name: string) => string;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

export const UIStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const [selectedCategory, setSelectedCategoryState] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(() => {
    return getStorageItem<string | number | null>(STORAGE_KEYS.SELECTED_PRODUCT_ID, null);
  });

  const handleSetSearchQuery = (query: string) => {
    setSearchQueryState(query);
    if (query && query.trim() !== '') {
      setSelectedCategoryState('all');
    }
  };

  const handleSetSelectedCategory = (category: string) => {
    setSelectedCategoryState(category);
    setSearchQueryState('');
  };

  const handleSetSelectedProductId = (id: string | number | null) => {
    setSelectedProductId(id);
    if (id !== null) {
      setStorageItem(STORAGE_KEYS.SELECTED_PRODUCT_ID, String(id));
    } else {
      removeStorageItem(STORAGE_KEYS.SELECTED_PRODUCT_ID);
    }
  };

  return (
    <UIStateContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSetSearchQuery,
        selectedCategory,
        setSelectedCategory: handleSetSelectedCategory,
        selectedProductId,
        setSelectedProductId: handleSetSelectedProductId,
        formatUrlName
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

const defaultUIStateContext: UIStateContextType = {
  searchQuery: '',
  setSearchQuery: () => {},
  selectedCategory: 'all',
  setSelectedCategory: () => {},
  selectedProductId: null,
  setSelectedProductId: () => {},
  formatUrlName,
};

export const useUIState = (): UIStateContextType => {
  const context = useContext(UIStateContext);
  if (!context) {
    console.warn('useUIState was called outside of a UIStateProvider. Returning default fallback context.');
    return defaultUIStateContext;
  }
  return context;
};
