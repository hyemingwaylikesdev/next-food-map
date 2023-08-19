import React from 'react';
import { MdFoodBank } from 'react-icons/md';
import Link from 'next/link';

import styles from '../../styles/header.module.scss';

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ onClickLogo, rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
          href="/"
          onClick={onClickLogo}
          className={styles.box}
          aria-label="홈으로 이동"
        >
          <MdFoodBank />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;
