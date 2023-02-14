import api from './customAxios'


export const getAccount = async () => {
    const result = await api({ method: 'get', url: '/member/profile/read' })
    return result
}

export const verifyRoom = async (body) => {
    const result = await api({ method: 'put', url: '/room/join' , data: body })
    return result
}

export const roomClose = async (body) => {
    const result = await api({ method: 'put', url: '/room/exp' , data: body })
    return result
}

export const getCoin = async () => {
    const result = await api({ method: 'get', url: '/coin/' })
    return result
}

export const chargeCoin = async ( data ) => {
    const result = await api({ method: 'put', url: '/coin/charge', data: data})
    console.log(result)
    return result
}

export const getMypage = async () => {
    // const result = await api({method: 'get', url: '/member/mypage'});
    const value = {coin: 30, memPageDealDTOReqList: [
        { location: "여기여기 dkgdl gldldggl adgdg", coin: -30, exit_time: "211tl124425"  },
        { location: "저기저기 dkgdl gldldggl agsg", coin: -20, exit_time: "211tl124425"  },
      ], memPageDealDTOResList: [
        { location: "여기여기 dkgdl gldldggl adga", coin: 30, exit_time: "211tl124425" },
        { location: "저기저기 dkgdl gldldggl adga", coin: 20, exit_time: "211tl124425"  },
      ]}
    return value;
    }


