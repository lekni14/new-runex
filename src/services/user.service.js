/* eslint-disable no-console */
import { api, API_URL } from '../utils/constants'
import { headers } from '../utils/auth-header'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { utils } from '../utils/utils'
import { service } from './service'


export const userService = {
  login,
  getUser,
  logout,
  registerWithEmailPassword,
  registerWithProvider,
  confirmUser,
  addAddress,
  updateUser,
  // getUser,
  // getAll,
  // getById,
  // update,
  // delete: _delete
  uploadAvatar,
  forgetPass,
  changePass
}

function login(data) {
  return axios({
    headers: headers,
    method: 'POST',
    url: API_URL + '/user/login',
    data: data
  }).then(response => {
    utils.setToken(response.data.token)
    return response
  }).catch(error => {
    //console.log(error)
    return { status: error.status, msg: "Email or password is invalid" }
  })
}

async function getUser() {
  return service.call('GET', {}, api.GET_USER)
}

async function logout() {
  return service.call('GET', {}, api.LOGOUT)
}

async function updateUser(user) {
  return service.call('PUT', user, api.USERUPDATE)
}

// function getAll() {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   }

// }

// function getById(id) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   }
// }

function registerWithEmailPassword (data) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'POST',
    withCredentials: false,
    url: API_URL + '/user/ep',
    data: data
  }).then(response => {
    if (response.status === 200) {
      utils.setToken(response.data.token)
    }
    return response
  }).catch(error => {
    return { status: error.status, msg: "Can not register" }
  })
  // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse)
}

function registerWithProvider (data) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'POST',
    url: API_URL + '/user/pd',
    data: data
  }).then(response => {
    if (response.status === 200) {
      utils.setToken(response.data.token)
    }
    return response
  }).catch(error => {
    return { status: error.status, msg: "Can not register" }
  })
}

function confirmUser (token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  return axios({
    headers: headers,
    method: 'GET',
    withCredentials: false,
    url: API_URL + '/user/confirm',
  }).then(response => {
    return response
  }).catch(error => {
    console.log(error)
  })
}

async function uploadAvatar (data) {
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
    url: `${API_URL}/user/avatar`,
    data: bodyFormData
  }).then(response => {
    //console.log(response)
    return response
  }).catch(error => {
    //console.log(error)
    return { status: error.status, msg: "Can not upload image" }
  })
}

function addAddress (address) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'POST',
    withCredentials: false,
    url: API_URL + '/user/address',
    data: address
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    console.log(error)
  })
}

function forgetPass (email) {

  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'POST',
    withCredentials: false,
    url: API_URL + '/user/forgotpass',
    data: email
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    console.log(error)
    return error.response
  })
}

function changePass (newPassword, token) {

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  return axios({
    headers: headers,
    method: 'POST',
    withCredentials: false,
    url: API_URL + '/user/updatepass',
    data: newPassword
  }).then(response => {
    //console.log(response)
    return response
  }).catch(error => {
    //console.log(error)
    return error.response
  })
}
