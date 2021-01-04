import { API_URL } from '../utils/constants'
import axios from 'axios'
import { alertActions } from '../actions'
import { alertConstants } from '../utils/constants'
import { utils } from '../utils/utils'

export const activtyService = {
    addActivity,
    getActivityInfo,
}

function addActivity(data) {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/activity/add`,
        data: data
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function getActivityInfo(id) {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/activity/getByEvent2/${id}`
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load" }
    })
}