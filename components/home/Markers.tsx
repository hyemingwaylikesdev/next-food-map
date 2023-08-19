import React from 'react';
import useCurrentStore, { CURRENT_STORE_KEY } from 'hooks/useCurrentStore';
import { MAP_KEY } from 'hooks/useMap';
import { STORE_KEY } from 'hooks/useStores';
import useSWR from 'swr';
import type { ImageIcon, NaverMap } from 'types/map';
import type { Store } from 'types/store';

import Marker from './Marker';

const Markers = () => {
  //swr에 저장 되어있는 상태들 사용 store 키를 인자로 주면 됨.
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  //현재 선택 전역상태값
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  //마커 선택
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store); //방금 누른거 currentStore
            }}
            key={store.nid}
          />
        );
      })}
      {/* 가장 최상단으로 선택된 마커가 끌어 올려지는 법 -> 추가로 그려줌*/}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore} //초기화
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), //이미지 적절하게 잘라서 쓰려고
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ), //리사이징
  };
}
