/* eslint-disable no-console */
import { API_URL } from '../utils/constants'
import { authHeader, headers } from '../utils/auth-header'
import axios from 'axios'
import { history } from '../store'
import Resizer from 'react-image-file-resizer'
import { utils } from '../utils/utils'


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

function login (data) {
  return axios({
    headers: headers,
    method: 'POST',
    url: API_URL + '/user/login',
    data: data
  }).then(response => {
    console.log(response.data.token)
    utils.setToken(response.data.token)
    return response
  }).catch(error => {
    //console.log(error)
    return { status: error.status, msg: "Email or password is invalid" }
  })
}

function getUser (token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  return axios({
    headers: headers,
    method: 'GET',
    withCredentials: false,
    url: API_URL + '/user',
  }).then(response => {
    if (response.status === 200) {
      utils.setUser(response.data.data)
    }
    return response
  }).catch(error => {
    console.log(error)
  })
}

function logout () {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'GET',
    withCredentials: false,
    url: API_URL + '/user/logout',
  }).then(response => {
    if (response.status === 200) {
      utils.removeUser()
      utils.removeToken()
      history.push('/')
    }
    return response
  }).catch(error => {
  })
  // remove user from local storage to log user out

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

function updateUser (user) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + utils.getToken()
  }
  return axios({
    headers: headers,
    method: 'PUT',
    withCredentials: false,
    url: API_URL + '/user',
    data: user
  }).then(response => {
    console.log(response)
    if (response.status === 200) {
      sessionStorage.setItem('user', JSON.stringify(user))
    }
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        // eslint-disable-next-line no-restricted-globals
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
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
