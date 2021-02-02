import { api, API_URL } from '../utils/constants'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { utils } from '../utils/utils'
import { service } from './service'

export const eventService = {
    uploadImage,
    sendSlip,
    updateRegEventWithCreditCard,
    getDetail
}

async function getDetail (code) {
    return service.call('GET', {}, `${api.EVENT_INFO}/${code}`)
}

async function uploadImage (data) {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    const bodyFormData = new FormData()

    await new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            data,
            1000,
            1000,
            data && data.type.includes("png") ? 'PNG' : 'JPEG',
            100,
            0,
            blob => {
                var file = new File([blob], data ? data.name : '', { type: data ? data.type : '', lastModified: Date.now() })
                resolve(bodyFormData.append('upload', file));
            },
            'blob'
        )
    });

    return await axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/uploads`,
        data: bodyFormData
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not upload image" }
    })

}

function updateRegEventWithCreditCard (data) {
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
        return { status: error.status, msg: "Can not update event" }
    })

}

function sendSlip (id, data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/sendSlip/` + id,
        data: data
    }).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        console.log(error)
        return { status: error.status, msg: "Can not add event" }
    })

}