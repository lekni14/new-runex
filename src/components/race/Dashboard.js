import React, { Component } from 'react'
import { Container, Card, Row, Col, Media, Button } from 'react-bootstrap'
import { activtyService, regEventService } from '../../services'
import { IMAGE_URL } from '../../utils/constants'
import iconcalendar from '../../images/icon-calendar.svg'
import Chart from 'react-google-charts';
import { utils } from '../../utils/utils'
import { history } from '../../store'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            event: undefined,
            activityInfo:undefined,
        }
    }

    componentDidMount () {
        const { regID } = this.props.match.params
        //this.getEvent(eventID)
        this.getRegEventDetail(regID)
    }
    getEvent (eventID) {
        // console.log(this.props.route)
        // const { eventID } = this.props.route.match.params
        activtyService.getActivityInfo(eventID).then(res => {
            if(res.data !== undefined){
                if (res.data.code === 200) {
                    this.setState({
                        activityInfo: res.data.data
                    })
                }
            }
        })
    }

    onClick = (event) => {
        const { regID } = this.props.match.params
        history.push('/add-activity/' + regID)
      }

    calculateDistance(){
        const { event, activityInfo} = this.state
        if(event && activityInfo){
            var distance = activityInfo.total_distance
            
            var finishDistance = event.tickets[0].ticket.distance
            var current = (distance * 50)/finishDistance
            if(current > 50){
                current = 50
            }
            var min = 50 - current
            return [
                ['Task', 'Hours'],

                // use formatted values
                ['สำเร็จ', { v: current, f: parseFloat(current*2).toFixed(2)+'%' }],
                ['คงเหลือ', { v: min, f: ((50 - current)*2)+'%' }],

                [null, 40]
            ]
        }else{
            if(event){
                return [
                    ['Task', 'Hours'],
    
                    // use formatted values
                    ['สำเร็จ', { v: 0, f: '0%' }],
                    ['คงเหลือ', { v: 50, f: '100%' }],
    
                    [null, 40]
                ]
            }
        }
    }

    getRegEventDetail(regEventID){
        regEventService.getRegEventDetail(regEventID).then(res => {
            if (res.data.code === 200) {
                //console.log(res.data.data)
                this.getEvent(res.data.data.event_id)
                this.setState({
                    event: res.data.data
                })
                
            }
        })
    }

    render () {
        const { event, activityInfo} = this.state
        return (
            <Container className="my-4">
                <Row>
                    <Col>
                        <h3 className="border-bottom-1 pb-2 mb-5">Dashboard</h3>
                    </Col>
                    <Col md={1} xl={1}>
                    <h6 className="text-muted mb-0">Current</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl="6">
                        <Card>
                            <Card.Body style={{ margin: 'auto',position: 'relative'}}>
                                <Chart className="chart"
                                    // width={'100%'}
                                    // height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.calculateDistance()}
                                    options={{
                                        // Just add this option
                                        pieHole: 0.8,
                                        pieStartAngle: 260,
                                        colors: ['#FA6400', '#DFE7F5'],
                                        pieSliceText: 'none',
                                        legend: 'none',
                                        slices: {
                                            2: {
                                              color: 'transparent'
                                            }
                                        }
                                    }}
                                    rootProps={{ 'data-testid': '3' }}
                                />
                                <h6 className="label-left-dashboard">0 km</h6>
                                <h6 className="label-right-dashboard">{event !== undefined ? event.tickets[0].ticket.distance+' km.' : 0 +' km.'}</h6>
                                <Card className="border-0 card-dashboard">
                                    <Card.Body>
                                        <h6 className="text-muted mb-0">Current</h6>
                                        <h3>{activityInfo ? parseFloat(Math.round(activityInfo.total_distance * 100) / 100).toFixed(2) : 0}</h3>
                                    </Card.Body>
                                </Card>
                                <Button hidden={event ? (event.event.inapp ? true : false) : false } className="rounded-pill px-4 btn-dashboard" variant="primary" onClick={this.onClick.bind(this, event)}>ส่งผลวิ่ง</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card className="py-5">
                            <Card.Body>
                                <Media className="mb-3">
                                    <img
                                        height={64}
                                        width={86}
                                        className="mr-3"
                                        src={`${event ? IMAGE_URL + event.event.cover : ''}`}
                                        alt=""
                                    />
                                    <Media.Body>
                                        <h5>{event ? event.event.name : ''}</h5>
                                    </Media.Body>
                                </Media>
                                <Row className="text-center">
                                    <Col xs="6">
                                        <h6 className="text-muted">
                                            <img
                                                height={16}
                                                className="mr-2"
                                                src={iconcalendar}
                                                alt=""
                                            />วันเริ่มส่งผลวิ่ง
                                        </h6>
                                        <h5>{event ? utils.convertDateApiToString(event.event.start_event) : ''}</h5>
                                    </Col>
                                    <Col xs="6">
                                        <h6 className="text-muted">
                                            <img
                                                height={16}
                                                className="mr-2"
                                                src={iconcalendar}
                                                alt="Generic placeholder"
                                            />วันสิ้นสุดส่งผลวิ่ง
                                        </h6>
                                        <h5>{event ? utils.convertDateApiToString(event.event.end_event) : ''}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}

