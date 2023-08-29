import { STORE_KEY } from 'hooks/useStores';
import useSWR from 'swr';
import { Store } from 'types/store';

interface Props {
  stores: Store[];
}

const StoreList = () => {
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  if (!stores) return null;

  return (
    <>
      {stores.map((store) => {
        return <>{store.name}</>;
      })}
    </>
  );
};
export default StoreList;
