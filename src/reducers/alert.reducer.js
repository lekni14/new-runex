import { alertConstants } from '../utils/constants'

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
        isLoading: false 
      }
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
        isLoading: false 
      }
    case alertConstants.CLEAR:
      return { isLoading: false }
    case alertConstants.LOADING:
        return { isLoading: true }
    default:
      return state
  }
}
