/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Navbar, Image, Nav, NavDropdown } from 'react-bootstrap'
//import logo from '../images/runex-logo.png'
import logo from '../images/logo-runex.png'
import { history } from '../store'
import iconuser from '../images/icon-user.svg'
import { userService } from '../services'
import { utils } from '../utils/utils'

import Signin from '../components/auth/signin'

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      navbarcollapse: false
    }
  }
  componentDidMount() {
    // if (utils.getUser() != null) {
    //   this.setState({ user: JSON.parse(utils.getUser()) })
    // }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  ChangeCollapse = (param) => {
    this.setState({ navbarcollapse: param })
  }
  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav) {
      this.setState({ navbarcollapse: true })
    } else {
      this.setState({ navbarcollapse: false })
    }
    // this.setState({hideNav: window.innerWidth < 768});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggingIn) {
      this.setState({ isShow: !nextProps.loggingIn })
    }
    if (nextProps.user) {
      this.setState({ user: JSON.parse(utils.getUser()) })
    }
  }
  logout = (e) => {
    e.preventDefault();
    //dispatch(logout())
    //userActions.logout()
    userService.logout().then(res => {
      if (res.status === 200) {
        window.location.reload()
      }
    })

    //this.props.logout()
  }
  render() {
    const { user } = this.state
    const classnone = this.state.navbarcollapse ? "collapse navbar-collapse" : "collapse"
    return (

      <header id="header" className="shadow-sm p-1 bg-white rounded" hidden={history.location.pathname === '/login'}>
        <Navbar bg="white" variant="light" expand="md" style={{ minHeight: '80' }} className="container-fluid">
          {/* <div className="col-md-10 col-12 offset-md-1"> */}
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="48"
              className="d-inline-block align-top"
              alt="Runex logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Signin />
            {/* <Nav.Link href="login" style={{ color: '#121314' }}>เข้าสู่ระบบ/ลงทะเบียน</Nav.Link> */}
            {/* <Nav.Link onClick={this.handleShow} style={{ color: '#121314' }} >เข้าสู่ระบบ/ลงทะเบียน</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>*/}
          </Navbar.Collapse>
          {/* </div> */}

        </Navbar>
        {/* <Navbar bg="white" variant="light" bg="white" expand="md" style={{ minHeight: '80' }}>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="48"
              className="d-inline-block align-top"
              alt="Runex logo"
            />
          </Navbar.Brand>
      

          <Navbar.Toggle aria-controls="responsive-navbar-nav" hidden={(user.email === undefined) ? false : true} />
          <button  onClick={() => this.ChangeCollapse(true)}   hidden={(user.email !== undefined) ? false : true}   className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
            <Image  className="" style={{ width: 40, height: 40 }} src={user.avatar} onError={(e) => { e.target.onerror = null; e.target.src = iconuser }} roundedCircle />
          </button> 
          <div className={classnone} id="basic-navbar-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/my-event">รายการสมัคร</a>
              </li>
              <li className="nav-item" hidden={user !== undefined ? (user.role !== 'MEMBER' ? false : true) : true}>
                <a className="nav-link" href="/homeowner">จัดการอีเว้นท์</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/users/edit">ข้อมูลส่วนตัว</a>
              </li>
              <li className="nav-item">
                
                <a className="nav-link" onClick={this.logout.bind()} href='#'>ออกจากระบบ</a>
              </li>
            </ul>
          </div> */}

        {/* </Navbar>  */}



      </header >
    )
  }
}
