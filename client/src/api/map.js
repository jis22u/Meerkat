import api from "./customAxios";
import Swal from 'sweetalert2'
import axios from 'axios';

export const getMarkers = async () => {
  const res = await api({method: "get", url: ""})
  return res;
}

export const setMeerkat = async (meerkatContent) => {
  const {data} = await api({
    method: "post",
    url: "marker/regist",
    data: meerkatContent,
  });
  
  const icon = data.status === 'OK' ? 'success' : 'error'
  Swal.fire({
    position: 'center',
    icon: icon,
    title: `${data.message}`,
    showConfirmButton: false,
    timer: 1500
  })
};

export const getMeerkatDetail = async () => {
  const res = await api({ method: "get", url: "/marker/" });
  console.log(res.data);
  return res.data;
};

export const getAllMaker = async () => {
  const res = await api({ method: "get", url: "/marker/findAll" });
  return res
};

export const modifyMeerkat = async (meerkatContent) => {
  const res = await api({
    method: "put",
    url: "/marker/update",
    data: meerkatContent,
  });
  console.log(res);
  return res;
};

export const deleteMeerkat = async () => {
  const res = await api({ method: "delete", url: "/marker/delete" });
  return res
};

export const sendFcm = ({idx, roomName, content, name, fcmTokenList}) => {
  console.log(fcmTokenList, '에 알림을 보냈습니다.')
  const option = {
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    data: {
      to: `${fcmTokenList}`,
      notification: {
        title: `${name}으로부터 요청이 도착했습니다!`,
        body: content,
        click_action: `https://i8b107.p.ssafy.io/room/${roomName}/${idx}`,
      },
      data: {
        url: `https://i8b107.p.ssafy.io/room/${roomName}/${idx}`,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "key=AAAAo4aUHSc:APA91bFblK-xj0b-GUtgtFGaK2UvRKJvlglwQNFGBjvsxbIwUv5fQZ_uHlaNR-z-WrjEnyNBZ-GVQg8bELDNVv1xhR9qVphygcNj9yebM53QjtY1vZY57ESE6DisWOv3zGb-UoSzk4li",
    },
  };
  axios(option)
};


export const sendRequest = async (requestContext) => {

  const res = await api({
    method: "post",
    url: "/call/regist",
    data: requestContext,
  });
  console.log(requestContext);
  console.log(res);
  //방번호 리턴
  return res;
};
