import { Fragment, useEffect } from 'react';
import DetailSection from '@components/home/DetailSection';
import useStores from 'hooks/useStores';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Store } from 'types/store';

import HomeHeader from 'components/home/Header';
import MapSection from 'components/home/MapSection';
interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <NextSeo
        title="멍멍이와 식사를"
        description="반려동물과 함께할 수 있는 식당을 소개해드려요🙌"
      />
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
