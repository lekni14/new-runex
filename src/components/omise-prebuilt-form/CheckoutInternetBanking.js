import React, { Component } from "react";
import Script from "react-load-script";
import "./Checkout.css";
import { Button } from "react-bootstrap";

let OmiseCard;

export class CheckoutInternetBanking extends Component {
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

  internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        "bill_payment_tesco_lotus",
        "alipay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    });
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { amount, createInternetBankingCharge} = this.props;
    OmiseCard.open({
      frameDescription: "",
      amount: amount * 100,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(amount*100, token)
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.internetBankingConfigure();
    this.omiseCardHandler();
  };
  render() {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form>
        <Button variant="outline-info"
            id="internet-banking"
            className="btn internet-banking"
            type="button"
            disabled={this.props.cart.amount === 0}
            onClick={this.handleClick}
          >Pay with Internet Banking / Others</Button>
        
          {/* <button
            id="internet-banking"
            className="btn internet-banking"
            type="button"
            disabled={this.props.cart.amount === 0}
            onClick={this.handleClick}
          >
            Pay with Internet Banking / Others
          </button> */}
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
