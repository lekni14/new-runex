import React from 'react'
import { Row, Col, Media, Card, Button, Form, InputGroup, FormControl, Collapse } from 'react-bootstrap'
// import iconrunning from '../../images/icon-running.svg'
import methodsPayment from '../../images/free-ecommerce-icon-set-bshk-13.jpg'
import iconrunningwhite from '../../images/icon-running-white.svg'
import QR_Code from '../../images/QR_Code.png'
import logoBank1 from '../../images/b1-logo.png'
import logoBank2 from '../../images/b2-logo.png'
import ConfirmPayment from './ConfirmPayment'
import { IMAGE_URL, regStatusConstants } from '../../utils/constants'
import { utils } from '../../utils/utils'
import { eventService, regEventService } from '../../services'
// import { PayPalButton } from "react-paypal-button-v2";
// import moment from 'moment'
import Swal from 'sweetalert2'
import { CheckoutCreditCard } from '../omise-prebuilt-form'

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            selectedOption: "3",
            formshow: "1",
            code: '',
            promoCode: 0,
            promoText: '',
            coupon: undefined,
            user: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')) : {}
        }
    }

    componentDidMount () {
        if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
            this.setState({ user: JSON.parse(sessionStorage.getItem('user_tmp')) })
        }
    }

    onChangeTab = (step) => {
        this.props.handleClickChange(step)
    }
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }
    onClickBack = () => {
        this.props.handleClickChange(1)
    }

    onClickChangeAddress = () => {
        this.props.handleClickChange(0)
    }

    onClickChangeTicket = () => {
        this.props.handleClickChange(1)
    }

    onClickConfirm = async (e) => {
        if (e !== undefined && e !== null) {
            e.preventDefault()
        }

        var phone = ''
        if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
            this.updateUser(JSON.stringify(sessionStorage.getItem('user_tmp')))
            if (JSON.stringify(sessionStorage.getItem('user_tmp').phone !== null)) {
                phone = JSON.stringify(sessionStorage.getItem('user_tmp')).phone
            }
        } else {
            phone = JSON.parse(utils.getUser()).phone
        }


        const { events } = this.props

        const total = this.calculateTotal()
        let status = ''
        if (!status) {
            status = regStatusConstants.PAYMENT_WAITING
        }
        if (this.state.file !== null) {
            status = regStatusConstants.PAYMENT_WAITING_APPROVE
        }

        let paymentType = ''
        if (events.tickets[0].ticket.price === 0) {
            status = regStatusConstants.PAYMENT_SUCCESS
            paymentType = regStatusConstants.PAYMENT_FREE
        } else {
            if (this.state.selectedOption === "1") {
                paymentType = regStatusConstants.PAYMENT_TRANSFER
            } else if (this.state.selectedOption === "2") {
                paymentType = regStatusConstants.PAYMENT_QRCODE
            } else if (this.state.selectedOption === "3") {
                paymentType = regStatusConstants.PAYMENT_CREDIT_CARD
            }
        }

        var discount = this.state.promoCode
        if (discount < 0) {
            discount = 0
        }

        const params = {
            event: events.events.event,
            event_id: events.events.event.id,
            product: events.products,
            tickets: events.tickets,
            status: status,
            payment_type: paymentType,
            total_price: total,
            promo_code: this.state.promoText,
            discount_price: discount,
            coupon: this.state.coupon,
            reg_date: utils.dateNow(),
            shiping_address: events.address,
            image: this.state.file ? await eventService.uploadImage(this.state.file).then(res => res.data.url) : '',
            phone:phone
        }
        //console.log(params)
        this.props.regEvent(params)
    }

    onClickConfirmPaypal = async (resPayapl) => {
        // e.preventDefault()
        var phone = ''
        if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
            this.updateUser(JSON.stringify(sessionStorage.getItem('user_tmp')))
            if (JSON.stringify(sessionStorage.getItem('user_tmp').phone !== null)) {
                phone = JSON.stringify(sessionStorage.getItem('user_tmp')).phone
            }
        } else {
            phone = JSON.parse(utils.getUser()).phone
        }


        const total = resPayapl.amount
        var discount = this.state.promoCode
        if (discount < 0) {
            discount = 0
        }

        const { events } = this.props
        const params = {
            event_id: events.events.event.id,
            product: events.products,
            tickets: events.tickets,
            status: regStatusConstants.PAYMENT_SUCCESS,
            payment_type: regStatusConstants.PAYMENT_CREDIT_CARD,
            total_price: total,
            promo_code: this.state.promoText,
            discount_price: discount,
            coupon: this.state.coupon,
            reg_date: utils.dateNow(),
            shiping_address: events.address,
            order_id: resPayapl.order_id,
            image: '',
            phone: phone
        }

        //console.log('Param onClickConfirmPaypal ::: ', params)
        this.props.regEventByPaypal(params, resPayapl)
    }

    createCreditCardCharge = async (amount, token) => {
        try {
            // e.preventDefault()
            var phone = ''
            if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
                this.updateUser(JSON.stringify(sessionStorage.getItem('user_tmp')))
                if (JSON.stringify(sessionStorage.getItem('user_tmp').phone !== null)) {
                    phone = JSON.stringify(sessionStorage.getItem('user_tmp')).phone
                }
            } else {
                phone = JSON.parse(utils.getUser()).phone
            }

            const total = amount
            var discount = this.state.promoCode
            if (discount < 0) {
                discount = 0
            }

            const { events } = this.props
            var bodyFormData = new FormData()

            bodyFormData.set('token', token)
            bodyFormData.set('price', total)
            bodyFormData.set('event_id', events.events.event.id)
            regEventService.chargeReg(bodyFormData).then(res => {
                if (res.status === 200) {
                    const params = {
                        event_id: events.events.event.id,
                        product: events.products,
                        tickets: events.tickets,
                        status: regStatusConstants.PAYMENT_SUCCESS,
                        payment_type: regStatusConstants.PAYMENT_CREDIT_CARD,
                        total_price: total / 100,
                        promo_code: this.state.promoText,
                        discount_price: discount,
                        coupon: this.state.coupon,
                        reg_date: utils.dateNow(),
                        shiping_address: events.address,
                        order_id: res.data.data.ID,
                        image: '',
                        phone: phone
                    }
                    this.props.regEventByPaypal(params)
                } else {
                    Swal.fire({
                        type: 'warning',
                        title: 'ชำระเงินไม่สำเร็จ',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    createInternetBankingCharge = async (amount, token) => {
        try {
            // e.preventDefault()
            var phone = ''
            if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
                this.updateUser(JSON.stringify(sessionStorage.getItem('user_tmp')))
                if (JSON.stringify(sessionStorage.getItem('user_tmp').phone !== null)) {
                    phone = JSON.stringify(sessionStorage.getItem('user_tmp')).phone
                }
            }else {
                phone = JSON.parse(utils.getUser()).phone
            }

            const total = amount
            var discount = this.state.promoCode
            if (discount < 0) {
                discount = 0
            }

            const { events } = this.props
            var bodyFormData = new FormData()

            bodyFormData.set('token', token)
            bodyFormData.set('price', total)
            bodyFormData.set('event_id', events.events.event.id)
            regEventService.chargeReg(bodyFormData).then(res => {
                if (res.status === 200) {
                    const params = {
                        event_id: events.events.event.id,
                        product: events.products,
                        tickets: events.tickets,
                        status: regStatusConstants.PAYMENT_SUCCESS,
                        payment_type: regStatusConstants.PAYMENT_ONLINE_BANKING,
                        total_price: total / 100,
                        promo_code: this.state.promoText,
                        discount_price: discount,
                        coupon: this.state.coupon,
                        reg_date: utils.dateNow(),
                        shiping_address: events.address,
                        order_id: token,
                        image: '',
                        phone: phone
                    }
                    //console.log('Param onClickConfirmPaypal ::: ', params)
                    this.props.regEventByPaypal(params)
                } else {
                    Swal.fire({
                        type: 'warning',
                        title: 'ชำระเงินไม่สำเร็จ',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    onClickSendCode = () => {
        const { promoText } = this.state
        if (promoText.length > 4) {
            //this.setState({promoCode:100})
            regEventService.getPromoCodeInfo(promoText)
                .then(res => {
                    //console.log(res)
                    if (res.data.code === 200) {

                        this.setState({ coupon: res.data.data })
                        this.setState({ promoCode: res.data.data.discount })
                    } else {
                        this.setState({ promoCode: -1 })
                    }
                })
                .catch(error => {
                    this.setState({ promoCode: -1 })
                })
        } else {
            Swal.fire({
                type: 'warning',
                title: 'promo code ไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    onClickClearCode = () => {
        this.setState({ promoText: '' })
        this.setState({ promoCode: 0 })
        this.setState({ coupon: undefined })
    }

    updateUser = (user) => {
        this.props.updateProfile(JSON.parse(user))
    }

    genarateAddon = () => {
        var arr = []
        const { events } = this.props
        if (events.products !== undefined && events.products !== null) {
            events.products.map((item) => (
                arr.push(
                    <Media key={item.product.id}>
                        <img
                            width={64}
                            height={28}
                            className="mr-3"
                            src={item.product.image.length > 0 ? IMAGE_URL + item.product.image[0] : ''}
                            alt=""
                        />
                        <Media.Body>
                            <p className="">{item.product.name}</p>
                            <h6 className=""><small>Price :</small>{
                                item.price + ' ' + (item.product.currency !== undefined ? item.product.currency : 'THB')
                            }</h6>
                        </Media.Body>
                    </Media>
                )
            ))
        }
        return arr
    }

    genarateTickets = () => {
        var arr = []
        const { events } = this.props
        if (events.tickets !== undefined && events.tickets !== null) {
            events.tickets.map((item, index) => (
                index === 0 ? arr.push(
                    <div key={index}>
                        <h6 className=""><small>Distance : </small>{item.ticket.title + ' ' + item.ticket.distance + ' km.'}</h6>
                        <h6 className="" style={{ display: item.type === '' ? "none" : "block" }}><small>{item.product.name} size : </small>{item.type}</h6>
                    </div>
                ) : arr.push(
                    <div key={index} style={{ display: item.type === '' ? "none" : "block" }}>
                        <h6 className="" style={{ display: item.type === '' ? "none" : "block" }}><small>{item.product.name} size : </small>{item.type}</h6>
                    </div>
                )

            ))

        }
        return arr
    }

    genarateSummary = () => {
        var arr = []
        const { events } = this.props
        const { promoCode } = this.state
        var total = 0
        var currency = 'BTH'
        if (events.tickets !== undefined && events.tickets !== null) {
            if (events.tickets.length > 0) {
                total += events.tickets[0].ticket.price
                if (events.tickets[0].ticket.unit !== undefined) {
                    currency = events.tickets[0].ticket.unit
                }
                arr.push(
                    <div className="clearfix" key={events.tickets[0].ticket.id}>
                        <p className="float-left">{events.tickets[0].ticket.title}</p>
                        <p className="float-right">{events.tickets[0].ticket.price + ' ' +
                            (events.tickets[0].ticket.unit !== undefined ? events.tickets[0].ticket.unit : 'THB')}</p>
                    </div>

                )
            }
        }
        if (events.products !== undefined && events.products !== null) {
            events.products.map((item) => (
                total += item.price,
                arr.push(
                    <div className="clearfix" key={item.product.id}>
                        <p className="float-left">{item.product.name}</p>
                        <p className="float-right">{item.price + ' ' + currency}</p>
                    </div>

                )
            ))

        }
        if (promoCode > 0) {
            total -= promoCode
            arr.push(
                <div className="clearfix" key={989}>
                    <p className="float-left">ส่วนลด</p>
                    <p style={{ color: '#FA6400', marginLeft: 5, cursor: 'pointer' }} className="float-left" onClick={this.onClickClearCode}>ลบ</p>
                    <p className="float-right">-{promoCode + ' ' + currency}</p>
                </div>
            )
        }
        if (this.state.selectedOption === '3') {
            arr.push(
                <div className="clearfix" key={989}>
                    <p className="float-left"><span style={{ color: 'red' }}>charge 5%</span></p>
                    <p className="float-right">{this.calculateTotal() - this.calculateTotal() / 1.05 + ' ' + currency}</p>
                </div>
            )
        }
        arr.push(
            <div className="clearfix" key={99}>
                <p className="float-left">Total</p>
                <p className="float-right">{this.calculateTotal() + ' ' + currency}</p>
            </div>
        )
        return arr
    }

    calculateTotal () {
        const { events } = this.props
        var total = 0
        if (events.tickets !== undefined && events.tickets !== null) {
            if (events.tickets.length > 0) {
                total += events.tickets[0].ticket.price
            }
        }
        if (events.products !== undefined && events.products !== null) {
            events.products.map((item) => (
                total += item.price
            ))
        }
        if (this.state.promoCode > 0) {
            total -= this.state.promoCode
        }
        if (this.state.selectedOption === '3') {
            total *= 1.05
        }
        return total
    }

    attachFileSlip = (file) => {
        this.setState({ file: file }, () => {
            this.onClickConfirm()
        })
    }

    render () {
        const { user } = this.state
        const { events } = this.props
        return (
            <Card>
                {events ?
                    <Card.Body>
                        <Row>
                            <Col sm={6} md={12} lg={5}>
                                <Collapse in={this.props.collapse}>
                                    <Card>
                                        <Card.Body className="mb-3 border-bottom">
                                            <h4>Confirm information</h4>
                                            <div className="clearfix">
                                                <h6 style={{ marginTop: 10 }} className="float-left">Address</h6>
                                                <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeAddress}>Change</Button>
                                            </div>
                                            <p>{user.fullname}</p>
                                            <p>{events.address ? (events.address.address + ' ' + events.address.city + ', ' + events.address.district + ', ' + events.address.province + ' ' + events.address.zipcode) : ''}</p>
                                        </Card.Body>
                                        <Card.Body className="mb-3 border-bottom">
                                            <div className="clearfix">
                                                <h6 style={{ marginTop: 10 }} className="float-left">Detail</h6>
                                                <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button>
                                            </div>
                                            <Media>
                                                <img
                                                    width={64}
                                                    height={32}
                                                    className="mr-3"
                                                    src={events.events.event ? IMAGE_URL + events.events.event.cover : ''}
                                                    alt=""
                                                />
                                                <Media.Body>
                                                    <p className="">{events.events.event ? events.events.event.name : ''}</p>
                                                    {this.genarateTickets()}
                                                </Media.Body>
                                            </Media>
                                        </Card.Body>
                                        <Card.Body className="mb-3 border-bottom" style={{ display: events.products ? ((events.products !== null || events.products.length === 0) ? "none" : "block") : 'none' }}>
                                            <div className="clearfix">
                                                <h6 style={{ marginTop: 10 }} className="float-left">Add on</h6>
                                                <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button>
                                            </div>
                                            {this.genarateAddon()}

                                        </Card.Body>
                                        <Card.Body className="mb-3 border-bottom" style={{ display: events.tickets ? (events.tickets[0].ticket.price === 0 ? "none" : "block") : 'block' }}>
                                            <div className="clearfix">
                                                <h6>Promo Code</h6>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="code"
                                                    aria-label="code"
                                                    aria-describedby="basic-addon2"
                                                    value={this.state.promoText}
                                                    onChange={e => this.setState({ promoText: e.target.value })}
                                                    hidden={this.state.promoCode > 0}
                                                />
                                                <InputGroup.Append hidden={this.state.promoCode > 0}>
                                                    <Button variant="warning" onClick={this.onClickSendCode}>Send</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <div hidden={this.state.promoCode <= 0}>
                                                <p className="float-left" >ใช้โค๊ด</p>
                                                <p className="float-left" style={{ color: '#FA6400', marginLeft: 5, marginRight: 5 }}>{this.state.promoText}</p>
                                                <p className="float-left" > คุณได้ส่วนลด </p>
                                                <p className="float-left" style={{ color: '#FA6400', marginLeft: 5, marginRight: 5 }}>{this.state.promoCode}</p>
                                                <p className="float-left" > บาท </p>
                                            </div>

                                            <div hidden={this.state.promoCode >= 0}>
                                                <p className="float-left" style={{ color: '#FA6400' }}>Code นี้ไม่สามารถใช้ได้</p>
                                            </div>
                                        </Card.Body>
                                        <Card.Body className="mb-3">
                                            <div className="clearfix">
                                                <h6>Summary</h6>
                                            </div>
                                            {this.genarateSummary()}
                                        </Card.Body>
                                    </Card>
                                </Collapse>
                                {/* <Card className="d-none d-lg-block d-xl-block">
                                    <Card.Body className="mb-3 border-bottom">
                                        <h4>Confirm information</h4>
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Address</h6>
                                            <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeAddress}>Change</Button>
                                        </div>
                                        <p>{user.fullname}</p>
                                        <p>{events.address ? (events.address.address + ' ' + events.address.city + ', ' + events.address.district + ', ' + events.address.province + ' ' + events.address.zipcode) : ''}</p>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Detail</h6>
                                            <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button>
                                        </div>
                                        <Media>
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={events.events.event ? IMAGE_URL + events.events.event.cover : ''}
                                                alt=""
                                            />
                                            <Media.Body>
                                                <p className="">{events.events.event ? events.events.event.name : ''}</p>
                                                {this.genarateTickets()}
                                            </Media.Body>
                                        </Media>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Add on</h6>
                                            <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button>
                                        </div>
                                        {this.genarateAddon()}

                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6>Promo Code</h6>
                                        </div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="code"
                                                aria-label="code"
                                                aria-describedby="basic-addon2"
                                                value={this.state.promoText}
                                                onChange={e=>this.setState({promoText:e.target.value})}
                                                hidden={this.state.promoCode > 0}
                                            />
                                            <InputGroup.Append hidden={this.state.promoCode > 0}>
                                                <Button variant="warning" onClick={this.onClickSendCode}>Send</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        <div hidden={this.state.promoCode <= 0}>
                                            <p className="float-left" >ใช้โค๊ด</p>
                                            <p className="float-left" style={{color:'#FA6400',marginLeft:5, marginRight:5}}>{this.state.promoText}</p>
                                            <p className="float-left" > คุณได้ส่วนลด </p>
                                            <p className="float-left" style={{color:'#FA6400',marginLeft:5, marginRight:5}}>{this.state.promoCode}</p>
                                            <p className="float-left" > บาท </p>
                                            </div>

                                            <div hidden={this.state.promoCode >= 0}>
                                            <p className="float-left" style={{color:'#FA6400'}}>Code นี้ไม่สามารถใช้ได้</p>
                                            </div>
                                    </Card.Body>
                                    <Card.Body className="mb-3">
                                        <div className="clearfix">
                                            <h6>Summary</h6>
                                        </div>
                                        {this.genarateSummary()}
                                    </Card.Body>
                                </Card> */}
                            </Col>
                            <Col sm={6} lg={7} md={12} >
                                <h5 style={{ display: events.tickets ? (events.tickets[0].ticket.price === 0 ? "none" : "block") : 'block' }}>Select Payment Method</h5>

                                <Form className="mb-5" style={{ display: events.tickets ? (events.tickets[0].ticket.price === 0 ? "none" : "block") : 'block' }}>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="custom-radio-2"
                                        value="1"
                                        label="ชำระเงินโอนผ่านบัญชีธนาคาร"
                                        name="pay"
                                        checked={this.state.selectedOption === "1"}
                                        onChange={this.handleOptionChange}
                                    />
                                    <Card style={{ display: this.state.selectedOption === '1' ? "block" : "none" }}>
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
                                                <ConfirmPayment uploadSlip={this.attachFileSlip} />
                                                {/* <button type="button" className="btn btn-outline-warning float-right rounded-pill"><img width="25" height="20" class="mr-1" src={iconupload} alt="runex" />อัปโหลดสลิป</button> */}
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <div style={{ display: this.state.selectedOption === '1' ? "block" : "none" }}>
                                        {/* <PayPalButton
                                            amount="0.01"
                                            onSuccess={(details, data) => {
                                                alert("Transaction completed by " + details.payer.name.given_name);

                                                // OPTIONAL: Call your server to save the transaction
                                                return fetch("/paypal-transaction-complete", {
                                                    method: "post",
                                                    body: JSON.stringify({
                                                        orderID: data.orderID
                                                    })
                                                });
                                            }}
                                        /> */}
                                        {/* <Form.Group style={{ display: this.state.selectedOption === '1' ? "block" : "none" }} controlId="formBasicEmail">
                                            <Form.Label>Credit card number</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail" style={{ display: this.state.selectedOption === '1' ? "block" : "none" }}>
                                            <Row>
                                                <Col xs={5}>
                                                    <Form.Label>Security code</Form.Label>
                                                    <Form.Control type="text" placeholder="" />
                                                </Col>
                                                <Col xs={7}>
                                                    <Form.Label>Expiration date</Form.Label>
                                                    <Form.Control type="text" placeholder="MM/YY" />
                                                </Col>
                                            </Row>
                                        </Form.Group> */}
                                    </div>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        value="2"
                                        id="custom-radio-2"
                                        label="ชำระเงินด้วย QR Code"
                                        checked={this.state.selectedOption === "2"}
                                        onChange={this.handleOptionChange}
                                        name="pay"
                                    />
                                    <Card style={{ display: this.state.selectedOption === '2' ? "block" : "none" }}>
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
                                                                <ConfirmPayment uploadSlip={this.attachFileSlip} />
                                                                {/* <button type="button" className="btn btn-outline-warning float-right rounded-pill"><img width="25" height="20" class="mr-1" src={iconupload} alt="runex" />อัปโหลดสลิป</button> */}
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>

                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="custom-radio-0"
                                        name="pay"
                                        value="3"
                                        checked={this.state.selectedOption === "3"}
                                        onChange={this.handleOptionChange}
                                        label={<span style={{ color: 'red' }}><img width={168} className="mr-3" src={methodsPayment} alt="" />*Charge 5%</span>}
                                    // label={`บัตรเครดิต ${<span style={{color:'red'}}>(*Charge 5%)</span>}`}
                                    // label={`Paypal ${<span style={{color:'red'}}>(*Charge 5%)</span>}`}
                                    />
                                    {/* {console.log('Total Price :::: ', this.calculateTotal().toFixed(2))} */}
                                    {
                                        this.state.selectedOption === '3' ?
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={6}>
                                                            <CheckoutCreditCard
                                                                cart={events}
                                                                createCreditCardCharge={this.createCreditCardCharge}
                                                                amount={this.calculateTotal()}
                                                            />
                                                        </Col>
                                                        {/* <Col md={6}>
                                                            <CheckoutInternetBanking
                                                                cart={events}
                                                                createInternetBankingCharge={this.createInternetBankingCharge}
                                                                amount={this.calculateTotal()}
                                                            />
                                                        </Col> */}
                                                    </Row>
                                                </Card.Body>
                                            </Card>


                                            // <PayPalButton
                                            //     amount={(this.calculateTotal() * 1.05).toFixed(2)}
                                            //     // amount="1.05"
                                            //     onSuccess={(details, data) => {
                                            //         const params = {
                                            //             amount: parseFloat(details.purchase_units[0].amount.value),
                                            //             date_tranfer: moment(details.create_time).format('DD-MM-YYYY'),
                                            //             time_tranfer: moment(details.create_time).format('HH:mm'),
                                            //             order_id: data.orderID
                                            //         }
                                            //         // console.log('Params :::: ', params)
                                            //         this.onClickConfirmPaypal.bind(params)

                                            //     }}
                                            //     options={{
                                            //         clientId: "AUZrJfK9XQUlcyCPmm0H_Qe7i_3aFhv9rizPpkr4am5gtdpJbNO8zX8t7I0S1XT5eh0-JVi-i9zmCIX8",
                                            //         // clientId: "sb", //for testing.
                                            //         currency: "THB"
                                            //     }}
                                            // />



                                            :
                                            null
                                    }
                                </Form>
                                <Button className="float-right btn-custom rounded-pill px-4 ml-2 mt-5" onClick={this.onClickConfirm.bind()}>

                                    <img
                                        width={25}
                                        height={20}
                                        className="mr-1"
                                        src={iconrunningwhite}
                                        alt="runex"
                                    />Confirm
                                </Button>
                                <Button variant="outline-secondary" className="float-right rounded-pill px-4 mt-5" onClick={this.onClickBack.bind()}>Back</Button>
                            </Col>
                        </Row>

                    </Card.Body>
                    : ''}
            </Card>
        )
    }
}

export default Confirm