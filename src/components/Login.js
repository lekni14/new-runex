import React, { Component } from 'react'


import logo from '../images/logo-runex.png'
import { Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap'

import iconpassword from '../images/icon-password.svg'
import iconmail from '../images/icon-mail.svg'
// import FacebookBtn from './FacebookBtn'
// import GoogleBtn from './GoogleBtn'
import { Link } from 'react-router-dom'
import { PF } from '../utils/constants'
// import { connect } from 'react-redux';
// import { userActions } from '../../actions'
import { history } from '../store'
import GoogleBtn from './auth/google.btn'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: '',
            currentUser: null,
            loading: false
        }
    }
    responseFacebook = (data) => {
        this.signupProvider(data)
    }

    responseGoogle = (data) => {
        this.signupProvider(data)
    }

    signin = () => {
        console.log('signin')
        const { email, password } = this.state;
        if (email && password) {
            const data = {
                email: email,
                password: password,
                pf: PF
            }
            this.props.login(data)
            this.setState({ validated: false });
        }
    }

    onChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    render() {
        const { validated } = this.state

        const handleValidate = event => {

            const form = event.currentTarget;
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                this.signin()
            }
            this.setState({ validated: true });

        };
        return (
            <div className="container mt-5" hidden={this.state.loading}>
                <div className="row justify-content-center">
                    <div className="col-5">
                    <div class="section-login">
        <div>
            <h1>เข้าสู่ระบบ</h1> 
            <img class="logo" src="data:image/png;base64,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" alt=""/>
            <div class="wrap-section">
                <button class="btn-login" onclick="location.href='/auth/facebook'"> 
                    <img src="ic-facebook.svg" alt="" class="icon-btn"/>
                    Continue with Facebook
                </button>
                <button class="btn-login" onclick="location.href='/auth/google'"> 
                    <img src="ic-google.svg" alt="" class="icon-btn"/>
                    Continue with Google
                </button>
                <button class="btn-login" onclick="location.href='/apple/authen'"> 
                    <img src="ic-apple.svg" alt="" class="icon-btn"/>
                    Continue with Apple
                </button>
            </div>
          
        </div>
    </div>
                        <div className="card card-signin mt-5">
                            {/* <div className="card-header text-center pt-4">
                                <img className="card-logo mb-2" src={logo} alt="" />
                            </div> */}
                            <div className="card-body ">
                                {/* <h5 className="card-title mb-3">Login</h5> */}
                                <Container className="px-5">
                                    <Row className="show-grid text-center">
                                        <Col xs={12} >
                                            <img className="card-logo my-3" src={logo} alt="" />
                                            {/* <GoogleBtn callGoogle={this.responseGoogle}></GoogleBtn>
                                            <FacebookBtn callFacebook={this.responseFacebook}></FacebookBtn> */}
                                        </Col>
                                    </Row>
                                    {/* <div className="border-bottom my-3 row"><div className="col-12"></div></div> */}
                                    <Row>
                                        <Col>
                                            <Form noValidate validated={validated} onSubmit={handleValidate}>
                                                <GoogleBtn/>
                                                {/* <Form.Group  controlId="emailLogin">
                                                    <Form.Label>อีเมล์,Email<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={this.state.firstname}
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                        placeholder="Email"
                                                        onChange={this.onChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group  controlId="emailLogin">
                                                    <Form.Label>รหัสผ่าน,Password<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Password"
                                                        aria-describedby="inputGroupPrepend"
                                                        name="password"
                                                        onChange={this.onChange}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                                                </Form.Group> */}


                                                {/* <Button className="btn-custom rounded-pill" block type='submit'>Sign in</Button>
                                                <Button variant="secondary" className="rounded-pill" block onClick={() => history.push('/signup')}>สมัครสมาชิก</Button>
                                                <Link className="btn btn-link btn-block" to="/users/reset-password">ลืมรหัสผ่าน</Link> */}
                                                {/* <Button variant="link" block>ลืมรหัสผ่าน</Button> */}
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mt-2">
                    <div className="col">
                        <p className="text-center">Power by Think</p>
                    </div>
                </div>
            </div>
        )
    }
}