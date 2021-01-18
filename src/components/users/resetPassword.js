import React, { Component } from 'react'
import { Card, Container, Row, InputGroup, Col, Form, Button } from 'react-bootstrap'
import { userService } from '../../services';
import Swal from 'sweetalert2';
import { Formik } from "formik";
import * as yup from "yup";
//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validationSchemaChangePassword = yup.object({
    password: yup
        .string()
        .required("New Password is required!"),
    conf_password: yup
        .string()
        .required("Confirm New Password is required!")
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const validationSchemaEmail = yup.object({
    email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid"),
});

class Forms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    handleClickChange () {
        this.props.onSend(2)
        // console.log('click')
        // this.setState({ step: 2 })
    }

    sendEmail = (values) => {

        const param = {
            email: values.email
        }

        Swal.fire({
            title: 'กำลังส่งอีเมล',
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()

                userService.forgetPass(param).then(res => {
                    console.log('[ResetPassword.js] handleSubmit', res)
                    if (res.data.code === 200) {
                        Swal.fire({
                            type: 'success',
                            title: 'เราได้ทำการส่งอีเมล์เพื่อตั้งรหัสผ่านใหม่ไปให้คุณแล้ว\n' + values.email,
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            this.setState({isResend:false})
                        })
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: res.data.data.message + '\n' + values.email,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            }
        })
    }

    changePassword = (values) => {
        const { token } = this.props

        const param = {
            "password": values.password,
            "new_password": values.conf_password
        }

        userService.changePass(param, token).then(res => {
            //console.log(res)
            if (res.data.code === 200) {
                Swal.fire({
                    type: 'success',
                    title: 'เราได้ทำการเปลี่ยนรหัสผ่านให้คุณแล้ว',
                    showConfirmButton: false,
                    timer: 2000
                }).then(res => {
                    history.push('/')
                })
            } else {
                if(res.status === 403){
                    Swal.fire({
                        type: 'error',
                        title: 'token is expired!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    console.log('resend')
                    history.push('/users/reset-password')
                }else{
                    Swal.fire({
                        type: 'error',
                        title: res.data.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
        })
    }

    render () {
        // console.log(this.props.data)
        return (
            <div>
                {this.props.step === 1 ?
                    <Formik
                        validationSchema={validationSchemaChangePassword}
                        onSubmit={(values, actions) => {
                            //console.log("Dragon kNight", values, actions);
                            this.changePassword(values)
                        }}
                        initialValues={{
                            password: '',
                            conf_password: ''
                        }}
                    >
                        {
                            ({
                                handleSubmit,
                                handleChange,
                                touched,
                                errors
                            }) => (
                                    <Form className="mt-4" onSubmit={handleSubmit}>
                                        <Form.Group controlId="regEmail">
                                            <Form.Label>New Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconpassword} alt="" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="รหัสผ่านใหม่"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="password"
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />
                                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="resetConfPassword">
                                            <Form.Label>Confirm password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconpassword} alt="" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="ยืนยันรหัสผ่าน"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="conf_password"
                                                    onChange={handleChange}
                                                    isValid={touched.conf_password && !errors.conf_password}
                                                    isInvalid={touched.conf_password && !!errors.conf_password}
                                                />
                                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.conf_password}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        {/* <Form.Group controlId="passwordLogin">
                    <InputGroup>
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
                                        <Button type="submit" variant="primary" className="rounded-pill" block>SEND</Button>
                                        {/* <Button variant="outline-secondary" className="rounded-pill" block type='submit'>กลับหน้าแรก</Button> */}
                                        <Link to="/" className="btn btn-outline-secondary rounded-pill btn-block">กลับหน้าแรก</Link>
                                        {/* <div className="clearfix">
                    
                    <button type="submit" className="btn btn-primary rounded-pill float-right">Reset Password</button>
                    <Button className="btn-custom rounded-pill" block type='submit'>Sign in</Button> 
                </div>*/}
                                    </Form>
                                )
                        }
                    </Formik>
                    : null}
                {this.props.step === 2 ?
                    <Formik
                        validationSchema={validationSchemaEmail}
                        onSubmit={(values, actions) => {
                            console.log("Dragon kNight", values, actions);
                            this.sendEmail(values)
                        }}
                        initialValues={{
                            email: ''
                        }}
                    >
                        {
                            ({
                                handleSubmit,
                                handleChange,
                                touched,
                                errors
                            }) => (
                                    <Form className="mt-4" noValidate onSubmit={handleSubmit}>
                                        <Form.Group controlId="resetConfPassword">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconmail} alt="" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="อีเมล์"
                                                    name="email"
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="rounded-pill" block>RESEND</Button>
                                    </Form>
                                )
                        }
                    </Formik>
                    : null}
            </div>
        )
    }
}
class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            step: 1
        }
    }
    handleClickChange = () => {
        console.log('click')
        this.setState({ step: 2 })
        // this.setState({ step: 2 })
    }
    componentDidMount () {
        const { token } = this.props.match.params
        if (token) { this.setState({ step: 1 }) } else { this.setState({ step: 2 }) }
        // this.setState({ step: 1 })
    }

    render () {
        const { token } = this.props.match.params

        return (
            <Container className="mt-4 content">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="mt-5">
                            <Card.Header>
                                Reset Password
                            </Card.Header>
                            <Card.Body className="px-5">
                                {/* Enter the email address associated with your account, and we’ll email you a link to reset your password. */}
                                <Forms step={this.state.step} onSend={this.handleClickChange} token={token}></Forms>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}

// function mapState (state) {
//     const { loggingIn, user } = state.authentication;
//     return { loggingIn, user };
// }

// const actionCreators = {
//     login: userActions.login,
//     // regEP: userService.registerWithEmailPassword,
//     // regPD: userService.registerWithProvider,
// };

// const connectedLoginPage = connect(mapState, actionCreators)(ResetPassword);
// export { connectedLoginPage as ResetPassword }

export default ResetPassword