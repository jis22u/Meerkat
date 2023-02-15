import api from "./customAxios";
import Swal from 'sweetalert2'

export const getMarkers = async () => {
  const res = await api({method: "get", url: ""})
  return res;
}

export const setMeerkat = async (meerkatContent) => {
  console.log(meerkatContent);
  const res = await api({
    method: "post",
    url: "marker/regist",
    data: meerkatContent,
  });
  console.log(res);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${res.data.message}`,
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
  console.log(res);
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
