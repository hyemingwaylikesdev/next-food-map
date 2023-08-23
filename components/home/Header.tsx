import React, { useCallback } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useMap from '../../hooks/useMap';
import Header from '../common/Header';

import styles from '../../styles/header.module.scss';

const HomeHeader = () => {
  const { resetMapOptions, getMapOptions } = useMap();

  const router = useRouter();
  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query); //replace 이므로 히스토리 stack 에는 추가 안되게
    copy(location.origin + query);
  }, [router, getMapOptions]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          onClick={replaceAndCopyUrl}
          className={styles.box}
          key="button"
          aria-label="공유하기"
        >
          <AiOutlineShareAlt />
        </button>,
        <Link
          href="/feedback"
          className={styles.box}
          key="link"
          aria-label="피드백 페이지로 이동"
        >
          <VscFeedback />
        </Link>,
      ]}
    />
  );
};
export default HomeHeader;
