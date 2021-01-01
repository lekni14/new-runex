import React from 'react'

// import Address from './Address'
// import Race from './Race'
import Address from '../race/Address'
import Race from '../race/Race'
import {Confirm} from '../race/Confirm'
import { eventActions } from '../../actions'
import { connect } from 'react-redux';
// import { Confirm } from '.'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 'Select gender',
            distant: 'Select distant',
            current:0,
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
        // this.props.address(address)
    }

    handleOrder=(products, tickets)=>{
        this.setState({products:products})
        this.setState({tickets:tickets})
        // this.props.products(products)
        // this.props.tickets(tickets)
        const data = {
            events : this.props.event,
            tickets : tickets,
            products : products,
            address : this.state.address
        }
        console.log(data)
        // this.props.events(data)
    }

    render () {
        const { current, tickets } = this.state
        console.log(this.props)
        return (
            <div>
                {current === 0 ?
                    <Address handleClickChange={this.onClickTap} event={this.props.event} tickets={this.props.tickets} products={this.props.products} handleAddress={this.handleAddress}></Address>
                    : null}
                {current === 1 ?
                    <Race handleClickChange={this.onClickTap} event={this.props.event} tickets={this.props.tickets} products={this.props.products} handleOrder={this.handleOrder}></Race>
                    : null
                }
                {
                    current === 2 ? <Confirm handleClickChange={this.onClickTap} collapse={this.props.collapse} event={this.props.event} tickets={this.props.tickets} products={this.props.products} products={this.state.products} tickets={tickets}></Confirm> : null
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
  export default Content
//   const connectedContent = connect(mapState, actionCreators)(Content);
//   export { connectedContent as Content }