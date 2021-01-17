import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "react-datepicker/dist/react-datepicker.css";

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import './style/custom.css'
import {App} from './App'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga'
import { GA_ID } from './utils/constants'


function noop() {}

// console.log = noop;
console.warn = noop;
console.error = noop;

ReactGA.initialize(GA_ID)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
