import React, { Component, useState } from 'react'
import { Row, Col, Media, Card, Button, Form, Container, Collapse } from 'react-bootstrap'
// import iconrunning from '../../images/icon-running.svg'
import methodsPayment from '../../images/free-ecommerce-icon-set-bshk-13.jpg'
import iconrunningwhite from '../../images/icon-running-white.svg'
import QR_Code from '../../images/QR_Code.png'
import logoBank1 from '../../images/b1-logo.png'
import logoBank2 from '../../images/b2-logo.png'
import { IMAGE_URL, regStatusConstants } from '../../utils/constants'
import { utils } from '../../utils/utils'
import { eventService, regEventService } from '../../services'
import Swal from 'sweetalert2'
import { CheckoutCreditCard } from '../omise-prebuilt-form'
import { history } from '../../store'

export default function RacePayment (params){

    const regData = params.location.state.regdata

    console.log(regData)

    const [file, setFile] = useState(null)
    const [selectedOption, setSelectedOption] = useState("1")
    const [formshow, setFormshow] = useState("1")

    function getRegEvent () {
        // const { regID } = this.props.match.params
        // const { eventID } = this.props.route.match.params

        // regEventService.getRegEventDetail(regID).then(res => {
        //     if (res.data.code === 200) {
        //         this.setState({
        //             regData: res.data.data
        //         })
        //     }
        // })
    }

    function handleOptionChange (changeEvent){
        setSelectedOption(changeEvent.target.value)
    }

    function attachFileSlip(file){
        setFile(file)
        this.updatePayment()
    }

    async function updatePaymentFromCreditCard (amount, token){

        const total = amount
        //var paymentType = regStatusConstants.PAYMENT_CREDIT_CARD
        const { regData } = this.state
        if (regData !== undefined) {
            var bodyFormData = new FormData()

            bodyFormData.set('token', token)
            bodyFormData.set('price', total)
            bodyFormData.set('event_id', regData.event_id)
            bodyFormData.set('reg_id',regData.id)
            regEventService.chargeReg(bodyFormData).then(res => {
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
            })

        }
    }

    async function updatePayment (e){
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
    }

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
                                                    src={regData.event ? regData.event.coverThumbnail : ''}
                                                    alt=""
                                                />
                                                <Media.Body>
                                                    <p className="">{regData ? regData.event.title : ''}</p>
                                                    {/* {this.genarateTickets()} */}
                                                </Media.Body>
                                            </Media>
                                        </Card.Body>

                                        <Card.Body>
                                            <h4 className="h4">{regData ? regData.event.name : ''}</h4>
                                            <p className="text-muted mb-4">ชำระเงินค่าสมัคร</p>
                                            <h1 className="mb-0" style={{ color: '#FA6400' }}>{selectedOption === '1' ? (regData.total_price*1.05): regData.total_price  + 'THB' } </h1>

                                        </Card.Body>
                                        <hr></hr>
                                        <Card.Body>
                                            <p className="float-left" style={{ color: '#E02020', fontSize: 12 }}>กรุณาชำระเงินและแจ้งโอนภายใน 48 ชั่วโมงหลังจาก ลงทะเบียน สมารถแจ้งการชำระเงินได้ที่เพจเฟสบุ๊คและไลน์</p>
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
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="custom-radio-0"
                                        name="pay"
                                        value="1"
                                        checked={selectedOption === '1'}
                                        onChange={(e)=>handleOptionChange(e)}
                                        label={ <span style={{color:'red'}}><img width={168} className="mr-3" src={methodsPayment} alt=""/>*Charge 5%</span>}
                                    // label={(<span>บัตรเครดิต</span>)}
                                    // label={`Paypal ${<span style={{color:'red'}}>(*Charge 5%)</span>}`}
                                    />
                                    {
                                        selectedOption === '1' ?
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
                                            :
                                            null
                                    }
                                    <br></br>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="custom-radio-2"
                                        value="2"
                                        label="ชำระเงินโอนผ่านบัญชีธนาคาร"
                                        name="pay"
                                        checked={selectedOption === "2"}
                                        onChange={(e)=>handleOptionChange(e)}
                                    />
                                    <Card style={{ display: selectedOption === '2' ? "block" : "none" }}>
                                        <Card.Body>
                                            <h5>ข้อมูลบัญชีธนาคารสำหรับโอนเงิน</h5>
                                            <div className="clearfix">
                                                <p className="float-left">ธนาคาร:</p>
                                                <h6 className="float-right" >ธนาคารกสิกรไทย</h6>
                                            </div>
                                            <div className="clearfix">
                                                <p className="float-left">หมายเลขบัญชี:</p>
                                                <h6 className="float-right" >674-2-04828-2</h6>
                                            </div>
                                            <div className="clearfix border-bottom pb-3 mb-2">
                                                <p className="float-left">ชื่อบัญชี:</p>
                                                <h6 className="float-right" >บจก. ธิงค เทคโนโลยี</h6>
                                            </div>
                                            <h6 className="" >เงื่อนไขการยืนยันการสมัคร</h6>
                                            <p className="border-bottom pb-3">หลังจากทำการโอน กรุณาเก็บสลิปหลักฐานการโอนเพื่อใช้ในการแนบหลักฐานยืนยันการสมัครในขั้นตอนต่อไป</p>
                                            <h6 className="mb-1">เงื่อนไขการยืนยันการสมัคร</h6>
                                            <p className="border-bottom pb-3"> หลังจากทำการโอน กรุณาเก็บสลิปหลักฐานการโอนเพื่อใช้ในการแนบหลักฐานยืนยันการสมัครในขั้นตอนต่อไป</p>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <h5>แนบหลักฐานการโอนเงิน</h5>
                                                    <p className="text-custom">ยังไม่ได้ยืนยันหลักฐานยืนยันการสมัคร</p>
                                                </div>
                                                {/* <ConfirmPayment uploadSlip={this.attachFileSlip} /> */}
                                                {/* <button type="button" className="btn btn-outline-warning float-right rounded-pill"><img width="25" height="20" class="mr-1" src={iconupload} alt="runex" />อัปโหลดสลิป</button> */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <br></br>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        value="3"
                                        id="custom-radio-1"
                                        label="ชำระเงินด้วย QR Code"
                                        checked={selectedOption === "3"}
                                        onChange={(e)=>handleOptionChange(e)}
                                        name="pay"
                                    />
                                    <Card style={{ display: selectedOption === '3' ? "block" : "none" }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={6} className="p-0">
                                                    <img
                                                        // width={100%}
                                                        className="mr-3 img-fluid"
                                                        src={QR_Code}
                                                        alt=""
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <h5>ขั้นตอนการชำระเงินด้วย QR Code</h5>
                                                    <ul className="list-unstyled">
                                                        <li>1. เปิด App ธนาคาร</li>
                                                        <li>2. เลือกช่องทางการชำระเงิน</li>
                                                        <li>3. สแกน QR Code ด้านซ้ายเพื่อชำระเงิน</li>
                                                    </ul>
                                                    <h6 className="mb-1">ธนาคารที่ร่วมรายการ</h6>
                                                    <img
                                                        width={100}
                                                        className="mr-3"
                                                        src={logoBank1}
                                                        alt=""
                                                    />
                                                    <img
                                                        width={100}
                                                        className="mr-3"
                                                        src={logoBank2}
                                                        alt=""
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <Card >
                                                        <Card.Body>
                                                            <h5>ข้อมูลบัญชีธนาคารสำหรับโอนเงิน</h5>
                                                            <div className="clearfix">
                                                                <p className="float-left">Prompt Pay:</p>
                                                                <h6 className="float-right" >0-4055-48000-64-7</h6>
                                                            </div>
                                                            <div className="clearfix border-bottom pb-3 mb-2">
                                                                <p className="float-left">ชื่อบัญชี:</p>
                                                                <h6 className="float-right" >บริษัท ธิงค เทคโนโลยี จำกัด</h6>
                                                            </div>
                                                            <h6 className="mb-1">เงื่อนไขการยืนยันการสมัคร</h6>
                                                            <p> หลังจากทำการโอน กรุณาเก็บสลิปหลักฐานการโอนเพื่อใช้ในการแนบหลักฐานยืนยันการสมัครในขั้นตอนต่อไป</p>
                                                            <div className="clearfix">
                                                                <div className="float-left">
                                                                    <h5>แนบหลักฐานการโอนเงิน</h5>
                                                                    <p className="text-custom">ยังไม่ได้ยืนยันหลักฐานยืนยันการสมัคร</p>
                                                                </div>
                                                                {/* <ConfirmPayment uploadSlip={this.attachFileSlip} /> */}
                                                                {/* <button type="button" className="btn btn-outline-warning float-right rounded-pill"><img width="25" height="20" class="mr-1" src={iconupload} alt="runex" />อัปโหลดสลิป</button> */}
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
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
