/* eslint-disable no-useless-escape */
//ModalComponent.js
import React from 'react';

import { Form, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import iconuser from '../../images/icon-user.svg'
import { utils } from '../../utils/utils'
// import { service } from '../services/service';
import { userService } from '../../services'
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../lib/recoil-atoms';


// const useToken = () => ({
//   access_token: useRecoilValue(accessToken),
//   user_info: useRecoilValue(userInfo),
//   setAccessToken: useSetRecoilState(setAccessToken),
//   setRefreshToken: useSetRecoilState(setRefreshToken),
//   reset: useResetRecoilState(delAccessToken)
// })

//const [accessToken, setAccessToken] = useRecoilState(accessToken)

export default function Signin(props) {
  //const router = useRouter()
  const user = useRecoilValue(userInfo)

  function showLogin() {
    window.location.href = `${process.env.REACT_APP_AUTH_URL}&returnUri=${process.env.REACT_APP_AUTH_REDIRECT}`
  }

  // async function onSuccess(data) {
  //   if (!data.code) {
  //     return onFailure(new Error('\'code\' not found'));
  //   }
  //   const param = {
  //     "grant_type": "authorization_code",
  //     "code": data.code // from login callback querystring
  //   }

  //   console.log(param)
  //   //this.props.onSuccess(data);
  // }

  // async function onFailure(error) {
  //   console.log(error)
  // }

  // async function getUser() {
  //   const response = await userService.getUser()
  //   if (response !== undefined && response !== null) {
  //     utils.setUser(response.data)
  //     setUser(response.data)
  //     setIsLogin(true)
  //     //setUserInfo(response.data)
  //   }
  // }

  async function logout() {
    if (utils.isLogin()) {
      const response = await userService.logout()
      if (response !== undefined && response !== null) {
        if (response.code === 202) {
          utils.removeUser()
          utils.removeToken()
          utils.removeRefreshToken()
          // setUser({})
          // setIsLogin(false)
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
      {/* <Nav.Link onClick={showLogin} style={{ color: '#121314' }}>เข้าสู่ระบบ/ลงทะเบียน</Nav.Link> */}
      <div>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
            <Nav.Link href="/" hidden={!utils.isLogin()} style={{ color: '#121314' }} >รายการสมัคร</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link hidden={utils.isLogin()} onClick={showLogin} style={{ color: '#121314' }} >เข้าสู่ระบบ/ลงทะเบียน</Nav.Link>
            <NavDropdown title={<div style={{ display: "inline-block", position: 'relative' }}>
              <Image style={{ width: 40, height: 40 }} src={user.avatar ? utils.getImageProfile(user.avatar) : user.avatar} onError={(e) => { e.target.onerror = null; e.target.src = iconuser }} roundedCircle />
            </div>} id="nav-dropdown" hidden={!utils.isLogin()}>
              <NavDropdown.Item href="/users/edit" eventKey="4.5">ข้อมูลส่วนตัว</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3" onClick={logout}>ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
          </Form>

        </Navbar.Collapse>

      </div>

    </>
  )

}