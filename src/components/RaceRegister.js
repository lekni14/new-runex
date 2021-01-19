import React, { Component } from 'react'
import { eventService } from '../services'
// import { category } from '../utils/constants';


export default class RaceRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            tickets: [],
            products: [],
        };
    }
    componentDidMount() {
        this.getEvent()
    }
    async getEvent() {
        const { code } = this.props.match.params

        await eventService.getDetail(code).then(res => {
            if (res.code === 200) {
                const { event, tickets } = res.data
                    
                this.setState({
                    event: event
                })
                this.setState({
                    tickets: tickets
                })
               
            }
        })
    }
    render() {
        const { event, tickets, products } = this.state 
        // if(event.event.category.name === 'Run'){
        //     history.push('/raceregister/'+eventID)
        // }else{
        //     history.push('/register/'+eventID)
        // }
        return (
            <Register event={event} tickets={tickets} products={products} />
        )
    }
}
// const Race = React.lazy(() => import('./race/Register'));
const Visual = React.lazy(() => import('./regrace/RaceProfile'));
function Register(props) {
    const {event, tickets, products} = props
    // const {category} = (props.event)?props.event.category:null;
    // console.log(event)
    // if (event.category !== category.VR) {
    //     return <Race event={event} tickets={tickets} products={products} />;
    // }else {
        return <Visual event={event} tickets={tickets} products={products}/>;
    // }
}