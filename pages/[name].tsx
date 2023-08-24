import DetailContent from '@components/home/DetailContent';
import DetailHeader from '@components/home/DetailHeader';
import useCurrentStore from 'hooks/useCurrentStore';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import type { Store } from 'types/store';

import styles from '/styles/detail.module.scss';
interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
    /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
  `);
  };
  //   if (router.isFallback) {
  //     return <>loading</>; //로딩 페이지
  //   } //fallback: true 일때
  return (
    <>
      <NextSeo
        title={store.name}
        description="상세 페이지입니다"
        canonical={`https://mong-sik-hyemingwaylikesdev.vercel.app/feedback${store.name}`}
      />
      <div className={`${styles.detailSection} ${styles.expanded}`}>
        <DetailHeader
          currentStore={store}
          expanded={true}
          onClickArrow={goToMap}
        />
        <DetailContent currentStore={store} expanded={true} />
      </div>
    </>
  );
};
export default StoreDetail;

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
/**페이지의 경로를 정적으로 생성해줌 -> 필요한 경로에 대해서 프리렌더링 해놓음 */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } })); //경로를 만들어 주기

  /**빌드가 끝난 뒤 새로운 경로를 만들어 줄 수 없으니 fallback 사용
    fallback: false 는 빌드 타임에 모든 경로 만듦
    true도 빌드가 끝난 뒤 주소가 없는 경우 getStaticProps를 호출해서 해당하는게 있는지 한번 더 확인
    유용한 경우:   
        1. 불러오는 데이트 양이 많을 때 최소한 경우의 주소만 프리렌더링으로 생성하고, 나머지는 들어올 때마다 생성
        2. 빌드가 끝난 뒤 새로운 데이터 insert 되었을 때

    'blocking' : 바로 주소가 없는 경우 getStaticProps를 호출, 리턴될때까지 가만히 기다림 최초에 접근한 사람에 대해서만 getStaticProps를 호출 그 뒤에는 프리렌더링 사용
    */
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  //   if (!store) {
  //     return { notFound: true }; //404 page
  //   } //fallback: true 일때

  return { props: { store } };
};
