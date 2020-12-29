import { userConstants } from '../utils/constants'
import { utils } from '../utils/utils'

const token = utils.getToken()
const user = utils.getUser()
const initialState = token ? { loggingIn: true, token: token, user: user } : {}

export function authentication (state = initialState, action) {
  console.log(token)
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: false,
        token: action.data,
        isShowLogin: false
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        token: action.data,
        isShowLogin: false
      }
    case userConstants.LOGIN_FAILURE:
      return {
      }
    case userConstants.LOGOUT:
      return {
        loggingIn: false,
        isShowLogin: false
      }
    case userConstants.SHOW_LOGIN:
      return {
        loggingIn: false,
        isShowLogin: true
      }
    case userConstants.CLOSE_LOGIN:
      return {
        loggingIn: false,
        isShowLogin: false
      }
    case userConstants.ME_REQUEST:
      return {
      }
    case userConstants.ME_FAILURE:
      return {
      }
    case userConstants.ME_SUCCESS:
      return {
        loggingIn: true,
        user: action.data,
        showLogin: false
      }
    case userConstants.PROFILE_UPDATE_REQUEST:
      return {
      }
    case userConstants.PROFILE_UPDATE_FAILURE:
      return {
      }
    case userConstants.PROFILE_UPDATE_SUCCESS:
      return {
        user: action.data
      }
    default:
      return state
  }
}

// export function alert (state = {}, action) {
//   switch (action.type) {
//     case alertConstants.SUCCESS:
//       return {
//         type: 'alert-success',
//         message: action.message
//       }
//     case alertConstants.ERROR:
//       return {
//         type: 'alert-danger',
//         message: action.message
//       }
//     case alertConstants.CLEAR:
//       return {}
//     default:
//       return state
//   }
// }
