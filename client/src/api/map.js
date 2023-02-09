import api from "./customAxios";

export const setMeerkat = async (meerkatContent) => {
  const res = await api.post("/marker/regist", meerkatContent);
  if (res.status === "OK") {
    alert("미어캣 등록이 완료되었습니다.");
    //페이지 전환
  } else {
    alert("미어캣을 여러개 등록할 수 없습니다.");
  }
};

export const getMeerkatDetail = async() => {
  const res = await api.get("/marker/");
  return res.data;
};

export const modifyMeerkat = async(meerkatContent) => {
  const res = await api.put("/marker/update", meerkatContent);
  return res.data;
}
