import React, { useEffect, useRef } from 'react';
import { INITIAL_CENTER, INITIAL_ZOOM } from 'hooks/useMap';
import Script from 'next/script';
import { NaverMap } from 'types/map';
import { Coordinates } from 'types/store';

import styles from 'styles/map.module.scss';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  //맵 컨포넌트 언마운트되면 인스턴스 파기
  // useEffect(() => {
  //   return () => {
  //     mapRef.current?.destroy();
  //   };
  // }, []);

  return (
    <>
      <Script
        strategy="afterInteractive" //afterInteractive 는 페이지가 바로 뜨자마자 빠르게 보여지는 경우. 아니면 LazyLoad
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        // onReady 사용하는 이유 : 언마운트 되면 인스턴스 파기해서
        onReady={initializeMap}
      />
      <div id={mapId} className={styles.map} />
    </>
  );
};

export default Map;
