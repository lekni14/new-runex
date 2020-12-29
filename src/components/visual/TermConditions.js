import React, { Component } from 'react'
import { Row, Col, Media, Card, Container, Button } from 'react-bootstrap'

import ConditionsModal from './ConditionsModal'

import iconmedal from '../../../images/icon-medal.svg'
import moment from 'moment'
import { utils } from '../../../utils/utils'
import { IMAGE_URL } from '../../../utils/constants'
import { history } from '../../../store'
import { eventService } from '../../../services';


export default class TermConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
        }
    }
    componentDidMount () {
        this.getEvent()
    }

    getEvent () {
        const { eventID } = this.props.match.params
        // const { eventID } = this.props.route.match.params

        eventService.getEventInfo(eventID).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    event: res.data.data.event
                })
            }
        })
    }
    render () {
        const { event } = this.state
        console.log(event)
        return (
            <div>
                <Container className="mt-5" >
                    {/* <Card >
                        <Card.Body> */}
                    <Row>
                        <Col md={4}>
                            <Card className="mb-2 border-0">
                                <Card.Img variant="top" src={event ? IMAGE_URL + event.cover : ''} />
                                <Card.Body>
                                    <h4 className="h4">{event ? event.name : ''}</h4>
                                    <p>ราคาค่าสมัคร</p>
                                    <h3 className="h3 text-custom">฿ 299.00</h3>
                                    <h4>Finisher’s Award</h4>
                                    <Media>
                                        <img
                                            width={16}
                                            height={16}
                                            className="mr-3"
                                            src={iconmedal}
                                            alt={event ? event.name : ''}
                                        />
                                        <Media.Body>
                                            <h6 className="h6">Finisher's Medal</h6>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                                {/* <Card.Body className="p-0">
                                            <Row>
                                                <Col>
                                                    <h5 className="h4 mb-0">Order Code</h5>
                                                    <p>90ASRUNEX</p>
                                                </Col>
                                                <Col>
                                                    <h6 className="h6 mb-0 mt-3">ลงทะเบียนวันที่ </h6>
                                                    <p className="h6">12 ธ.ค. 2562</p>
                                                </Col>
                                            </Row>

                                        </Card.Body> */}
                                {/* <Card.Img variant="top" src={event ? IMAGE_URL + event.cover : ''} /> */}
                                {/* <Card.Body className="p-0">
                                            <h5 className="h5">Details</h5>
                                            <Media>
                                                <img
                                                    // width={64}
                                                    height={64}
                                                    className="mr-3"
                                                    src={event ? IMAGE_URL + event.cover : ''}
                                                    alt={event ? event.name : ''}
                                                />
                                                <Media.Body>
                                                    <h6>{event ? event.name : ''}</h6>
                                                    <p>จำนวนที่สมัคร : 12คน</p>
                                                </Media.Body>
                                            </Media>
                                            <p className="text-muted mb-4" style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>(including. postage fee)</p>
                                            <Card.Title style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>Finisher’s Award</Card.Title>
                                            <Media style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>
                                                <img
                                                    width={35}
                                                    height={35}
                                                    className="mr-1"
                                                    src={iconmedal}
                                                    alt="runex"
                                                />
                                                <Media.Body style={{ display: event.event ? (event.event.is_free === true ? "none" : "block") : 'none' }}>
                                                    <h6 className="mb-1 pt-1">Finisher's Medal</h6>
                                                </Media.Body>
                                            </Media>
                                        </Card.Body> */}
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card className="px-4 py-3 mb-3">
                                <Card.Body className="border-bottom">
                                    <h5 className="h5 mb-2">ข้อมูล - ผู้เข้าแข่งขันคนที่ 1</h5>
                                    <Row>
                                        <Col>
                                            <h6 className="h5 mb-0">กุลชาติ เค้นา</h6>
                                            <Row>
                                                <Col>
                                                    <p className="custom-font mb-0 text-muted">เลขบัตรประชาชน</p>
                                                    <p className="custom-font mb-0 ">xxx-xxxx-8999</p>
                                                </Col>
                                                <Col>
                                                    <p className="custom-font mb-0 text-muted">เบอร์โทร</p>
                                                    <p className="custom-font mb-0">089-496-9345</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="text-right text-custom custom-font">แก้ไขข้อมูล</Col>
                                    </Row>
                                </Card.Body>
                                {/* <Card.Body className="border-bottom">
                                    <h5 className="h5 mb-2">ข้อมูล - ผู้เข้าแข่งขันคนที่ 1</h5>
                                    <Row>
                                        <Col>
                                            <h6 className="h5 mb-0">กุลชาติ เค้นา</h6>
                                            <Row>
                                                <Col>
                                                    <p className="custom-font mb-0 text-muted">เลขบัตรประชาชน</p>
                                                    <p className="custom-font mb-0 ">xxx-xxxx-8999</p>
                                                </Col>
                                                <Col>
                                                    <p className="custom-font mb-0 text-muted">เบอร์โทร</p>
                                                    <p className="custom-font mb-0">089-496-9345</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="text-right text-custom custom-font">แก้ไขข้อมูล</Col>
                                    </Row>
                                </Card.Body> */}
                                <Card.Body>
                                    <button type="button" className="btn btn-outline-primary rounded-pill custom-font">+  เพิ่มคนสมัคร</button>
                                    {/* <Button type="submit" className="btn-outline-primary rounded-pill" >
                                        ยืนยัน</Button> */}
                                    {/* modal  */}
                                        <ConditionsModal></ConditionsModal>
                                    {/* modal  */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/* </Card.Body>
                    </Card> */}
                </Container>
            </div>
        )
    }
}
