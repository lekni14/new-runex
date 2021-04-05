/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { Row, Col, Media, Card, Button, Form, Container, Collapse } from 'react-bootstrap'
// import iconrunning from '../../images/icon-running.svg'
import methodsPayment from '../../images/free-ecommerce-icon-set-bshk-13.jpg'
import iconrunningwhite from '../../images/icon-running-white.svg'
// import QR_Code from '../../images/QR_Code.png'
// import logoBank1 from '../../images/b1-logo.png'
// import logoBank2 from '../../images/b2-logo.png'
import { utils } from '../../utils/utils'
import { regEventService } from '../../services'
import Swal from 'sweetalert2'
import { CheckoutCreditCard } from '../omise-prebuilt-form'
import { history } from '../../store'

export default function RacePayment (params){

    const regData = params.location.state.regdata
    const event = params.location.state.event

    // console.log(regData)

    // const [file, setFile] = useState(null)
    const [payMethod, setPayMethod] = useState([])
    // const [selectedOption, setSelectedOption] = useState("1")
    // const [formshow, setFormshow] = useState("1")

    // function getRegEvent () {
        // const { regID } = this.props.match.params
        // const { eventID } = this.props.route.match.params

        // regEventService.getRegEventDetail(regID).then(res => {
        //     if (res.data.code === 200) {
        //         this.setState({
        //             regData: res.data.data
        //         })
        //     }
        // })
    // }

    function reqPaymentMethod() {
        regEventService.getPaymentMethod().then(res => {
            if (res.data.code === 200) {
                setPayMethod(res.data.data)
            }
        })
    }

    async function updatePaymentFromCreditCard (amount, token){

        const total = amount
        console.log(token)
        //var paymentType = regStatusConstants.PAYMENT_CREDIT_CARD
        if (regData !== undefined) {
            // var bodyFormData = new FormData()
            const params = {
                "token" : token,
                "price" : total,
                "event_code" : regData.event_code,
                "reg_id" : regData.id,
                "order_id" : regData.order_id
        }
            // bodyFormData.set('token', token)
            // bodyFormData.set('price', total)
            // bodyFormData.set('event_code', regData.event_code)
            // bodyFormData.set('reg_id',regData.id)
            // bodyFormData.set('order_id',regData.order_id)
            regEventService.chargeReg(params).then(res => {
                console.log(res)
                if (res.data !== undefined) {
                    if (res.data.code === 200) {
                        Swal.fire({
                            title: '',
                            type: 'success',
                            html:
                                'การชำระเงินสำเร็จ',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: true,
                            confirmButtonText:
                                '<i class="fa fa-thumbs-up"></i> Thank You',
                            confirmButtonAriaLabel: 'Thumbs up, great!'
                        })
                        history.push('/')
                    } else {
                        Swal.fire({
                            title: '',
                            type: 'warning',
                            html:
                                'การแจ้งชำระเงินไม่สำเร็จ',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: true,
                            confirmButtonText:
                                '<i class="fa fa-thumbs-up"></i> Thank You',
                            confirmButtonAriaLabel: 'Thumbs up, great!'
                        })
                    }
                } else {
                    Swal.fire({
                        title: '',
                        type: 'warning',
                        html:
                            'การแจ้งชำระเงินไม่สำเร็จ',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: true,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Thank You',
                        confirmButtonAriaLabel: 'Thumbs up, great!'
                    })
                }
            })

        }
    }

    /*async function updatePayment (e){
        if (e !== undefined && e !== null) {
            e.preventDefault()
        }
        const { regData } = this.state
        if (regData !== undefined) {
            // var discount = promoCode
            // if(discount < 0){
            //     discount = 0
            // }
            regData.status = regStatusConstants.PAYMENT_WAITING_APPROVE
            regData.payment_type = regStatusConstants.PAYMENT_TRANSFER
            regData.image = file ? await eventService.uploadImage(file).then(res => res.data.url) : ''
            Swal.fire({
                title: 'กำลังส่งข้อมูล',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    eventService.updateRegEvent(regData).then(res => {
                        Swal.close()
                        if (res.data !== undefined) {
                            if (res.data.code === 200) {
                                history.push('/my-event')
                            } else {
                                Swal.fire({
                                    title: '',
                                    type: 'warning',
                                    html:
                                        'การแจ้งชำระเงินไม่สำเร็จ',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    focusConfirm: true,
                                    confirmButtonText:
                                        '<i class="fa fa-thumbs-up"></i> Thank You',
                                    confirmButtonAriaLabel: 'Thumbs up, great!'
                                })
                            }
                        } else {
                            Swal.fire({
                                title: '',
                                type: 'warning',
                                html:
                                    'การแจ้งชำระเงินไม่สำเร็จ',
                                showCloseButton: false,
                                showCancelButton: false,
                                focusConfirm: true,
                                confirmButtonText:
                                    '<i class="fa fa-thumbs-up"></i> Thank You',
                                confirmButtonAriaLabel: 'Thumbs up, great!'
                            })
                        }
                    }
                    )
                }
            })
        }
    }*/

    useEffect(()=>{
        reqPaymentMethod()
    },[])

    return (
        <Container className="mt-5" >
            <Card>
                {regData ?
                    <Card.Body>
                        <Row>
                            <Col sm={6} md={12} lg={5}>
                                <Collapse in={true}>
                                    <Card>
                                        <Card.Body className="mb-3 border-bottom">
                                            <div className="clearfix">
                                                <h4>Order Code</h4>
                                                <p style={{ color: '#FA6400' }}>{regData ? regData.order_id : ''}</p>
                                            </div>
                                            <div className="clearfix">
                                                <h6 style={{ marginTop: 5 }} >ลงทะเบียนวันที่</h6>
                                                <p>{regData ? utils.convertDateApiToString(regData.created_at) : ''}</p>
                                            </div>
                                        </Card.Body>
                                        <Card.Body className="mb-3 border-bottom">
                                            <div className="clearfix">
                                                <h6 className="float-left">รายละเอียด</h6>
                                            </div>
                                            <Media>
                                                <img
                                                    width={140}
                                                    height={54}
                                                    className="mr-3"
                                                    src={event ? event.coverThumbnail : ''}
                                                    alt=""
                                                />
                                                <Media.Body>
                                                    <p className="">{event ? event.title : ''}</p>
                                                    <p className="">{regData ? regData.ticket_options[0].tickets.title : ''}</p>
                                                </Media.Body>
                                            </Media>
                                        </Card.Body>

                                        <Card.Body>
                                            <h4 className="h4">{event ? event.name : ''}</h4>
                                            <p className="text-muted mb-4">ชำระเงินค่าสมัคร</p>
                                            <h1 className="mb-0" style={{ color: '#FA6400' }}>{regData.total_price  + 'THB' } </h1>

                                        </Card.Body>
                                        <hr></hr>
                                        <Card.Body>
                                            {/* <p className="float-left" style={{ color: '#E02020', fontSize: 12 }}>กรุณาชำระเงินและแจ้งโอนภายใน 48 ชั่วโมงหลังจาก ลงทะเบียน สมารถแจ้งการชำระเงินได้ที่เพจเฟสบุ๊คและไลน์</p> */}
                                            <div className="clearfix">
                                                <h6>ช่องทางการติดต่อ</h6>
                                            </div>
                                            <Row>
                                                <Col>Phone :</Col>
                                                <Col>084 519 6556</Col>
                                            </Row>
                                            <Row>
                                                <Col>Email :</Col>
                                                <Col>support@runex.co</Col>
                                            </Row>
                                            <Row>
                                                <Col>Facebook :</Col>
                                                <Col>fb.com/runex.co</Col>
                                            </Row>
                                            <Row>
                                                <Col>Line ID :</Col>
                                                <Col>runex.co</Col>
                                            </Row>

                                        </Card.Body>
                                    </Card>
                                </Collapse>
                            </Col>
                            <Col sm={6} lg={7} md={12} >
                                <h5 style={{ display: regData ? (regData.total_price === 0 ? "none" : "block") : 'block' }}>Select Payment Method</h5>
                                <Form className="mb-5" style={{ display: regData ? (regData.total_price === 0 ? "none" : "block") : 'block' }}>
                                {
                                    payMethod.map((pay, index)=>{
                                        
                                        if (pay.type === 'PAYMENT_CREDIT_CARD') {
                                            
                                            return <Card>
                                                <Card.Header>
                                                    <span style={{color:'red'}}><img width={168} className="mr-3" src={methodsPayment} alt=""/>*Charge {pay.charge_percent}%</span>
                                                    <span> ( Total : ฿{regData.total_price + (pay.charge_percent *regData.total_price)/100})</span>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <CheckoutCreditCard
                                                                cart={regData}
                                                                createCreditCardCharge={updatePaymentFromCreditCard}
                                                                amount={regData.total_price + (pay.charge_percent *regData.total_price)/100}
                                                            />

                                                        </Col>
                                                        {/* <Col md={6}>
                                                            <CheckoutInternetBanking
                                                                cart={regData}
                                                                createInternetBankingCharge={this.createInternetBankingCharge}
                                                                amount={this.calculateTotal()}
                                                            />
                                                        </Col> */}
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }else if (pay.type === 'PAYMENT_QR' || pay.type === 'PAYMENT_QRCODE') {
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <CheckoutCreditCard
                                                                cart={regData}
                                                                createCreditCardCharge={()=>updatePaymentFromCreditCard}
                                                                amount={regData.total_price*1.05}
                                                            />

                                                        </Col>
                                                        {/* <Col md={6}>
                                                            <CheckoutInternetBanking
                                                                cart={regData}
                                                                createInternetBankingCharge={this.createInternetBankingCharge}
                                                                amount={this.calculateTotal()}
                                                            />
                                                        </Col> */}
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }
                                    })
                                }
                                </Form>
                                <Button className="float-right btn-custom rounded-pill px-4 ml-2 mt-5" onClick={() => history.push('/') || history.go(0)}>

                                    <img
                                        width={25}
                                        height={20}
                                        className="mr-1"
                                        src={iconrunningwhite}
                                        alt="runex"
                                    />ไปหน้ารายการสมัครวิ่ง
                            </Button>
                                {/* <Button variant="outline-secondary" className="float-right rounded-pill px-4 mt-5" >Back</Button> */}
                            </Col>
                        </Row>

                    </Card.Body>
                    : ''}
            </Card>
        </Container>
    )
}
