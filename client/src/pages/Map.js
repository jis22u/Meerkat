import { useEffect, useRef, useState } from "react";

import classes from "./Map.module.css";
import MeerkatPin from "components/map/MeerkatPin";
import SearchInput from "components/map/SearchInput";
import RegistModal from "components/map/RegistModal";
import CurrentCoin from "components/map/CurrentCoin";

const Map = () => {
  const { kakao } = window;
  const map = useRef();
  const [address, setAddress] = useState("지도를 움직여 주소를 입력하세요");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

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
        lat: 37.27943075229118,
        lng: 127.01763998406159,
      },
      {
        lat: 37.55915668706214,
        lng: 126.92536526611102,
      },
      {
        lat: 35.13854258261161,
        lng: 129.1014781294671,
      },
      {
        lat: 37.55518388656961,
        lng: 126.92926237742505,
      },
      {
        lat: 35.20618517638034,
        lng: 129.07944301057026,
      },
      {
        lat: 37.561110808242056,
        lng: 126.9831268386891,
      },
      {
        lat: 37.86187129655063,
        lng: 127.7410250820423,
      },
      {
        lat: 37.47160156778542,
        lng: 126.62818064142286,
      },
      {
        lat: 35.10233410927457,
        lng: 129.02611815856181,
      },
      {
        lat: 35.10215562270429,
        lng: 129.02579793018205,
      },
      {
        lat: 35.475423012251106,
        lng: 128.76666923366042,
      },
      {
        lat: 35.93282824693927,
        lng: 126.95307628834287,
      },
      {
        lat: 36.33884892276137,
        lng: 127.393666019664,
      },
      {
        lat: 37.520412849636,
        lng: 126.9742764161581,
      },
      {
        lat: 35.155139675209675,
        lng: 129.06154773758374,
      },
      {
        lat: 35.816041994696576,
        lng: 127.11046706211324,
      },
      {
        lat: 38.20441110638504,
        lng: 128.59038671285234,
      },
      {
        lat: 37.586112739308916,
        lng: 127.02949148517999,
      },
      {
        lat: 37.50380641844987,
        lng: 127.02130716617751,
      },
    ];

    //카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1513fbd7b2e51d56bf0f68466f776122&libraries=services,clusterer,drawing"
    );

    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(36.32232501935818, 127.29547145868312), //좌표설정
          level: 7,
        };
        //맵생성
        map.current = new kakao.maps.Map(mapContainer, options);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 클러스터러를 생성합니다
        var clusterer = new kakao.maps.MarkerClusterer({
          map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 10, // 클러스터 할 최소 지도 레벨
        });

        //마커 이미지의 이미지 주소입니다
        var imageSrc = "img/meerkat.png";

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(80, 80);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        var markers = positions.map((position) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(position.lat, position.lng),
            image: markerImage,
          });
        });

        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);

        addListener();
      });
    });
    // eslint-disable-next-line
  }, []);

  const addListener = () => {
    //중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map.current, "idle", function () {
      // 지도 중심좌표를 얻어옵니다
      var latLng = map.current.getCenter();

      setLat(latLng.getLat().toFixed(14));
      setLng(latLng.getLng().toFixed(14));

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      searchDetailAddrFromCoords(latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
          // 도로명주소 result[0].road_address.address_name
          // 지번 주소 result[0].address.address_name
        }
      });

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    });
  };

  const search = (inputValue) => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    ps.keywordSearch(inputValue, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.current.setBounds(bounds);
      }
    }
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map.current, marker);
      });
    }
  };
  const modalHandler = () => {
    if (modalIsOpen === false) {
      if(address === "지도를 움직여 주소를 입력하세요") {
        alert("지도를 움직여 주소를 입력하세요")
        return;
      }
      setModalIsOpen(true);
    }
    if (modalIsOpen === true) setModalIsOpen(false);
  };

  return (
    <div className={classes.box}>
      <div id="map" className={classes.map} />
      <MeerkatPin/>
      <CurrentCoin></CurrentCoin>
      <footer className={classes.addressBox}>
        <div className={classes.address}>
          <h1 className={classes.currentAddressTitle}>현재주소</h1>
          <span>{address}</span>
        </div>
        <div className={classes.btnBackground}>
          <button onClick={modalHandler} className={classes.btn}>등록</button>
        </div>
      </footer>
      <SearchInput search={search}/>
      {modalIsOpen && (
        <RegistModal
        address={address}
        lat={lat}
        lng={lng}
        modalHandler={modalHandler}
        />
        )}
    </div>
  );
};

export default Map;
