import useCurrentStore from 'hooks/useCurrentStore';
import useMap from 'hooks/useMap';
import { NaverMap } from 'types/map';

import Map from './Map';
import Markers from './Markers';

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore); //지도 눌렀을 때 선택 된 마커 클리어
  };

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};

export default MapSection;
