import React, { Component } from "react";
import Script from "react-load-script";
import './Checkout.css'
import { Button } from "react-bootstrap";
let OmiseCard;

export class CheckoutCreditCard extends Component {
  handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      currency: "thb",
      frameLabel: "RUNEX",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise"
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: []
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { createCreditCardCharge , amount} = this.props
    OmiseCard.open({
      frameDescription: '',
      amount: amount*100,
      onCreateTokenSuccess: (token) => {
        
        createCreditCardCharge(amount*100, token)
      },
      onFormClosed: () => { },
    })
  }

  handleClick = e => {
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseCardHandler()
  };

  render () {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form>
          <Button variant="outline-primary"
            id="credit-card"
            className="btn"
            type="button"
            disabled={this.props.amount === 0}
            onClick={this.handleClick}
          >Pay with Credit Card</Button>
          {/* <button
            id="credit-card"
            className="btn"
            type="button"
            disabled={this.props.cart.amount === 0}
            onClick={this.handleClick}
          >
            Pay with Credit Card
          </button> */}
        </form>
      </div>
    );
  }
}

export default CheckoutCreditCard;
