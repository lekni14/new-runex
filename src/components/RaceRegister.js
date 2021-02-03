import React, { Component } from 'react'
import { eventService } from '../services'
// import { category } from '../utils/constants';


export default class RaceRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {}
        };
    }
    componentDidMount() {
        this.getEvent()
    }
    async getEvent() {
        const { code } = this.props.match.params

        await eventService.getDetail(code).then(res => {
            if (res.code === 200) {
                this.setState({
                    event: res.data
                })               
            }
        })
    }
    render() {
        const { event} = this.state 
        return (
            <Register event={event} />
        )
    }
}
// const Race = React.lazy(() => import('./race/Register'));
const Visual = React.lazy(() => import('./regrace/RaceProfile'));
function Register(props) {
    const {event} = props
    return <Visual event={event}/>;
}