import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '../styles/header.module.scss';
import Header from '../components/common/Header';
import { Fragment } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import Link from 'next/link';
import MapSection from '@components/home/MapSection';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Fragment>
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
}
