/* eslint-disable no-useless-escape */
//ModalComponent.js
import React, { useState } from 'react';

import { Nav, Form, NavDropdown, Image, Navbar } from 'react-bootstrap'

import { utils } from '../../utils/utils'
import popup from './popup.login'
// import { service } from '../services/service';
import { userService } from '../../services'


// const useToken = () => ({
//   access_token: useRecoilValue(accessToken),
//   user_info: useRecoilValue(userInfo),
//   setAccessToken: useSetRecoilState(setAccessToken),
//   setRefreshToken: useSetRecoilState(setRefreshToken),
//   reset: useResetRecoilState(delAccessToken)
// })

//const [accessToken, setAccessToken] = useRecoilState(accessToken)

export default function Signin (props){

  const [isLogin, setIsLogin] = useState(false)
  //const router = useRouter()
  const [user, setUser] = useState({})

  function handleShow() {

    const w = 600, h = 600


    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : '';
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : '';

    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)

    const systemZoom = width / window.screen.availWidth;
    // const left = (width - w) / 2 / systemZoom + dualScreenLeft
    // const top = (height - h) / 2 / systemZoom + dualScreenTop

    const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);

    const pop = popup.open(
      'runex-oauth-authorize',
      { height: 600, width: 600, top: y, left: x }
    );
    pop.then(
      data => onSuccess(data),
      error => onFailure(error)
    );

  }

  async function onSuccess(data) {
    if (!data.code) {
      return onFailure(new Error('\'code\' not found'));
    }
    const param = {
      "grant_type": "authorization_code",
      "code": data.code // from login callback querystring
    }

    // const response = await service.verifyCode(param)
    // if (response !== undefined && response !== null) {
    //   if (response.access_token !== null) {
    //     //useToken.setAccessToken
        
    //     utils.setToken(response.runex_access_token)
    //     utils.setRefreshToken(response.runex_refresh_token)
    //     getUser()
    //   }
    //   if (response.refresh_token !== null) {
    //     //setRefreshToken(response.refresh_token)
    //   }
    // }
    //this.props.onSuccess(data);
  }

  async function onFailure(error) {
    console.log(error)
  }

  async function getUser() {
    const response = await userService.getUser()
    if (response !== undefined && response !== null) {
      utils.setUser(response.data)
      setUser(response.data)
      setIsLogin(true)
      //setUserInfo(response.data)
    }
  }

  async function logout() {
    if (isLogin) {
      const response = await userService.logout()
      if (response !== undefined && response !== null) {
        if (response.code === 202) {
          utils.removeUser()
          utils.removeToken()
          utils.removeRefreshToken()
          setUser({})
          setIsLogin(false)
          //document.location.href = 'https://stackoverflow.com/';
          //console.log('logout')
          //router.push('/')
        }
        //setUserInfo(response.data)
      }
    }
  }

  return (
    <>
    <Nav.Link  onClick={handleShow} style={{ color: '#121314' }}>เข้าสู่ระบบ/ลงทะเบียน</Nav.Link>
      {/* <div>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
            <Nav.Link href="/my-event" hidden={!isLogin} style={{ color: '#121314' }} >รายการสมัคร</Nav.Link>
            <Nav.Link hidden={!utils.isEventer()} href="/homeowner" style={{ color: '#121314' }} >จัดการอีเว้นท์</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link hidden={isLogin} onClick={handleShow} style={{ color: '#121314' }} >เข้าสู่ระบบ/ลงทะเบียน</Nav.Link>
            <NavDropdown title={<div style={{ display: "inline-block", position: 'relative' }}>
              <Image style={{ width: 40, height: 40 }} src={user.avatar ? utils.getImageProfile(user.avatar) : user.avatar} onError={(e) => { e.target.onerror = null; e.target.src = iconuser }} roundedCircle />
            </div>} id="nav-dropdown" hidden={!utils.isLogin()}>
              <NavDropdown.Item href="/users/edit" eventKey="4.5">ข้อมูลส่วนตัว</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3" onClick={logout}>ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
          </Form>

        </Navbar.Collapse>

      </div> */}

    </>
  )

}