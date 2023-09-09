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
        title="반려동물 동반 식당, 카페 지도"
        description="반려동물과 함께할 수 있는 식당을 소개해드려요🙌"
        canonical="https://mong-sik-hyemingwaylikesdev.vercel.app"
        openGraph={{
          url: `https://mong-sik-hyemingwaylikesdev.vercel.app`,
        }}
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

//백엔드와 프론트의 결합도를 느슨하게 만듦
export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((response) => response.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
