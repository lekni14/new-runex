import React from 'react'
import { Col, Row, Media, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { IMAGE_URL, regStatusConstants } from '../../utils/constants';
import { history } from '../../store'
import Swal from 'sweetalert2'
import { utils } from '../../utils/utils';
import EditAddress from './EditAddress'
import { Link } from 'react-router-dom';

class MyEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }

    // componentDidMount() {
    //     this.getEvent();
    // }

    // getEvent() {
    //     regEventService.myRegEvents().then(res => {
    //         //console.log(res)
    //         if (res.data.code === 200) {
    //             if (res.data.data != null) {
    //                 this.setState({
    //                     events: res.data.data
    //                 })
    //             }
    //         }

    //     })
    // }

    onClick = (event) => {
        if (event.event.category.name === 'Run') {
            if (event.status === regStatusConstants.PAYMENT_WAITING) {
                history.push('/racepayment/' + event.id)
            } else if (event.status === regStatusConstants.PAYMENT_WAITING_APPROVE) {
                Swal.fire({
                    title: '<strong>กำลังอยู่ระหว่างตรวจสอบการชำระเงิน<u></u></strong>',
                    type: 'info',
                    html:
                        'คุณสามารถสอบถามรายละเอียดเพิ่มเติมที่ Line <b>runex.co</b>, \n' +
                        '<a href="http://line.me/ti/p/~runex.co">runex.co</a> ' +
                        'ขอบคุณที่ใช้บริการค่ะ',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: true,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Thank You',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                })
                //history.push('/add-activity')
            } else if (event.status === regStatusConstants.PAYMENT_SUCCESS) {
                //history.push('/add-activity/' + event.id)
            }
        } else {
            if (event.status === regStatusConstants.PAYMENT_WAITING) {
                history.push('/payment-return/' + event.id)
            } else if (event.status === regStatusConstants.PAYMENT_WAITING_APPROVE) {
                Swal.fire({
                    title: '<strong>กำลังอยู่ระหว่างตรวจสอบการชำระเงิน<u></u></strong>',
                    type: 'info',
                    html:
                        'คุณสามารถสอบถามรายละเอียดเพิ่มเติมที่ Line <b>runex.co</b>, \n' +
                        '<a href="http://line.me/ti/p/~runex.co">runex.co</a> ' +
                        'ขอบคุณที่ใช้บริการค่ะ',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: true,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Thank You',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                })
                //history.push('/add-activity')
            } else if (event.status === regStatusConstants.PAYMENT_SUCCESS) {
                history.push('/add-activity/' + event.id)
            }
        }

    }

    statusColor(status) {
        if (status === regStatusConstants.PAYMENT_WAITING) {
            return '#494E52'
        } else if (status === regStatusConstants.PAYMENT_WAITING_APPROVE) {
            return '#F7B500'
        } else if (status === regStatusConstants.PAYMENT_SUCCESS) {
            return '#5EB503'
        }
    }

    statusTH(status) {
        if (status === regStatusConstants.PAYMENT_WAITING) {
            return 'รอชำระเงิน'
        } else if (status === regStatusConstants.PAYMENT_WAITING_APPROVE) {
            return 'รอการตรวจสอบ'
        } else if (status === regStatusConstants.PAYMENT_SUCCESS) {
            return 'สำเร็จแล้ว'
        }
    }

    getLink(id, status) {
        if (status === regStatusConstants.PAYMENT_WAITING) {
            return '#'
        } else if (status === regStatusConstants.PAYMENT_WAITING_APPROVE) {
            return '/dashboard/' + id
        } else if (status === regStatusConstants.PAYMENT_SUCCESS) {
            return '/dashboard/' + id
        }
    }

    getRunLink(id) {
        return '/racedashboard/' + id
    }

    render() {
        return (
            <div className="container">
                <Row className="mt-5">
                    <Col xs={12} md={12}>
                        <div className="clearfix">
                            <h4 className="float-left latest-events">My Events</h4>
                            {/* <Link to="/privateevent"><dt className="float-right">See all</dt></Link> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-none d-lg-block d-xl-none d-md-block border-bottom" md={8}><h6>Order Number</h6></Col>
                    <Col className="d-none d-lg-block d-xl-none d-md-block border-bottom text-right" md={4}><h6>Payment Status</h6></Col>
                </Row>
                <Row >
                    <Col sm={12} md={12}>
                        <ul className="list-group">
                            {this.state.events.map((event, i) => {
                                console.log(event)
                                return (

                                    <li className="list-group-item" key={i}>
                                        <Row>
                                            <Col lg="8" md="6">
                                                <Media >
                                                    <Link to={event.event.category.name === 'Run' ? this.getRunLink(event.id) : this.getLink(event.id, event.status)}>
                                                        <Image className="mr-3" height="64" src={event.event.coverThumbnail === '' ? `${event.event.cover}` : `${event.event.cover_thumb}`} rounded /></Link>
                                                    <Media.Body>
                                                        <h4>{event.event.name}</h4>
                                                        <h6 className="text-custom">

                                                            <span className="text-caption">Order:</span><Link style={{ color: '#FA6400' }} to={event.event.category.name === 'Run' ? this.getRunLink(event.id) : this.getLink(event.id, event.status)}> {event.id}
                                                            </Link><br />
                                                            <EditAddress regData={event} />
                                                        </h6>
                                                    </Media.Body>
                                                </Media>
                                            </Col>
                                            <Col sm="4" md="6" lg="4" >
                                                <div className="clearfix">
                                                    <div >
                                                        <p className="mb-0 label-component">Payment Status</p>
                                                        <h6 className="float-left" style={{ color: this.statusColor(event.status) }}>{this.statusTH(event.status)}</h6>

                                                    </div>
                                                    <div className="float-right">

                                                        <Button variant="outline-secondary rounded-pill btn-list-component" onClick={this.onClick.bind(this, event)} hidden={(event.status === regStatusConstants.PAYMENT_WAITING || (event.event.inapp || utils.isAfterDate(event.event.end_event) ? true : false))}>ส่งระยะ</Button>
                                                        <Button variant="outline-danger rounded-pill btn-list-component" onClick={this.onClick.bind(this, event)} hidden={event.status !== regStatusConstants.PAYMENT_WAITING || utils.isAfterDate(event.event.end_event)}>แจ้งชำระเงิน</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            {/* <Col sm="4" className="text-right">
                        <Button variant="outline-secondary rounded-pill">ส่งระยะ</Button>
                      </Col> */}
                                        </Row>
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default MyEvent
