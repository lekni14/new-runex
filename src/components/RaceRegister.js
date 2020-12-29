import React, { Component } from 'react'
import { eventService } from '../services'


const Race = React.lazy(() => import('./race/Register'));
const Visual = React.lazy(() => import('./visual/RaceProfile'));
function Register(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <Race />;
    }
    return <Visual/>;
}

export default class RaceRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
        };
    }
    componentDidMount() {
        this.getEvent()
    }
    getEvent() {
        const { slug } = this.props.match.params
        // const { eventID } = this.props.route.match.params

        eventService.getEventInfoBySlug(slug).then(res => {
            console.log(res)
            if (res.data.code === 200) {
                this.setState({
                    event: res.data.data.event
                })
            }
        })
    }
    render() {
        const { event } = this.state
        console.log(event)
        // if(event.event.category.name === 'Run'){
        //     history.push('/raceregister/'+eventID)
        // }else{
        //     history.push('/register/'+eventID)
        // }
        return (
            <Register isLoggedIn={false} />
        )
    }
}
