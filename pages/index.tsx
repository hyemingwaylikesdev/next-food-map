import HomeHeader from 'components/home/Header';
import MapSection from 'components/home/MapSection';
import { Store } from 'types/store';
import { NextPage } from 'next';
import useStores from 'hooks/useStores';

import { Fragment, useEffect } from 'react';

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
          overflow: 'hidden',
        }}
      >
        <MapSection />
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
