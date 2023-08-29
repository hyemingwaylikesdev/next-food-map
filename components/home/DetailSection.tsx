import { useState } from 'react';
import useSWR from 'swr';

import { CURRENT_STORE_KEY } from '../../hooks/useCurrentStore';
import type { Store } from '../../types/store';

import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';
import StoreList from './StoreList';

import styles from '../../styles/detail.module.scss';

const DetailSection = () => {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY); //현재 선택 된 키 가져오기
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.detailSection} ${expanded ? styles.expanded : ''} ${
        currentStore ? styles.selected : ''
      }`}
    >
      {/* 여기에 리스트 넣기 */}
      <DetailHeader
        currentStore={currentStore}
        expanded={expanded}
        onClickArrow={() => setExpanded(!expanded)}
      />
      <DetailContent currentStore={currentStore} expanded={expanded} />
      {/* <StoreList /> */}
    </div>
  );
};
export default DetailSection;
