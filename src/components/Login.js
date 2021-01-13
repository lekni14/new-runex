import React, { Component } from 'react'
import logo from '../images/runex-logo.png'
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
                                    <div className="border-bottom my-3 row"><div className="col-12"></div></div>
                                    <Row>
                                        <Col>
                                            <Form noValidate validated={validated} onSubmit={handleValidate}>
                                                <Form.Group  controlId="emailLogin">
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
                                                </Form.Group>
                                                
                                                {/* <Form.Group controlId="emailLogin">
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="inputGroupPrepend"><img className="" width="14" src={iconmail} alt="" /></InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="email"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="email"
                                                            onChange={this.onChange}
                                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                            required
                                                        />
                                                        <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group controlId="passwordLogin">
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconpassword} alt="" /></InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="password"
                                                            onChange={this.onChange}
                                                            required
                                                        />
                                                        <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group> */}
                                                <Button className="btn-custom rounded-pill" block type='submit'>Sign in</Button>
                                                <Button variant="secondary" className="rounded-pill" block onClick={() => history.push('/signup')}>สมัครสมาชิก</Button>
                                                <Link className="btn btn-link btn-block" to="/users/reset-password">ลืมรหัสผ่าน</Link>
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