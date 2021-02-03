import { useState, useEffect } from 'react'
import { regEventService } from '../../services/regevent.service';
import MyEvent from '../users/MyEvent'

const MyEventPage = () => {
    const [event, setEvent] = useState()
    useEffect(() => {
        getEvent()
    }, [])
    const getEvent = async () => {
        const res = await regEventService.myRegEvents()
        if (res !== undefined && res !== null) {
            console.log(res)
            if (res.code === 200) {
                setEvent(res.data)
            } 
        }
    } 
    // console.log(event)
    return (
        <>
            <MyEvent event={event}/>
        </>
    )
}

export default MyEventPage