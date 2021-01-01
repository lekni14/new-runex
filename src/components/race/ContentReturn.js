import React from 'react'

import Address from './Address'
import Race from './Race'
import { eventActions } from '../../actions'
import { connect } from 'react-redux';
import { ConfirmReturn } from './ConfirmReturn';

class ContentReturn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 'Select gender',
            distant: 'Select distant',
            current:2,
            products:[],
            tickets:[],
            address:{}
        };
    }
    onClickTap = (index) => {      
        this.setState({ current: index })
        this.props.onTabChange(index)
        //this.props.changeTab(data)
    }

    handleAddress=(address)=>{
        this.setState({address:address})
        this.props.address(address)
    }

    handleOrder=(products, tickets)=>{
        // this.setState({products:products})
        // this.setState({tickets:tickets})
        // this.props.product(products)
        // this.props.ticket(tickets)
        // const data = {
        //     events : this.props.event,
        //     tickets : tickets,
        //     products : products,
        //     address : this.state.address
        // }
        // this.props.events(data)
    }

    render () {
        const { current } = this.state
        const { event } = this.props
        console.log(event)
        return (
            <div>
                {current === 0 ?
                    <Address handleClickChange={this.onClickTap} event={this.props.event} handleAddress={this.handleAddress}></Address>
                    : null}
                {current === 1 ?
                    <Race handleClickChange={this.onClickTap} event={this.props.event} handleOrder={this.handleOrder}></Race>
                    : null
                }
                {
                    current === 2 ? <ConfirmReturn handleClickChange={this.onClickTap} collapse={this.props.collapse} events={event} event={event}></ConfirmReturn> : null
                }
            </div >
        );
    }
}

function mapState (state) {
    const { address, product, ticket, events } = state.eventer;
    return { address, product, ticket, events };
  }
  
  const actionCreators = {
    address: eventActions.selectedAddress,
    product: eventActions.selectedProducts,
    ticket: eventActions.selectedTicket,
    events: eventActions.selectedEvent,
  };
  
  const connectedContent = connect(mapState, actionCreators)(ContentReturn);
  export { connectedContent as ContentReturn }