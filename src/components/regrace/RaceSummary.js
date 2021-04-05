/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import { Row, Col, Media, Card, Container } from 'react-bootstrap'
import iconmedal from '../../images/icon-medal.svg'
import { utils } from '../../utils/utils'
import { regStatusConstants } from '../../utils/constants'
import { history } from '../../store'
import { regEventService } from '../../services'
import ConditionsModal from './ConditionsModal'
import Swal from 'sweetalert2'

export default class RaceSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ticket_options: [],
            logs: {}
        }
    }

    componentDidMount(){
        const { event } = this.props.location.state
        if (event === undefined) {
            history.goBack()
        }
    }

    showPrice() {
        const { ticket_options } = this.props.location.state
        var total = 0
        if (ticket_options !== undefined) {
            ticket_options.map(item => {
                total += parseFloat(item.total_price)
            })
        }
        return total
    }

    onEditTicketOptions = (index) => {
        const { ticket_options, event, ticket } = this.props.location.state
        history.push({
            pathname: '/raceedit',
            state: {
                ticket: ticket,
                event: event,
                ticket_options: ticket_options,
                index: index
            }
        })
        history.go(0)
    }

    onClickAddBtn = () => {
        const { ticket_options, event, ticket } = this.props.location.state
        console.log(ticket_options.length+1)
        history.push({
            pathname: '/addotherperson',
            state: {
                tickets: ticket,
                event: event,
                ticket_options: ticket_options,
                index: ticket_options.length + 1
            }
            // state: {
            //     event: event,
            //     ticket_options: ticket_options,
            //     index: ticket_options.lenght + 1,
            // }
        })
        history.go(0)
    }

    onClickConfirm = async (e) => {
        if (e !== undefined && e !== null) {
            e.preventDefault()
        }

        const { ticket_options, event, ticket } = this.props.location.state

        const total = this.showPrice()
        let status = regStatusConstants.PAYMENT_WAITING
        let paymentType = ''
        var discount = 0
        if (event.isFreeEvent === 0) {
            status = regStatusConstants.PAYMENT_SUCCESS
            paymentType = regStatusConstants.PAYMENT_FREE
            const params = {
                event_id: event.id,
                event_code: event.code,
                owner_id: event.user_id,
                regs:{
                    event: event,
                    tickets: ticket,
                    status: status,
                    ticket_id: ticket.id,
                    payment_type: paymentType,
                    total_price: total,
                    promo_code: this.state.promoText,
                    discount_price: discount,
                    coupon: this.state.coupon,
                    reg_date: utils.dateNow(),
                    ticket_options: ticket_options,
                    image: ''
                },
                
            }
            Swal.fire({
                title: 'Please wait...',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    regEventService.regRaceEvent(params).then(res => {
                        Swal.close()
                        if (res.code === 200) {
                            history.push({
                                pathname: '/payment',
                                state: {
                                    param: params,
                                    event: event,
                                    regdata: res.data.regs[0]
                                }
                            })
                            history.go(0)
                        } else {
                            Swal.fire({
                                type: 'warning',
                                title: 'Failed',
                                showConfirmButton: false,
                                timer: 3000
                            })
                        }
                    }).catch(err => {
                        Swal.close()
                        Swal.fire({
                            type: 'warning',
                            title: 'Failed',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
                }
            })
        } else {
            const params = {
                event_id: event.id,
                event_code: event.code,
                owner_id: event.user_id,
                regs:{
                    event: event,
                    tickets: ticket,
                    event_code: event.code,
                    ticket_id: ticket.id,
                    status: status,
                    payment_type: paymentType,
                    total_price: total,
                    promo_code: this.state.promoText,
                    discount_price: discount,
                    coupon: this.state.coupon,
                    reg_date: utils.dateNow(),
                    ticket_options: ticket_options,
                    image: ''
                },
                
            }
            // console.log(params)
            // this.setState({logs:params})
            Swal.fire({
                title: 'Please wait...',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    regEventService.regRaceEvent(params).then(res => {
                        console.log(res)
                        Swal.close()
                        if (res.code === 200) {
                            history.push({
                                pathname: '/payment',
                                state: {
                                    param: params,
                                    event: event,
                                    regdata: res.data.regs[0]
                                }
                            })
                            history.go(0)
                        } else {
                            Swal.fire({
                                type: 'warning',
                                title: 'Failed',
                                showConfirmButton: false,
                                timer: 3000
                            })
                        }
                    }).catch(err => {
                        Swal.close()
                        Swal.fire({
                            type: 'warning',
                            title: 'Failed',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
                }
            })
        }
    }

    showPersonList() {
        var arr = []
        const { ticket_options } = this.props.location.state
        if (ticket_options !== undefined) {
            ticket_options.map((item, index) => {

                arr.push(
                    <Card.Body className="border-bottom" key={index}>
                        <h5 className="h5 mb-2">ข้อมูล - ผู้สมัคร</h5>
                        <Row>
                            <Col>
                                <h6 className="h5 mb-0">{item.user_option.firstname + ' ' + item.user_option.lastname}</h6>
                                <Row>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">{'เลขบัตรประชาชน'}</p>
                                        <p className="custom-font mb-0 ">{item.user_option.citycen_id}</p>
                                    </Col>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">เบอร์โทร</p>
                                        <p className="custom-font mb-0">{item.user_option.phone}</p>
                                    </Col>

                                </Row>

                            </Col>
                            <Col style={{ cursor: 'pointer' }} className="text-right text-custom custom-font" onClick={this.onEditTicketOptions.bind(this, index)}>แก้ไขข้อมูล</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>

                                    {/* <Col md={6}>
                                        <p className="custom-font mb-0 text-muted">ขนาดเสื้อ</p>
                                        <Card style={{ borderColor: '#FA6400', width: 100 }} className="text-center" >
                                            <Card.Body className="p-2" style={{ color: '#FA6400' }}>

                                                <img
                                                    width={25}
                                                    height={20}
                                                    className="mr-1"
                                                    src={iconshirtactive}
                                                    alt="runex"
                                                />
                                                <h6 className="card-text">{item.tickets[0].sizes}<br></br><small>{item.tickets[0].remark}</small></h6>
                                            </Card.Body>
                                        </Card>
                                    </Col> */}
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">Price</p>
                                        <p className="custom-font mb-0" style={{ color: '#FA6400' }}>{item.total_price}</p>
                                    </Col>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">Shirts</p>
                                        <p className="custom-font mb-0">{`${item.shirts.size} ${item.shirts.chest}`}</p>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <p className="custom-font mb-0 text-muted">ประเภทการวิ่ง</p>
                                <p className="custom-font mb-0 ">{item.tickets.distance > 0 ? (item.tickets.title + ' ' + item.tickets.distance + ' km.') : item.tickets.title}</p>
                            </Col>

                        </Row>
                        <Row>
                        <Col>
                                <p className="custom-font mb-0 text-muted">ที่อยู่จัดส่ง</p>
                                <p className="custom-font mb-0 ">{item.user_option.address}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                )
            })
        }
        return arr
    }

    render() {
        if (this.props.location.state === undefined) {
            history.goBack()
        }
        const { event } = this.props.location.state
        
        return (
            <div>
                <Container className="mt-5" >
                    <Card >
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card className="mb-5">
                                        <Card.Img variant="top" src={event ? event.cover : ''} />
                                        <Card.Body>
                                            <h4 className="h4">{event ? event.name : ''}</h4>
                                            <p className="text-muted mb-4">ราคาค่าสมัคร</p>
                                            <h1 className="mb-0" onChange={e => this.setState({ showPrice: e.value })} style={{ color: '#FA6400' }}>{this.showPrice() + ' THB'} </h1>
                                            {/* <p className="text-muted mb-4" style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>(including. postage fee)</p> */}
                                            <Card.Title style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>Finisher’s Award</Card.Title>
                                            <Media style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>
                                                <img
                                                    width={35}
                                                    height={35}
                                                    className="mr-1"
                                                    src={iconmedal}
                                                    alt="runex"
                                                />
                                                <Media.Body style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>
                                                    <h6 className="mb-1 pt-1">Finisher's Medal</h6>
                                                </Media.Body>
                                            </Media>
                                        </Card.Body>
                                        <Card.Footer className="bg-white mb-3">
                                            <h6>Hurry! Registration close in</h6>
                                            <ul className="list-group list-group-horizontal-md text-center">
                                                <li className="list-group-item px-3 border-0">
                                                    <h6>{event ? utils.convertDateApiToString(event.end_reg) : ''}<small className="ml-1 text-muted"></small></h6>
                                                </li>
                                                {/* <li className="list-group-item px-3 border-0">
                                            <h6>13<small className="ml-1 text-muted">days</small></h6>
                                        </li>
                                        <li className="list-group-item px-3 border-0">
                                            <h6>7<small className="ml-1 text-muted">hours.</small></h6>
                                        </li>
                                        <li className="list-group-item px-3 border-0">
                                            <h6>45<small className="ml-1 text-muted">mins.</small></h6>
                                        </li>
                                        <li className="list-group-item px-3 border-0">
                                            <h6>15<small className="ml-1 text-muted">secs</small></h6>
                                        </li> */}
                                            </ul>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Card className="px-4 py-3 mb-3">
                                        {this.showPersonList()}
                                        <Card.Body >
                                            {/* <button style={{ display: event ? (event.category === category.VR ? "none" : "block") : 'none' }} type="button"  className="btn btn-outline-primary rounded-pill custom-font mr-2 " onClick={this.onClickAddBtn}>+  เพิ่มคนสมัคร</button> */}
                                            {/* style={{ display: ticket_options[0].tickets.category === 'single' ? "none" : '' }} */}
                                            {/* <Button type="submit" className="btn-outline-primary rounded-pill" >
                                        ยืนยัน</Button> */}
                                            {/* modal  */}
                                            <ConditionsModal onClick={this.onClickConfirm}></ConditionsModal>
                                            {/* modal  */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}
