import { useCallback } from 'react';
import { mutate } from 'swr';

import { Store } from '../types/store';

export const STORE_KEY = '/stores';

//매장데이터를 전역으로 저장하는 훅
const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    //swr 함수
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores,
  };
};
export default useStores;
