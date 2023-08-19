import React from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useMap from '../../hooks/useMap';
import Header from '../common/Header';

import styles from '../../styles/header.module.scss';

const HomeHeader = () => {
  const { resetMapOptions, getMapOptions } = useMap();

  const router = useRouter();

  return (
    <Header
      rightElements={[
        <button
          onClick={() => {
            alert('복사');
          }}
          className={styles.box}
          key="button"
        >
          <AiOutlineShareAlt />
        </button>,
        <Link href="/feedback" className={styles.box} key="link">
          <VscFeedback />
        </Link>,
      ]}
    />
  );
};
export default HomeHeader;
