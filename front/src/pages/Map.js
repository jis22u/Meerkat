import { useEffect } from "react";

import MeerkatPin from "../components/map/MeerkatPin"
import classes from "./Map.module.css"


const Map = () => {

  //스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // 마커를 표시할 위치 객체 배열입니다
    const positions = [
      {
        "lat": 37.27943075229118,
        "lng": 127.01763998406159
      },
      {
        "lat": 37.55915668706214,
        "lng": 126.92536526611102
      },
      {
        "lat": 35.13854258261161,
        "lng": 129.1014781294671
      },
      {
        "lat": 37.55518388656961,
        "lng": 126.92926237742505
      },
      {
        "lat": 35.20618517638034,
        "lng": 129.07944301057026
      },
      {
        "lat": 37.561110808242056,
        "lng": 126.9831268386891
      },
      {
        "lat": 37.86187129655063,
        "lng": 127.7410250820423
      },
      {
        "lat": 37.47160156778542,
        "lng": 126.62818064142286
      },
      {
        "lat": 35.10233410927457,
        "lng": 129.02611815856181
      },
      {
        "lat": 35.10215562270429,
        "lng": 129.02579793018205
      },
      {
        "lat": 35.475423012251106,
        "lng": 128.76666923366042
      },
      {
        "lat": 35.93282824693927,
        "lng": 126.95307628834287
      },
      {
        "lat": 36.33884892276137,
        "lng": 127.393666019664
      },
      {
        "lat": 37.520412849636,
        "lng": 126.9742764161581
      },
      {
        "lat": 35.155139675209675,
        "lng": 129.06154773758374
      },
      {
        "lat": 35.816041994696576,
        "lng": 127.11046706211324
      },
      {
        "lat": 38.20441110638504,
        "lng": 128.59038671285234
      },
      {
        "lat": 37.586112739308916,
        "lng": 127.02949148517999
      },
      {
        "lat": 37.50380641844987,
        "lng": 127.02130716617751
      }
    ]

    //카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1513fbd7b2e51d56bf0f68466f776122&libraries=services,clusterer,drawing"
    );

    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(36.32232501935818, 127.29547145868312), //좌표설정
          level: 12,
        };
        //맵생성
        var map = new kakao.maps.Map(mapContainer, options);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 클러스터러를 생성합니다 
        var clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
          minLevel: 10, // 클러스터 할 최소 지도 레벨 
        });

        //마커 이미지의 이미지 주소입니다
        var imageSrc =
          "img/meerkat.png";

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(80, 80);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        var markers = positions.map(position => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(position.lat, position.lng),
            image: markerImage
          });
        })

        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
      });
    });
  }, []);

  return (
    <div>
      <div id="map" className={classes.map} />
      <MeerkatPin></MeerkatPin>
    </div>
  );
}

export default Map; 