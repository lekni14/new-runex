import { api } from '../utils/constants'
import { service } from './service'

export const activtyService = {
    addActivity,
    getActivityInfo,
}

async function addActivity(data) {
    return service.call('POST', data, api.ACTIVITY_ADD)
}

async function getActivityInfo(id) {
    return service.call('GET', {}, `${api.ACTIVITY_INFO}/${id}`)
}