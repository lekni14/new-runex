import React from 'react'
import { Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import { utils } from '../utils/utils'

const auth = (path)=>{
  console.log(path)
  Cookies.set('path', path)
  window.location.href = `${process.env.REACT_APP_AUTH_URL}&returnUri=${process.env.REACT_APP_AUTH_REDIRECT}`
}

const PrvateRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={props => ((!utils.isLogin() ? auth(props.location.pathname) : (<C {...props} {...cProps} />)))} />
)

export default PrvateRoute