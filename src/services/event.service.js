import { API_URL } from '../utils/constants'
import axios from 'axios'
import { alertActions } from '../actions'
import { alertConstants } from '../utils/constants'
import Resizer from 'react-image-file-resizer'
import { utils } from '../utils/utils'

export const eventService = {
    addEvent,
    editEvent,
    getCategories,
    uploadImage,
    uploadImageCover,
    getEvents,
    getEventInfo,
    regEvent,
    sendSlip,
    myEvents,
    checkUserRegisteredEvent,
    updateRegEvent,
    addTicket,
    getEventsActive,
    updateRegEventWithCreditCard,
    addProduct,
    getEventInfoBySlug,
    getDetail
}
async function getEventInfoBySlug (slug) {
    // console.log(slug)
    // return service.call('GET', {}, `${api.EVENT_INFO_BY_SLUG}/${encodeURI(slug)}`)
    return await axios({
        method: "GET",
        url: `${API_URL}/event/getBySlug/${encodeURI(slug)}`
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function getEvents () {
    alertActions.error(alertConstants.LOADING)
    return axios({
        method: "GET",
        url: `${API_URL}/event/all`
    }).then(response => {
        alertActions.error(alertConstants.SUCCESS)
        return response.data
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: error.status, msg: "Can not load event" }
    })
}

function getEventsActive () {
    alertActions.error(alertConstants.LOADING)
    return axios({
        method: "GET",
        url: `${API_URL}/event/active`
    }).then(response => {
        console.log(response)
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: error.status, msg: "Can not load event" }
    })
}
async function getEventInfo (eventID) {
    return await axios({
        method: "GET",
        url: `${API_URL}/event/eventInfo/${eventID}`
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}
async function getDetail (eventID) {
    return await axios({
        method: "GET",
        // url: `${API_URL}/event/detail/${eventID}`
        url: `https://events-api.runex.co/event/JZXlZ`
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}


async function addEvent (data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return await axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/event`,
        data: data
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not add event" }
    })

}

async function editEvent (data, eventID) {
    console.log('[event.service.js] editEvent ')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return await axios({
        headers: headers,
        method: "PUT",
        url: `${API_URL}/event/edit/${eventID}`,
        data: data
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not add event" }
    })

}

function getCategories () {

    const headers = {
        'Content-Type': 'application/json'
    }

    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/category/all`
    }).then(response => {
        console.log('getCategories res', response)
        return response
    }).catch(error => {
        console.log('getCategories error ', error)
        return { status: error.status, msg: "Can not get categories" }
    })

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

async function uploadImageCover (data) {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    const bodyFormData = new FormData()
    bodyFormData.append('upload', data)

    return await axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/uploadCover`,
        data: bodyFormData
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not upload image" }
    })

}

function regEvent (data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/register/add`,
        data: data
    }).then(response => {
        //console.log(response)
        return response
    }).catch(error => {
        //console.log(error)
        return { status: error.status, msg: "Can not add event" }
    })

}

function updateRegEvent (data) {
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
        if (data.image !== '') {
            const params = {
                amount: data.total_price,
                image: data.image,
            }
            sendSlip(data.id, params)
        }
        return response
    }).catch(error => {
        return { status: error.status, msg: "Can not update event" }
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

function myEvents () {
    alertActions.error(alertConstants.LOADING)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }
    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/event/myEvent`
    }).then(response => {
        console.log(response)
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

function checkUserRegisteredEvent (id) {
    alertActions.error(alertConstants.LOADING)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return axios({
        headers: headers,
        method: "GET",
        url: `${API_URL}/register/checkUserRegisterEvent/${id}`
    }).then(response => {
        //console.log(response)
        alertActions.error(alertConstants.SUCCESS)
        return response
    }).catch(error => {
        alertActions.error(alertConstants.ERROR)
        return { code: 302, status: error.status, msg: "Can not load event" }
    })
}

async function addTicket (eventID, data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return await axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/event/${eventID}/addTicket`,
        data: data
    }).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        console.log(error)
        return { status: error.status, msg: "Can not add ticket" }
    })

}

async function addProduct (eventID, data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + utils.getToken()
    }

    return await axios({
        headers: headers,
        method: "POST",
        url: `${API_URL}/event/${eventID}/addProduct`,
        data: data
    }).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        console.log(error)
        return { status: error.status, msg: "Can not add product" }
    })
}