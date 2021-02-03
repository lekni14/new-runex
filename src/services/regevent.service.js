import { api, API_URL } from '../utils/constants'
import axios from 'axios'
import { utils } from '../utils/utils'
import { service } from './service'

export const regEventService = {
    regRaceEvent,
    myRegEvents,
    getRegEventDetail,
    getPromoCodeInfo,
    chargeReg,
    editRegEvent,
    getAllEventActivity,
    checkRegEvent,
}

async function myRegEvents () {
    return service.call('GET', {}, api.MYREG_EVENT)
}

function regRaceEvent (data) {
    return service.call('POST', data, api.REGISTER)
}

function checkRegEvent(id){
    return service.call('GET', {}, `${api.CHECK_REG_EVENT}${id}`)
}

function chargeReg(data){
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/payment`,
        data: data,
    }).then(response => {
        return response
    }).catch(error => {
        return error
    })
}

function getRegEventDetail(regEventID) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/register/getRegEvent/${regEventID}`
    }).then(response => {
        return response
    }).catch(error => {
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function getPromoCodeInfo(code) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/coupon/couponInfo/${code}`
    }).then(response => {
        return response
    }).catch(error => {
        return { code: 302, status: error.status, msg: "code not found" }
    })
}

function editRegEvent(data){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "PUT",
        url: `${API_URL}/register/edit/${data.id}`,
        data: data
    }).then(response => {
        return response
    }).catch(error => {
        return { code: 302, status: error.status, msg: "Update register fail" }
    })
}

function getAllEventActivity(data){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `https://runex-api.thinkdev.app/api/v1/activity/getAllEventActivity/${data}`,
        data: data
    }).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        return { code: 302, status: error.status, msg: "get Activity fail" }
    })
}