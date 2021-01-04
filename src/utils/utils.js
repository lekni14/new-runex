import moment from "moment";
import { IMAGE_URL } from "./constants";
import Cookies from 'js-cookie'

export class utils {
    static getStatusKey(status){
        if(status === "Publish"){
            return "5d453e2a1e79ab8688d1bd1b";
        }else if(status === "Unpublish"){
            return "5d453e2f1e79ab8688d1bd1c";
        }else if(status === "Hidden"){
            return "5d453e351e79ab8688d1bd1d";
        }else{
            return "";
        }
    }

    static setUser(data){
        console.log(data)
        Cookies.set('user', JSON.stringify(data))
    }

    static setToken(token){
        console.log(token)
        Cookies.set('token', token)
    }

    static getUser(){
        return Cookies.get('user')
    }

    static getToken(){
        console.log(Cookies.get('token'))
        return Cookies.get('token')
    }

    static removeUser(){
        Cookies.remove('user')
    }

    static removeToken(){
        Cookies.remove('token')
    }

    static dateNow(){
        return moment().toISOString(true)
    }

    static dateFromApi(dated){
        if (dated === '' || dated === '0001-01-01T00:00:00Z') {
            return moment().toDate()
        }
        return moment(dated).utc().toDate()
    }

    static convertDateToApi(dated){
        return moment(dated).utc().toISOString(true)
        //"2019-09-17T14:05:29.526Z"
    }

    static convertDateApiToMMMM_DD_YYYY(dated){
        if (dated === '') {
            return ''
        }
        return moment(dated).utc().format('MMMM DD, YYYY')
        //"2019-09-17T14:05:29.526Z"
    }

    static convertDateApiToString(dated, format){
        if (dated === '' || dated === '0001-01-01T00:00:00Z') {
            return ''
        }
        if(format !== null && format !== undefined){
            return moment(dated).utcOffset(420).format(format)
        }
        return moment(dated).utcOffset(420).format('DD-MM-YYYY')
        //"2019-09-17T14:05:29.526Z"
    }

    static convertDateTimeToDay(dated){
        if (dated === '') {
            return ''
        }
        //var gmtDateTime = moment.utc(dated, "YYYY-MM-DD HH")
        var local = moment(dated).utc().format('DD');
        return local
        // return moment(dated).format('DD')
        //"2019-09-17T14:05:29.526Z"
    }

    static convertDateTimeToMonth(dated){
        if (dated === '') {
            return ''
        }
        //var local = gmtDateTime.local().format('MMM');
        return moment(dated).utc().format('MMM')
        //return moment(dated).format('MMM')
        //"2019-09-17T14:05:29.526Z"
    }

    static convertDateTimeToDate(dated){
        if (dated === '') {
            return ''
        }
        return moment(dated).utc().format('DD MMM (HH:mm)')
    }

    static isAfterDate(dated){
        if (dated === '') {
            return false
        }
        // console.log(moment().isAfter(dated))
        //return moment(dated).format('MMMM DD, YYYY')
        return moment().utc().isAfter(dated)
    }

    static getImageProfile(path){
        if (path.includes('http')){
            return path
        }
        return IMAGE_URL+path
    }

    static combineDateTimeUpload(date, time) {
        if ((date === '') || (time === '')) {
            return ''
        }

        const dateFormat = moment(date).utc('Asia/Bangkok').format('YYYY-MM-DD')
        const timeFormat = moment(time).utc('Asia/Bangkok').format('HH:mm:ss')

        // return moment(`${dateFormat} ${timeFormat}`).format('YYYY-MM-DDTHH:mm:ss.sss\\Z')
        return moment(`${dateFormat} ${timeFormat}`).utc('Asia/Bangkok').toISOString()
    }

    static isImageUrl(data) {
        
        if (!data) {
            return false
        }

        const prefixPattern = /\/upload\/image\/event\/.+\..+/g;
        const isImageUrl = prefixPattern.test(data)

        return isImageUrl
    }
}