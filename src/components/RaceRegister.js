import React, { Component } from 'react'
import { eventService } from '../services'


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
    getEvent() {
        const { slug } = this.props.match.params
        console.log(slug)
        // const { eventID } = this.props.route.match.params

        eventService.getDetail(slug).then(res => {
            console.log(res)
            if (res.status === 200) {
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
        console.log(tickets)
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
const Race = React.lazy(() => import('./race/Register'));
const Visual = React.lazy(() => import('./visual/RaceProfile'));
function Register(props) {
    const {event, tickets, products} = props
    // const {category} = (props.event)?props.event.category:null;
    console.log(event)
    // if (event.category!=="Virtual Run") {
    //     return <Race event={props.event} tickets={props.tickets} products={props.products} />;
    // }
    return <Visual event={event} tickets={tickets} products={products}/>;
}