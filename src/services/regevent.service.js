import { api, API_URL } from '../utils/constants'
import axios from 'axios'
import { alertActions } from '../actions'
import { alertConstants } from '../utils/constants'
import { utils } from '../utils/utils'
import { service } from './service'

export const regEventService = {
    regRaceEvent,
    myRegEvents,
    getRegEventDetail,
    getPromoCodeInfo,
    chargeReg,
    getRegEventReport,
    getRegEventReportAll,
    editRegEvent,
    searchPreOrder,
    getAllEventActivity
}

async function myRegEvents () {
    return service.call('GET', {}, api.MYREG_EVENT)
}

function regRaceEvent (data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/addRace`,
        data: data
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not add event" }
    })

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
        alertActions.error(alertConstants.ERROR)
        return error
    })
}

function getRegEventDetail(regEventID) {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/register/getRegEvent/${regEventID}`
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function getPromoCodeInfo(code) {
    alertActions.error(alertConstants.LOADING)
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

function getRegEventReport(data) {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/report`,
        data: data
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function getRegEventReportAll(data) {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/reportAll`,
        data: data
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
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
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Update register fail" }
    })
}

function searchPreOrder(data){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        // headers: headers,
        method: "POST",
        url: `https://runex-api.thinkdev.app/api/v2/searchPreOrder`,
        data: data
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        console.log(error)
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "search order fail" }
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
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        console.log(error)
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "get Activity fail" }
    })
}