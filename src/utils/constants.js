//export const API_URL = 'http://localhost:3006/api/v1'
//UAT
// export const API_URL = 'https://runexapi.farmme.in.th/api/v1'
// export const IMAGE_URL = 'https://runexapi.farmme.in.th'

//PD
export const API_URL = 'https://runex-api.thinkdev.app/api/v2'
export const IMAGE_URL = 'https://runex.co:3006'

export const HEADER = { headers: { 'Content-Type': 'application/json' } }
export const PF = 'web'
export const GA_ID = 'G-LC572RKD9Z'
//Omise test key = pkey_test_5i6ivm4cotoab601bfr
//Omise Production key = pkey_5i1p3nkjgq6vrrrfhkp
export const OMISE_PUBLIC_KEY = "pkey_5i1p3nkjgq6vrrrfhkp"

export const gaTracking = {
  PREVIEW_EVENT : 'PREVIEW_EVENT',
  START_REG_EVENT : 'START_REG_EVENT',
  END_REG_EVENT : 'END_REG_EVENT',
}

export const userConstants = {
  PROFILE_UPDATE_REQUEST: 'PROFILE_UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS: 'PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_FAILURE: 'PROFILE_UPDATE_FAILURE',

  ADD_ADDRESS_REQUEST: 'ADD_ADDRESS_REQUEST',
  ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',
  ADD_ADDRESS_FAILURE: 'ADD_ADDRESS_FAILURE',

  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  ME_REQUEST: 'USERS_GET_REQUEST',
  ME_SUCCESS: 'USERS_GET_SUCCESS',
  ME_FAILURE: 'USERS_GET_FAILURE',

  LOGOUT: 'USERS_LOGOUT',
  SHOW_LOGIN: 'SHOW_LOGIN',
  CLOSE_LOGIN: 'CLOSE_LOGIN',

  GETALL_REQUEST: 'USERS_GETALL_REQUEST',
  GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
  GETALL_FAILURE: 'USERS_GETALL_FAILURE',

  DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  DELETE_FAILURE: 'USERS_DELETE_FAILURE',

}

export const eventConstants = {
  SELECT_ADDRESS_REQUEST: 'SELECT_ADDRESS_REQUEST',
  SELECT_TICKET_REQUEST: 'SELECT_TICKET_REQUEST',
  SELECT_PRODUCT_REQUEST: 'SELECT_PRODUCT_REQUEST',
  SELECT_EVENT_REQUEST: 'SELECT_EVENT_REQUEST',

  REG_EVENT_REQUEST: 'REG_EVENT_REQUEST',
  REG_EVENT_SUCCESS: 'REG_EVENT_SUCCESS',
  REG_EVENT_FAIL: 'REG_EVENT_FAIL',

  PAYMENT_UPLOAD_SLIP_REQUEST: 'PAYMENT_UPLOAD_SLIP_REQUEST',
  PAYMENT_UPLOAD_SLIP_SUCCESS: 'PAYMENT_UPLOAD_SLIP_SUCCESS',
  PAYMENT_UPLOAD_SLIP_FAIL: 'PAYMENT_UPLOAD_SLIP_FAIL',
}

export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
  LOADING: 'ALERT_LOADING',
}

export const regStatusConstants = {
  PAYMENT_WAITING: 'PAYMENT_WAITING',
  PAYMENT_WAITING_APPROVE: 'PAYMENT_WAITING_APPROVE',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAIL: 'PAYMENT_FAIL',

  PAYMENT_TRANSFER: 'PAYMENT_TRANSFER',
  PAYMENT_CREDIT_CARD: 'PAYMENT_CREDIT_CARD',
  PAYMENT_ONLINE_BANKING: 'PAYMENT_ONLINE_BANKING',
  PAYMENT_QRCODE: 'PAYMENT_QRCODE',
  PAYMENT_FREE: 'PAYMENT_FREE',
}

export const api = {
  REFRESH_TOKEN: '/v2/refreshAccessToken',
  GET_USER: '/v2/user',
  UPDATE_USER: '/v2/user',
  LOGOUT: '/v2/logout',

  STRAVA_ACTIVITIES: '/v2/strava/activities',

  EVENTS_ACTIVE: '/v2/event/active',
  EVENT_INFO: '/v2/event/detail',
  EVENT_INFO_BY_SLUG: '/v2/event/getBySlug',
  EVENT_CREATE: '/v2/event',
  EVENT_UPDATE: '/v2/event/edit',
  CATEGORY_ALL: '/v1/category/all',
  MYEVENT: '/v2/event/myEvent',

  REGISTER: '/v2/register/add',

  ACTIVITY_ADD: '/v2/activity/add',
  ACTIVITY_INFO: '/v2/activity/getByEvent2/',

  TAMBONS: '/v2/tambons',
  TAMBON: '/v2/tambon/',
  PROVINCE: '/v2/province/',
  AMPHOE: '/v2/amphoe/',
  DISTRICT: '/v2/district/',

  USERUPDATE: '/v1/user',
  UPlOAD_IMAGECOVER: '/v2/uploadCover',

  MYREG_EVENT: '/v2/register/myRegEvent',
}

export const category = {
  VR: 'VR',
  ER: 'ER',
}