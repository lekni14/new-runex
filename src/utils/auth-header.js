/* eslint-disable no-undef */

import { utils } from "./utils"

/* eslint-disable semi */
export function authHeader() {
  // return authorization header with jwt token
  //const user = JSON.parse(localStorage.getItem('user'))
  const token = utils.getToken()

  if (token) {
    return "Bearer " + token
  } else {
    return ""
  }
}

export const headers = {
  //"Access-Control-Allow-Origin": "*",
  //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
  //'Access-Control-Allow-Credentials': 'true',
  //"Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
  'Content-Type': 'application/json',
  'Authorization' : "Bearer " + utils.getToken()
}
