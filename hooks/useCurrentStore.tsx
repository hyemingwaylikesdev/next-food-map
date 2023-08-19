import { useCallback } from 'react';
import { mutate } from 'swr';
import type { Store } from 'types/store';

export const CURRENT_STORE_KEY = '/current-store';

const useCurrentStore = () => {
  //선택
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);
  //초기화
  const clearCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return {
    setCurrentStore,
    clearCurrentStore,
  };
};
export default useCurrentStore;
