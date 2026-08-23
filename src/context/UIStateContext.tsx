import React, { createContext, useContext, useState } from 'react';

export function formatUrlName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
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
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('store_lab_selected_product_id');
      } catch (err) {
        console.error("Error reading localStorage product id", err);
      }
    }
    return null;
  });

  /**
   * Ao digitar ou pesquisar:
   * - Atualiza a query de busca
   * - Desmarca as Categorias em Destaque (reseta para 'all') se houver termo de busca
   */
  const handleSetSearchQuery = (query: string) => {
    setSearchQueryState(query);
    if (query && query.trim() !== '') {
      setSelectedCategoryState('all');
    }
  };

  /**
   * Ao selecionar uma categoria (via tags da Home ou opções do Footer):
   * - Limpa o termo de pesquisa
   * - Ativa a tag da categoria selecionada
   */
  const handleSetSelectedCategory = (category: string) => {
    setSelectedCategoryState(category);
    setSearchQueryState('');
  };

  const handleSetSelectedProductId = (id: string | number | null) => {
    setSelectedProductId(id);
    if (typeof window !== 'undefined' && id !== null) {
      localStorage.setItem('store_lab_selected_product_id', String(id));
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

export const useUIState = (): UIStateContextType => {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};

// Aliases for backward compatibility during transition

/**
 * @deprecated Use o componente `UIStateProvider` em seu lugar. Este alias foi descontinuado e será removido no futuro.
 */
export const GlobalProvider = UIStateProvider;

/**
 * @deprecated Use o hook `useUIState` em seu lugar. Este alias foi descontinuado e será removido no futuro.
 */
export const useGlobal = useUIState;
