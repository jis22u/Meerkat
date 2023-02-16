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
    return result
}

export const sendToken = async ( data ) => {
    const result = await api({ method: 'put', url: '/member/fcm', data: data})
    return result
}

export const getMypage = async () => {
    const result = await api({method: 'get', url: '/member/profile/mypage'});
    return result.data.value;
    }


