import React from 'react'
import { Row, Col, Media, Card, Button, Form, Collapse } from 'react-bootstrap'
// import iconrunning from '../../images/icon-running.svg'
import methodsPayment from '../../images/free-ecommerce-icon-set-bshk-13.jpg'
import QR_Code from '../../images/QR_Code.png'
import logoBank1 from '../../images/b1-logo.png'
import logoBank2 from '../../images/b2-logo.png'
import ConfirmPayment from './ConfirmPayment'
import { IMAGE_URL, regStatusConstants } from '../../utils/constants'
import { eventService, regEventService } from '../../services'
// import { PayPalButton } from "react-paypal-button-v2";
// import moment from 'moment'
import { history } from '../../store'
import Swal from 'sweetalert2'
import { CheckoutCreditCard } from '../omise-prebuilt-form'

class ConfirmReturn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            selectedOption: '3',
            formshow: "1",
            promoCode: 0,
            promoText:'',
            coupon: undefined,
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
        history.push('/my-event')
        //this.props.handleClickChange(1)
    }

    onClickChangeAddress = () => {
        this.props.handleClickChange(0)
    }

    onClickChangeTicket = () => {
        this.props.handleClickChange(1)
    }

    onClickConfirm = async (e) => {
        if(e !== undefined && e!== null){
            e.preventDefault()
        }
        const { event } = this.props
        if(event !== undefined){
            // var discount = this.state.promoCode
            // if(discount < 0){
            //     discount = 0
            // }
            event.status = regStatusConstants.PAYMENT_WAITING_APPROVE
            event.payment_type = regStatusConstants.PAYMENT_TRANSFER
            event.image = this.state.file ? await eventService.uploadImage(this.state.file).then(res => res.data.url) : ''
            Swal.fire({
                title: 'กำลังส่งข้อมูล',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    eventService.updateRegEvent(event).then(res=>{
                        Swal.close()
                        if(res.data !== undefined){
                            if(res.data.code === 200){
                                history.push('/my-event')
                            }else{
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
                        }else{
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

    updatePaymentFromCreditCard = async (amount, token) => {

        const total = amount
        var paymentType = regStatusConstants.PAYMENT_CREDIT_CARD
        const { event } = this.props
        if (event !== undefined) {
            var bodyFormData = new FormData()

            bodyFormData.set('token', token)
            bodyFormData.set('price', total)
            bodyFormData.set('event_id', event.id)
            regEventService.chargeReg(bodyFormData).then(res => {
                if (res.status === 200) {
                    event.order_id = res.data.data.ID
                    event.total_price = total/100
                    event.status = regStatusConstants.PAYMENT_SUCCESS
                    event.payment_type = paymentType
                    eventService.updateRegEventWithCreditCard(event).then(res => {
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
                } else {
                    Swal.fire({
                        type: 'warning',
                        title: 'ชำระเงินไม่สำเร็จ',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })

        }
    }

    onClickConfirmPaypal = async (resPayapl) => {

        const total = resPayapl.amount
        var paymentType = regStatusConstants.PAYMENT_CREDIT_CARD
        const { event } = this.props
        if(event !== undefined){
            // var discount = this.state.promoCode
            // if(discount < 0){
            //     discount = 0
            // }
            event.order_id = resPayapl.order_id
            event.total_price = total
            event.status = regStatusConstants.PAYMENT_SUCCESS
            event.payment_type = paymentType
            eventService.updateRegEvent(event).then(res=>{
                    if(res.data !== undefined){
                        if(res.data.code === 200){
                            history.push('/my-event')
                        }else{
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
                    }else{
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
    }

    updateUser = (user) => {
        this.props.updateProfile(JSON.parse(user))
    }

    genarateAddon = (events) => {
        var arr = []
        if (events.event !== undefined && events.event !== null) {
            events.product.map((item) => (
                arr.push(
                    <Media key={item.product.id}>
                        <img
                            width={64}
                            height={64}
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

    // genarateAddon = (events) => {
    //     var arr = []
    //     if (events.event !== undefined && events.event !== null) {
    //         events.event.product.every(function (product) {
    //             events.product.every(function (item) {
    //                 if (product.id === item.id) {
    //                     arr.push(
    //                         <Media key={item.id}>
    //                             <img
    //                                 width={64}
    //                                 height={64}
    //                                 className="mr-3"
    //                                 src="holder.js/64x64"
    //                                 alt=""
    //                             />
    //                             <Media.Body>
    //                                 <p className="">{product.name}</p>
    //                                 <h6 className=""><small>Price :</small>{
    //                                     product.type[0].price + ' ' + (product.currency !== undefined ? product.currency : 'THB')
    //                                 }</h6>
    //                             </Media.Body>
    //                         </Media>
    //                     )
    //                 }
    //             })
    //         })
    //     }
    //     return arr
    // }

    genarateTickets = (events) => {
        var arr = []
        if (events.tickets !== undefined && events.tickets !== null) {
            events.tickets.map((item, index)=>(
                index === 0 ? arr.push(
                    <div key={item.product.id}>
                        <h6 className=""><small>Distance : </small>{item.ticket.title + ' ' + item.ticket.distance + ' km.'}</h6>
                        <h6 className=""><small>{item.product.name} size : </small>{item.type}</h6>
                    </div>
                ) : arr.push(
                    <div key={item.product.id}>
                        <h6 className=""><small>{item.product.name} size : </small>{item.type}</h6>
                    </div>
                )
                
            ))
            
        }
        return arr
    }

    genarateSummary = (events) => {
        var arr = []
        var total = 0
        var currency = 'BTH'
        if (events !== undefined){
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
            if (events.product !== undefined && events.product !== null) {
                events.product.map((item) => (
                    total += item.price,
                    arr.push(
                        <div className="clearfix" key={item.product.id}>
                            <p className="float-left">{item.product.name}</p>
                            <p className="float-right">{item.price + ' ' + currency}</p>
                        </div>
    
                    )
                ))
    
            }
            if (events.discount_price > 0){
                total -= events.discount_price
                arr.push(
                    <div className="clearfix" key={989}>
                        <p className="float-left">ส่วนลด</p>
                        <p className="float-right">-{events.discount_price + ' ' + currency}</p>
                    </div>
                )
            }
            if(this.state.selectedOption === '3'){
                arr.push(
                    <div className="clearfix" key={989}>
                        <p className="float-left"><span style={{color:'red'}}>charge 5%</span></p>
                        <p className="float-right">{this.calculateTotal(events) - this.calculateTotal(events)/1.05 + ' ' + currency}</p>
                    </div>
                )
            }
        }
        
        arr.push(
            <div className="clearfix" key={99}>
                <p className="float-left">Total</p>
                <p className="float-right">{this.calculateTotal(events) + ' ' + currency}</p>
            </div>
        )
        return arr
    }

    calculateTotal (events) {
        var total = 0
        if (events !== undefined ){
            if (events.tickets !== undefined && events.tickets !== null) {
                if (events.tickets.product !== undefined && events.tickets.product !== null) {
                    total += events.tickets.ticket.price
                }
                if (events.tickets.length > 0) {
                    total += events.tickets[0].ticket.price
                }
            }
            if (events.products !== undefined && events.products !== null) {
                events.products.map((item) => (
                    total += item.price
                ))
            }
            if (events.discount_price > 0){
                total -= events.discount_price
            }
            if(this.state.selectedOption === '3'){
                total *= 1.05
            }
        }
        
        return total
    }

    attachFileSlip = (file) => {
        console.log(file)
        this.setState({ file: file },()=>{
            this.onClickConfirm()
        })
    }

    renderEvent(user, events){
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
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeAddress}>Change</Button> */}
                                        </div>
                                        <p>{user ? user.fullname : ''}</p>
                                        <p>{events.shiping_address ? (events.shiping_address.address + ' ' + events.shiping_address.city + ', ' + events.shiping_address.district + ', ' + events.shiping_address.province + ' ' + events.shiping_address.zipcode) : ''}</p>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Detail</h6>
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button> */}
                                        </div>
                                        <Media>
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={events.event ? IMAGE_URL + events.event.cover : ''}
                                                alt=""
                                            />
                                            <Media.Body>
                                                <p className="">{events.event ? events.event.name : ''}</p>
                                                {this.genarateTickets(events)}
                                            </Media.Body>
                                        </Media>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Add on</h6>
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button> */}
                                        </div>
                                        {this.genarateAddon(events)}

                                    </Card.Body>
                                    {/* <Card.Body className="mb-3 border-bottom">
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
                                    </Card.Body> */}
                                    <Card.Body className="mb-3">
                                        <div className="clearfix">
                                            <h6>Summary</h6>
                                        </div>
                                        {this.genarateSummary(events)}
                                    </Card.Body>
                                    </Card>
                                </Collapse>  
                                <Card className="d-none d-lg-block d-xl-block">
                                <Card.Body className="mb-3 border-bottom">
                                        <h4>Confirm information</h4>
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Address</h6>
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeAddress}>Change</Button> */}
                                        </div>
                                        <p>{user ? user.fullname : ''}</p>
                                        <p>{events.shiping_address ? (events.shiping_address.address + ' ' + events.shiping_address.city + ', ' + events.shiping_address.district + ', ' + events.shiping_address.province + ' ' + events.shiping_address.zipcode) : ''}</p>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Detail</h6>
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button> */}
                                        </div>
                                        <Media>
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={events.event ? IMAGE_URL + events.event.cover : ''}
                                                alt=""
                                            />
                                            <Media.Body>
                                                <p className="">{events.event ? events.event.name : ''}</p>
                                                {this.genarateTickets(events)}
                                            </Media.Body>
                                        </Media>
                                    </Card.Body>
                                    <Card.Body className="mb-3 border-bottom">
                                        <div className="clearfix">
                                            <h6 style={{ marginTop: 10 }} className="float-left">Add on</h6>
                                            {/* <Button className="float-right text-color-custom" style={{ color: '#FA6400' }} variant="link" onClick={this.onClickChangeTicket}>Change</Button> */}
                                        </div>
                                        {this.genarateAddon(events)}

                                    </Card.Body>
                                    {/* <Card.Body className="mb-3 border-bottom">
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
                                    </Card.Body> */}
                                    <Card.Body className="mb-3">
                                        <div className="clearfix">
                                            <h6>Summary</h6>
                                        </div>
                                        {this.genarateSummary(events)}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} md={7} >
                                <br/>
                                <h5>Select Payment Method</h5>

                                <Form className="mb-5">
                
                                    <Form.Check
                                        custom
                                        type="radio"
                                        value="1"
                                        id="custom-radio-1"
                                        label="ชำระเงินด้วย QR Code"
                                        checked={this.state.selectedOption === "1"}
                                        onChange={this.handleOptionChange}
                                        name="pay"
                                    /> 
                                    <Card style={{ display: this.state.selectedOption === '1' ? "block" : "none" }}>
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
                                                                <ConfirmPayment uploadSlip={this.attachFileSlip}/>
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
                                        id="custom-radio-2"
                                        value="2"
                                        label="ชำระเงินโอนผ่านบัญชีธนาคาร"
                                        name="pay"
                                        checked={this.state.selectedOption === "2"}
                                        onChange={this.handleOptionChange}
                                    />
                                    <Card style={{ display: this.state.selectedOption === '2' ? "block" : "none" }}>
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
                                                <h6 className="float-right" >บจก. ธิงค์เทคโนโลยี</h6>
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
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="custom-radio-0"
                                        name="pay"
                                        value="3"
                                        checked={this.state.selectedOption === "3"}
                                        onChange={this.handleOptionChange}
                                        label={ <span style={{color:'red'}}><img width={168} className="mr-3" src={methodsPayment} alt=""/>*Charge 5%</span>}
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
                                                                createCreditCardCharge={this.updatePaymentFromCreditCard}
                                                                amount={this.calculateTotal(events)}
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
                                
                                {/* <Button className="float-right btn-custom rounded-pill px-4 ml-2 mt-5" onClick={this.onClickConfirm.bind()}>

                                    <img
                                        width={25}
                                        height={20}
                                        className="mr-1"
                                        src={iconrunningwhite}
                                        alt="runex"
                                    />Confirm
                                </Button> */}
                                <Button variant="outline-secondary" className="float-right rounded-pill px-4 mt-5" onClick={this.onClickBack.bind()}>Back</Button>
                            </Col>
                        </Row>

                    </Card.Body>
                    : ''}
            </Card>
        )
    }

    render () {
        const { user } = this.state
        const { events, event } = this.props
        return (
            event ? this.renderEvent(user, event) : this.renderEvent(user, events) 
        )
    }
}

export default ConfirmReturn