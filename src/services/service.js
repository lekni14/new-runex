import axios from 'axios'
import { api } from '../utils/constants'
// import { useRecoilValue } from 'recoil'
// import { accessToken } from '../lib/recoil-atoms'
import { utils } from '../utils/utils'

export const service = {
    call,
    verifyCode,
}

function call(method, data, path){
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: method,
        withCredentials: false,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        data: data,
    }).then((response) => {
        // print(response)
        
        if (response.status === 200){
            return response.data
        }else if (response.status === 444){
            //return response.data
            if(utils.getRefreshToken() === ''){

            }
            const params = {
                refresh_token: utils.getRefreshToken()
            }
            console.log(params)
            return refreshToken('POST',params, api.REFRESH_TOKEN)
        }else{
            return response.data
        }
        
    }).catch(error => {
        if (error.response !== undefined && error.response !== null){
            if (error.response.status === 444){
                if(utils.getRefreshToken() === ''){
                    return null
                }
                const params = {
                    refresh_token: utils.getRefreshToken()
                }
                return refreshToken('POST',params, api.REFRESH_TOKEN)
            }
        }
        return null
    })
}

async function refreshToken(method, data, path){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: method,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        data: data,
    }).then(response => {
        if (response.status === 200){
            return response.data
        }else if (response.status === 444){
            return response.data
        }
        
    }).catch(error => {
        console.log(error.response.status)
        return error.response
    })
}

async function verifyCode(data){
    console.log(data)
    return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_VERIFYCODE_URL}`,
        data: data,
    }).then(response => {
        console.log(response)
        if (response.status === 200){
            return response.data
        }else{
            return response.data
        }
        
    }).catch(error => {
        return error.response
    })
}