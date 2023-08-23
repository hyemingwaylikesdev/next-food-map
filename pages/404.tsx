/** https://nextjs.org/docs/advanced-features/custom-error-page#404-page */
import { GiHeartInside } from 'react-icons/gi';

import styles from 'styles/404.module.scss';
export default function Custom404() {
  return (
    <div className={`${styles.cute404Container}`}>
      <h1>페이지를 찾을 수 없어요</h1>
      <p>요청하신 페이지를 찾을 수 없습니다</p>
      <GiHeartInside className={`${styles.heartIcon}`} />
    </div>
  );
}
