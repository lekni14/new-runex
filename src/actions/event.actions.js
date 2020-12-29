import { eventConstants } from '../utils/constants'
import { eventService } from '../services'
import { history } from '../store'
import Swal from 'sweetalert2'

export const eventActions = {
  selectedProducts,
  selectedTicket,
  selectedAddress,
  selectedEvent,
  regEvent,
  regEventByPaypal
}

function selectedProducts (products) {
  return { type: eventConstants.SELECT_PRODUCT_REQUEST, products }
}

function selectedTicket (tickets) {
  return { type: eventConstants.SELECT_TICKET_REQUEST, tickets }
}

function selectedAddress (address) {
  return { type: eventConstants.SELECT_ADDRESS_REQUEST, address }
}

function selectedEvent (events) {
  return { type: eventConstants.SELECT_EVENT_REQUEST, events }
}

function regEvent (data) {
  return dispatch => {
    dispatch(request(data))
    Swal.fire({
      title: 'กำลังส่งข้อมูล',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        eventService.regEvent(data)
          .then(response => {
            Swal.close()
            if (response.status === 200) {
              if (data.image !== '') {
                const params = {
                  amount: data.total_price,
                  image: data.image,
                }
                dispatch(sendSlip(response.data.data.id, params))
              }
              history.push('/payment-success')
              sessionStorage.removeItem('user_tmp')
              dispatch(success(response.data.data))
            } else {
              dispatch(failure())
            }
          }, error => {
            Swal.close()
            dispatch(failure(error.toString))
            dispatch(error(error.toString()))
          })
      }
    })
  }

  function request (data) { return { type: eventConstants.REG_EVENT_REQUEST, data } }
  function success (data) { return { type: eventConstants.REG_EVENT_SUCCESS, data } }
  function failure (error) { return { type: eventConstants.REG_EVENT_FAIL, error } }
}

function updateRegEvent (data) {
  return dispatch => {
    dispatch(request(data))
    eventService.regEvent(data)
      .then(response => {
        if (response.status === 200) {
          if (data.image !== '') {
            const params = {
              amount: data.total_price,
              image: data.image,
            }
            dispatch(sendSlip(response.data.data.id, params))
          }
          history.push('/payment-success')
          sessionStorage.removeItem('user_tmp')
          dispatch(success(response.data.data))
        } else {
          dispatch(failure(response.data.data))
        }
      }, error => {
        dispatch(failure(error.toString))
        dispatch(error(error.toString()))
      })
  }

  function request (data) { return { type: eventConstants.REG_EVENT_REQUEST, data } }
  function success (data) { return { type: eventConstants.REG_EVENT_SUCCESS, data } }
  function failure (error) { return { type: eventConstants.REG_EVENT_FAIL, error } }
}

function regEventByPaypal (data, params) {
  return dispatch => {
    dispatch(request(data))
    Swal.fire({
      title: 'กำลังส่งข้อมูล',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        eventService.regEvent(data)
      .then(response => {
        Swal.close()
        if (response.status === 200) {
          if (data.image !== '') {
            // const params = {
            //   amount: data.total_price,
            //   image: data.image,
            // }
            //dispatch(sendSlip(response.data.data.id, params))

          }
          history.push('/payment-success')
          sessionStorage.removeItem('user_tmp')
          dispatch(success(response.data.data))
        } else {
          dispatch(failure())
        }
      }, error => {
        Swal.close()
        dispatch(failure(error.toString))
        dispatch(error(error.toString()))
      })
      }
    })
  }

  function request (data) { return { type: eventConstants.REG_EVENT_REQUEST, data } }
  function success (data) { return { type: eventConstants.REG_EVENT_SUCCESS, data } }
  function failure (error) { return { type: eventConstants.REG_EVENT_FAIL, error } }
}

function sendSlip (id, data) {
  return dispatch => {
    dispatch(request(data))
    eventService.sendSlip(id, data)
      .then(response => {
        if (response.status === 200) {
          //dispatch(success(response.data.data))
        } else {
          //dispatch(failure(response.data.data))
        }
      }, error => {
        //dispatch(failure(error.toString))
        //dispatch(error(error.toString()))
      })
  }

  function request () { return { type: eventConstants.PAYMENT_UPLOAD_SLIP_REQUEST } }
  function success (data) { return { type: eventConstants.PAYMENT_UPLOAD_SLIP_SUCCESS, data } }
  function failure (error) { return { type: eventConstants.PAYMENT_UPLOAD_SLIP_FAIL, error } }
}