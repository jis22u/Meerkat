import api from './customAxios'


export const getAccount = async () => {
    const result = await api({ method: 'get', url: '/member/profile/read' })
    return result
}

