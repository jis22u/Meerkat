import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import classes from "./Map.module.css";
import MeerkatPin from "components/map/MeerkatPin";
import SearchInput from "components/map/SearchInput";
import RegistModal from "components/map/RegistModal";
import CurrentCoin from "components/map/CurrentCoin";
import { getAllMaker } from "api/map";
import { getCoin } from "api/user";
import { useLocation } from "react-router";

const Map = () => {
  const  params  = useLocation();
  const check = params.state.check;
  const { kakao } = window;
  const map = useRef();
  const [address, setAddress] = useState("지도를 움직여 주소를 입력하세요");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [coin, setCoin] = useState();

  useEffect(() => {
    console.log(check)
    // 마커를 표시할 위치 객체 배열입니다
    const init = async () => {
      const { data } = await getAllMaker();
      const res = await getCoin();
      setCoin(res.data.value);
      const positions = data.value;

      console.log("script loaded!!!");
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
    };
    init();
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
      if (address === "지도를 움직여 주소를 입력하세요") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "지도를 움직여 주소를 입력하세요",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      setModalIsOpen(true);
    }
    if (modalIsOpen === true) setModalIsOpen(false);
  };

  return (
    <div className={classes.box}>
      <div id="map" className={classes.map} />
      <MeerkatPin check={check} />
      <CurrentCoin coin={coin}></CurrentCoin>
      <footer className={classes.addressBox}>
        <div className={classes.address}>
          <h1 className={classes.currentAddressTitle}>현재주소</h1>
          <span>{address}</span>
        </div>
        <div className={classes.btnBackground}>
          <button onClick={modalHandler} className={classes.btn}>
            등록
          </button>
        </div>
      </footer>
      <SearchInput search={search} />
      {modalIsOpen && (
        <RegistModal
          address={address}
          lat={lat}
          lng={lng}
          modalHandler={modalHandler}
          check={check}
        />
      )}
    </div>
  );
};

export default Map;
