import { api } from "../utils/constants";
import { service } from "./service";

export async function getTambon(zipcode) {
    return service.call('GET', {}, `${api.TAMBON}${zipcode}`)
}

export async function getProvince(province) {
    return service.call('GET', {}, `${api.PROVINCE}${province}`)
}

export async function getAmphoe(amphoe) {
    return service.call('GET', {}, `${api.AMPHOE}${amphoe}`)
}

export async function getDistrict(district) {
    return service.call('GET', {}, `${api.DISTRICT}${district}`)
}

export async function getTambons() {
    return service.call('GET', {}, `${api.TAMBONS}`)
}