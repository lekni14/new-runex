/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Navbar, Image } from 'react-bootstrap'
//import logo from '../images/runex-logo.png'
import logo from '../images/logo-runex.png'
// import { Signin } from './auth'
import { userActions } from '../actions'
import { connect } from 'react-redux';
import { history } from '../store'
import iconuser from '../images/icon-user.svg'
import { userService } from '../services'
import { utils } from '../utils/utils'

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      navbarcollapse:false
    }
  }
  componentDidMount () {
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
    }else{
      this.setState({ navbarcollapse: false })
    }
    // this.setState({hideNav: window.innerWidth < 768});
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.loggingIn) {
      this.setState({ isShow: !nextProps.loggingIn })
    }
    if (nextProps.user){
      this.setState({user:JSON.parse(utils.getUser())})
    }
  }
  logout =(e)=> {
    e.preventDefault();
    //dispatch(logout())
    //userActions.logout()
    userService.logout().then(res=>{
      if (res.status === 200) {
        window.location.reload()
      }
    })
    
    //this.props.logout()
  }
  render () {
    const { user } = this.state
    console.log(user)
    console.log(user.email)
    const classnone = this.state.navbarcollapse ? "collapse navbar-collapse" : "collapse"
    return (
      
      <header id="header" className="shadow-sm p-1 bg-white rounded" hidden={history.location.pathname === '/login'}>       
        {/* <div className="shadow-sm p-1 mb-3 bg-white rounded"> */}
        <Navbar bg="white" variant="light" bg="white" expand="md" style={{ minHeight: '80' }}>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="48"
              className="d-inline-block align-top"
              alt="Runex logo"
            />
          </Navbar.Brand>
          {/* <Navbar.Collapse className="justify-content-end"> */}

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
                {/* <Link to="/" onClick={() => this.logout.bind(this)} className="navbar-item">ออกจากระบบ</Link> */}
                <a className="nav-link" onClick={this.logout.bind()} href='#'>ออกจากระบบ</a>
              </li>
            </ul>
          </div>
          {/* <Navbar.Collapse id="basic-navbar-nav" className="d-lg-none d-md-none">
            <Nav className="mr-auto">
              <Nav.Link href="#event">MY EVENT</Nav.Link>
              <Nav.Link href="#link" hidden={user !== undefined ? (user.role !== 'MEMBER' ? false : true) : true}>CREATE EVENT</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}

          {/* <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav"> */}
            {/* <Nav> */}
              {/* <Signin /> */}
            {/* </Nav>*/}
          {/* </Navbar.Collapse> */}
        </Navbar> 


        {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
      </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        {/* </div> */}
      </header>
    )
  }
}

function mapState (state) {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
}

const mapDispatchToProps =  (dispatch) => ({
  login: userActions.login,
  logout: () => dispatch(userActions.logout),
});

const actionCreators = (dispatch)=> {
  return {
    login: userActions.login,
    logout: userActions.logout,
  }
};

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };
