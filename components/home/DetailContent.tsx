import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import Image from 'next/image';
import Naver from 'public/images/naver.png';

import type { Store } from '../../types/store';

import styles from '../../styles/detail.module.scss';

type Props = {
  currentStore?: Store;
  expanded: boolean;
};

const DetailContent = ({ currentStore, expanded }: Props) => {
  if (!currentStore) return null;
  return (
    <div
      className={`${styles.detailContent} ${expanded ? styles.expanded : ''}`}
    >
      <div className={styles.images}>
        {currentStore.images.slice(0, 3).map((image) => (
          <div
            style={{ position: 'relative', maxWidth: 120, height: 80 }}
            key={image}
          >
            <Image
              src={image}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="120px"
              placeholder="blur" //이미지 로딩동인 블러
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg==" //블러 데이터 이미지를 직접 줌
              priority
            />
          </div>
        ))}
      </div>
      {expanded && (
        <>
          <hr />
          <div className={styles.basicInfo}>
            <h2>정보</h2>
            <div className="address">
              <IoLocationOutline size={20} />
              <span>{currentStore.address || '정보가 없습니다.'}</span>
            </div>
            <div className="phone">
              <IoCallOutline size={20} />
              <span>{currentStore.phone || '정보가 없습니다.'}</span>
            </div>
            <div className="naverUrl">
              <Image src={Naver} width={20} height={20} alt="" />
              <a
                href={`https://pcmap.place.naver.com/restaurant/${currentStore.nid}/home`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>네이버 상세 정보</span>
              </a>
            </div>
          </div>
          <hr />
          <div className={styles.menus}>
            <h2>메뉴</h2>
            <ul>
              {currentStore.menus?.map((menu) => (
                <li className={styles.menu} key={menu.name}>
                  <span className={styles.name}>{menu.name}</span>
                  <span className={styles.price}>{menu.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailContent;
