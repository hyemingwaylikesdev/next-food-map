import { Fragment } from 'react';
import { NextSeo } from 'next-seo';

import Header from '../components/common/Header';

export default function Home() {
  return (
    <Fragment>
      <NextSeo
        title="추가 의견"
        description="추천해주시고 싶은 가게를 알려주세요"
      />
      <Header />
    </Fragment>
  );
}
