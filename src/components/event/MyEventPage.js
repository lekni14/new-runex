import { useState, useEffect } from 'react'
import { regEventService } from '../../services/regevent.service';
import MyEvent from '../users/MyEvent'

// export async function getServerSideProps() {
//     const res = await regEventService.myRegEvents()
//     console.log(res)
//     if (res.code === 200) {
//         return {
//             props: { eventProp: res.data }
//         }
//     } else {
//         return {
//             props: { eventProp: {} }
//         }
//     }
// }
const MyEventPage = () => {
    const [event, setEvent] = useState()
    useEffect(() => {
        getEvent()
    }, [])
    const getEvent = () => {
        const res = regEventService.myRegEvents()
        console.log(res)
        if (res !== undefined && res !== null) {
            if (res.code === 200) {
                setEvent(res.data.regs)
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