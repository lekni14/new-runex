import { eventConstants } from '../utils/constants'

export function eventer (state = {}, action) {
  switch (action.type) {
    case eventConstants.SELECT_ADDRESS_REQUEST:
      return { address: action.address }
    case eventConstants.SELECT_PRODUCT_REQUEST:
      return { product: action.products }
    case eventConstants.SELECT_TICKET_REQUEST:
      return { ticket: action.tickets }
    case eventConstants.SELECT_EVENT_REQUEST:
      return { events: action.events }
    case eventConstants.REG_EVENT_REQUEST:
      return {}
    case eventConstants.REG_EVENT_SUCCESS:
      return { regEvent: action.data }
    case eventConstants.REG_EVENT_FAIL:
      return {}
    case eventConstants.PAYMENT_UPLOAD_SLIP_REQUEST:
      return {}
    case eventConstants.PAYMENT_UPLOAD_SLIP_SUCCESS:
      return { upSlip: action.data }
    case eventConstants.PAYMENT_UPLOAD_SLIP_FAIL:
      return {}
    default:
      return state
  }
}