import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

import type { NaverMap } from '../types/map';
import type { Coordinates } from '../types/store';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    //전역 상태로 map 저장 됨
    mutate(MAP_KEY, map);
  }, []);

  //morph라는 map의 메서드 사용 map의 좌표와 줌 변경
  const resetMapOptions = useCallback(() => {
    /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  //현재 지도의 중심 좌표 리턴
  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMap;
