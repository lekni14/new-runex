import { userConstants } from '../utils/constants'
import { userService } from '../services'
import { alertActions } from './'

export const userActions = {
  login,
  logout,
  showLogin,
  registerEP,
  registerPD,
  getUser,
  closeLogin,
  updateProfile,
  addAddress,
  // getAll,
  // delete: _delete
}

function login (data) {
  return dispatch => {
    dispatch(request(data.email))

    userService.login(data)
      .then(
        response => {
          if (response.status === 200) {
            dispatch(success(response.data.token))
            dispatch(getUser(response.data.token))
          } else {
            dispatch(failure(response.msg))
            dispatch(alertActions.error('ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบอีเมลหรือรหัสผ่านของท่าน'))
          }
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(error(error.toString()))
        }
      )
  }

  function request (data) { return { type: userConstants.LOGIN_REQUEST, data } }
  function success (data) { return { type: userConstants.LOGIN_SUCCESS, data } }
  function failure (error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getUser (token) {
  return dispatch => {
    dispatch(request())
    userService.getUser(token)
      .then(res => {
        if (res.status === 200) {
          dispatch(success(res.data.data))
        }
      },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        })

  }
  function request () { return { type: userConstants.ME_REQUEST } }
  function success (data) { return { type: userConstants.ME_SUCCESS, data } }
  function failure () { return { type: userConstants.ME_FAILURE } }
}

function logout () {
  userService.logout()
  return { type: userConstants.LOGOUT }
}

function showLogin () {
  const data = {
    isShowLogin: true
  }
  return { type: userConstants.SHOW_LOGIN, data }
}

function closeLogin () {
  const data = {
    isShowLogin: false
  }
  return { type: userConstants.CLOSE_LOGIN, data }
}

function registerEP (data) {
  return dispatch => {
    dispatch(request(data.email))

    userService.registerWithEmailPassword(data)
      .then(
        response => {
          if (response.status === 200) {
            dispatch(success(response.data.token))
            dispatch(getUser(response.data.token))
          } else if (response.status > 200 && response.status < 400) {
            dispatch(failure(response.data.msg))
            dispatch(alertActions.error(response.data.msg))
          } else {
            dispatch(failure(response.msg))
            dispatch(alertActions.error(response.msg))
          }
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(error(error.toString()))
        }
      )
  }

  function request (data) { return { type: userConstants.REGISTER_REQUEST, data } }
  function success (data) { return { type: userConstants.LOGIN_SUCCESS, data } }
  function failure (error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function registerPD (data) {
  return dispatch => {
    dispatch(request(data.email))

    userService.registerWithProvider(data)
      .then(
        response => {
          if (response.status === 200) {
            dispatch(success(response.data.token))
            dispatch(getUser(response.data.token))
            //history.push(history.location.pathname);
          } else if (response.status < 400) {
            dispatch(failure(response.data.msg))
            dispatch(alertActions.error(response.data.msg))
          } else {
            dispatch(failure(response.msg))
            dispatch(alertActions.error(response.msg))
          }
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(error(error.toString()))
        }
      )
  }

  function request (data) { return { type: userConstants.REGISTER_REQUEST, data } }
  function success (data) { return { type: userConstants.LOGIN_SUCCESS, data } }
  function failure (error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addAddress (address) {
  return dispatch => {
    dispatch(request(address))
    userService.addAddress(address)
      .then(response => {
        if (response.status === 200) {
          dispatch(success(response.data.data))
        } else {
          dispatch(failure(response.data.data))
        }
      }, error => {
        dispatch(failure(error.toString))
        dispatch(error(error.toString()))
      })
  }

  function request (data) { return { type: userConstants.ADD_ADDRESS_REQUEST, data } }
  function success (data) { return { type: userConstants.ADD_ADDRESS_SUCCESS, data } }
  function failure (error) { return { type: userConstants.ADD_ADDRESS_FAILURE, error } }
}

function updateProfile (data) {
  return dispatch => {
    dispatch(request(data))
    userService.updateUser(data)
      .then(response => {
        if (response.status === 200) {
          // console.log(response)
          dispatch(success(response.data.data))
          if(sessionStorage.getItem("user_tmp")){
            sessionStorage.removeItem("user_tmp")
          }
        } else {
          dispatch(failure(response.data.data))
        }
      }, error => {
        dispatch(failure(error.toString))
        dispatch(error(error.toString()))
      })
  }

  function request (data) { return { type: userConstants.PROFILE_UPDATE_REQUEST, data } }
  function success (data) { return { type: userConstants.ME_SUCCESS, data } }
  function failure (error) { return { type: userConstants.PROFILE_UPDATE_FAILURE, error } }
}

// function getAll () {
//   return dispatch => {
//     dispatch(request())

//     userService.getAll()
//       .then(
//         users => dispatch(success(users)),
//         error => dispatch(failure(error.toString()))
//       )
//   }

//   function request () { return { type: userConstants.GETALL_REQUEST } }
//   function success (users) { return { type: userConstants.GETALL_SUCCESS, users } }
//   function failure (error) { return { type: userConstants.GETALL_FAILURE, error } }
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete (id) {
//   return dispatch => {
//     dispatch(request(id))

//     userService.delete(id)
//       .then(
//         user => dispatch(success(id)),
//         error => dispatch(failure(id, error.toString()))
//       )
//   }

//   function request (id) { return { type: userConstants.DELETE_REQUEST, id } }
//   function success (id) { return { type: userConstants.DELETE_SUCCESS, id } }
//   function failure (id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }
