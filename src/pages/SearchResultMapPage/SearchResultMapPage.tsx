import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from 'components/common';
import { ReviewResultsProps } from 'pages/SearchResultPage/SearchResultPage';
import { Button, BackButton } from 'components/common';
import Marker from 'assets/icons/Marker.png';
import MarkerSelected from 'assets/icons/MarkerSelected.png';
import { StResultMapContainer } from './SearchResultMapPage.styles';

export const SearchResultMapPage = ({
  reviewList,
}: {
  reviewList: ReviewResultsProps[];
}) => {
  console.log('reviewList ', reviewList);

  //const navigate = useNavigate();
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerImage = new kakao.maps.MarkerImage(
    Marker,
    new kakao.maps.Size(21, 28)
  );
  const markerSelectedImage = new kakao.maps.MarkerImage(
    MarkerSelected,
    new kakao.maps.Size(36, 48)
  );

  const moveToCurrentLocation = (map: kakao.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          map.panTo(location);
        },
        () => {
          const location = new kakao.maps.LatLng(37.545043, 127.039245);
          map.panTo(location);
        }
      );
    }
  };

  const initMap = (map: kakao.maps.Map) => {
    let selectedMarker: kakao.maps.Marker | null = null;
    let selectedOverlay: kakao.maps.CustomOverlay | null = null;

    mapInstance.current = map;
    console.log('mapInstance ', mapInstance);

    // 마커 및 오버레이 세팅
    reviewList.map((data: ReviewResultsProps) => {
      const geocoder = new kakao.maps.services.Geocoder(); // 주소 -> 좌표 변환

      // 변환한 좌표가 유효할 경우 마커 및 오버레이 세팅
      geocoder.addressSearch(data.address, (result, status) => {
        console.log('geocoder ', result);
        if (status === kakao.maps.services.Status.OK) {
          // 주소 -> 좌표 변환
          const coord = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );

          // 마커 생성
          const marker = new kakao.maps.Marker({
            image: markerImage,
            position: coord,
          });
          marker.setMap(map); // 마커 맵에 추가

          // 툴팁 생성
          const overlay = new kakao.maps.CustomOverlay({
            position: coord,
            content: `<div style="background-color: #eeeeee; padding: 7px;border-radius: 10px;">
              <a href="/review/${data.id}">
            <img src='${data.mainImgUrl}' width="100px" height="100px"/>
            </a>
          </div>`,
            xAnchor: 0.475,
            yAnchor: 1.35,
            clickable: true,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            if (!selectedMarker) {
              console.log('selected marker is null', selectedMarker);
              marker.setImage(markerSelectedImage);
            }
            if (selectedMarker !== marker) {
              console.log(
                'marker: ',
                marker,
                'selected marker: ',
                selectedMarker
              );
              marker.setImage(markerSelectedImage);
              selectedMarker?.setImage(markerImage);
              selectedOverlay?.setMap(null);
            }

            overlay.setMap(map); // 툴팁 열기 이벤트 리스너 추가

            selectedMarker = marker;
            selectedOverlay = overlay;
          });
          kakao.maps.event.addListener(map, 'click', () => {
            selectedMarker?.setImage(markerImage);
            selectedMarker = null;
            overlay.setMap(null); // 툴팁 닫기 이벤트 리스너 추가
          });
        }
      });
    });
  };

  const onBackHandler = () => {
    console.log('onBackHandler');
  };

  useEffect(() => {
    console.log('map Instance (useEffect) ', mapInstance);
  });

  return (
    <StResultMapContainer>
      <Map width="100%" height="100%" initMap={initMap} />
      <BackButton onClick={onBackHandler} />
      <Button
        type="circleFill"
        onClick={() => {
          if (mapInstance.current) {
            moveToCurrentLocation(mapInstance.current);
          } else {
            console.log('no map instance found');
          }
        }}
      >
        현위치
      </Button>
    </StResultMapContainer>
  );
};
