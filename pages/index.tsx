import { Fragment, useEffect } from 'react';
import DetailSection from '@components/home/DetailSection';
import useStores from 'hooks/useStores';
import { NextPage } from 'next';
import { Store } from 'types/store';

import HomeHeader from 'components/home/Header';
import MapSection from 'components/home/MapSection';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  console.log(stores);

  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <HomeHeader />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden', //스크롤 안생기게
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
