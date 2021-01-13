import React, { Component } from 'react'
import { Row, Col, Media, Card, Button, Container } from 'react-bootstrap'
import iconmedal from '../../../images/icon-medal.svg'
import iconcalendar from '../../../images/icon-calendar.svg'
import iconshirtactive from '../../../images/icon-tshirt-active.svg'
import { utils } from '../../../utils/utils'
import { IMAGE_URL, regStatusConstants } from '../../../utils/constants'
import { history } from '../../../store'
import { regEventService } from '../../../services'

export default class RaceDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ticket_options: [],
            reg_data: undefined,
        }
    }

    componentDidMount(){
        this.getRegEvent()
    }

    getRegEvent () {
        const { regID } = this.props.match.params
        // const { eventID } = this.props.route.match.params
    
        regEventService.getRegEventDetail(regID).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    reg_data: res.data.data
                })
                this.setState({
                    ticket_options: res.data.data.ticket_options
                })
            }
        })
    }

    showPrice () {
        const { ticket_options } = this.state
        var total = 0
        if (ticket_options !== undefined) {
            ticket_options.map(item => {
                total += item.total_price
            })
        }
        return total
    }

    onClickAddBtn = () => {
        const { ticket_options, event } = this.props.location.state
        history.push({
            pathname: '/addotherperson',
            state: {
                event: event,
                ticket_options: ticket_options,
                index: ticket_options.lenght + 1,
            }
        })
    }

    showPersonList () {
        var arr = []
        const { ticket_options } = this.state
        if (ticket_options !== undefined) {
            ticket_options.map((item, index) => {
                arr.push(
                    <Card.Body className="border-bottom" key={index}>
                        <h5 className="h5 mb-2">ข้อมูล - ผู้สมัครคนที่ {index + 1}</h5>
                        <Row>
                            <Col>
                                <h6 className="h5 mb-0">{item.user_option.firstname + ' ' + item.user_option.lastname}</h6>
                                <p className="custom-font mb-0 text-muted">ฺBIB : <span style={{ color: '#FA6400' }}>{item.register_number} </span></p>
                                
                                <Row>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">เลขบัตรประชาชน</p>
                                        <p className="custom-font mb-0 ">{item.user_option.citycen_id !== '' ? item.user_option.citycen_id : item.user_option.passport}</p>
                                    </Col>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">เบอร์โทร</p>
                                        <p className="custom-font mb-0">{item.user_option.phone}</p>
                                    </Col>

                                </Row>

                            </Col>
                            {/* <Col style={{ cursor: 'pointer' }} className="text-right text-custom custom-font" onClick={this.onEditTicketOptions.bind(this, index)}>แก้ไขข้อมูล</Col> */}
                        </Row>
                        <Row>
                            <Col>
                                <Row>

                                    <Col md={6}>
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
                                                <h6 className="card-text">{item.tickets[0].type}<br></br><small>{item.tickets[0].remark}</small></h6>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <p className="custom-font mb-0 text-muted">ราคา</p>
                                        <p className="custom-font mb-0" style={{ color: '#FA6400' }}>{item.total_price}</p>
                                    </Col>

                                </Row>

                            </Col>
                            <Col>
                                <p className="custom-font mb-0 text-muted">ประเภทการวิ่ง</p>
                                <p className="custom-font mb-0 ">{item.tickets[0].ticket.distance > 0 ? (item.tickets[0].ticket.title +' ' + item.tickets[0].ticket.distance + ' km.') : item.tickets[0].ticket.title }</p>
                            </Col>

                        </Row>
                    </Card.Body>
                )
            })
        }
        return arr
    }

    render () {
        const { reg_data } = this.state
        return (
            <div>
                <Container className="mt-5" >
                    <Card >
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card className="mb-5">
                                        <Card.Img variant="top" src={reg_data ? IMAGE_URL + reg_data.event.cover : ''} />
                                        <Card.Body>
                                            <h4 className="h4">{reg_data ? reg_data.event.name : ''}</h4>
                                            <p className="text-muted mb-4">ราคาค่าสมัคร</p>
                                            <h1 className="mb-0" onChange={e => this.setState({ showPrice: e.value })} style={{ color: '#FA6400' }}>{this.showPrice() + ' ' + 'THB'} </h1>
                                            
                                            <Media style={{ display: reg_data ? (reg_data.event.is_free === true ? "none" : "block") : 'none' }}>
                                                <img
                                                    width={35}
                                                    height={35}
                                                    className="mr-1"
                                                    src={iconmedal}
                                                    alt="runex"
                                                />
                                                <Media.Body style={{ display: reg_data ? (reg_data.event.is_free === true ? "none" : "block") : 'none' }}>
                                                    <h6 className="mb-1 pt-1">Finisher's Medal</h6>
                                                </Media.Body>
                                            </Media>
                                        </Card.Body>
                                        <Card.Footer className="bg-white mb-3">
                                            <h6>วันแข่งขัน</h6>
                                            <Media>
                                            <img
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                                src={iconcalendar}
                                            />
                                            <Media.Body>
                                                <span>{reg_data ? utils.convertDateTimeToDate(reg_data.event.start_event) : ''}</span>
                                            </Media.Body>
                                        </Media>
                                            
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Card className="px-4 py-3 mb-3">
                                        {this.showPersonList()}
                                        <Card.Body>
                                            <Button type="submit" className="float-right btn-custom rounded-pill px-4 ml-2 mt-5" onClick={() => history.push('/racepayment/' + reg_data.id)} hidden={reg_data ? (reg_data.status === regStatusConstants.PAYMENT_WAITING ? false : true) : true}>ชำระค่าใช้จ่าย</Button>
                                            {/* modal  */}
                                            {/* <ConditionsModal onClick={this.onClickConfirm}></ConditionsModal> */}
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
