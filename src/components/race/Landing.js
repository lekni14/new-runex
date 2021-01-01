import React, { Component } from 'react'
import { Container, Row, Col, Card, Media } from 'react-bootstrap'
import iconrunning from '../../images/icon-running.svg'
import iconmarker from '../../images/icon-marker.svg'
import iconcalendar from '../../images/icon-calendar.svg'

export default class Landing extends Component {
    render () {
        return (
            <div>
                <header className="web-banner"></header>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card className="title-box bg-custom border-0 mb-5">
                                <Card.Body>
                                    {/* <Card.Title>Card Title</Card.Title> */}
                                    <h2 className="text-white text-center">SHINCHAN : SHIRO VIRTUAL RUN 2019</h2>
                                    <Row className="my-3 justify-content-md-center">
                                        <Col xs={3}>
                                            <Row>
                                                <Col xs={3} className="pr-0">
                                                    <Card className="text-center">
                                                        <Card.Body className="p-2">
                                                            <Card.Title className="mb-0 text-custom">20</Card.Title>
                                                            <p className="card-text">Sep</p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col xs={3} className="text-center p-2">
                                                    <img
                                                        width={40}
                                                        height={40}
                                                        className="rounded-circle"
                                                        src={iconrunning}
                                                        alt="Generic placeholder"
                                                    />
                                                </Col>
                                                <Col xs={3} className="pl-0">
                                                    <Card className="text-center">
                                                        <Card.Body className="p-2">
                                                            <Card.Title className="mb-0 text-custom">20</Card.Title>
                                                            <p className="card-text">Sep</p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={8} className="text-white">
                                            <Media>
                                                <img
                                                    width={20}
                                                    height={20}
                                                    className="mr-2"
                                                    src={iconcalendar}
                                                    alt="runex"
                                                />
                                                <Media.Body>
                                                    <p>20 Sep (00:00) - 22 Sep (23:59) GMT +8</p>
                                                </Media.Body>
                                            </Media>
                                            <Media>
                                                <img
                                                    width={20}
                                                    height={20}
                                                    className="mr-2"
                                                    src={iconmarker}
                                                    alt="runex"
                                                />
                                                <Media.Body>
                                                    <p>สถานแสดงพันธุ์สัตว์น้ำเฉลิมพระเกียรติ หาดแหลมเสด็จ อำเภอท่าใหม่ จังหวัดจันทบุรี </p>
                                                </Media.Body>
                                            </Media>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                            <Row className="justify-content-md-center">
                                        <Col xs md="2">
                                            {/* 1 of 3 */}
                                        </Col>
                                        <Col md="auto"><Card className="label-box bg-custom border-0 px-5 py-1 text-white"><h3>Fun Run Kits</h3></Card></Col>
                                        <Col xs md="2">
                                            {/* 3 of 3 */}
                                        </Col>
                                    </Row>
                                <Card.Body>
                                    
                                    
                                    <p>จุดเริ่มต้นของ ”การวิ่ง” ของเอคืออยากส่งแรงบันดาลใจให้คนออกมาตระหนักถึงความอันตราย ของโรคซึมเศร้าและอยากให้เห็นประโยชน์ของการออกกำลังกาย จากหลายๆลิ้งค์ข่าว และข่าวในหน้าหนังสือพิมพ์ทีมอบฉายานามว่าเอเป็น ”นางฟ้านักวิ่ง” เอต้องขอบคุณและเป็นเกียรติมากค่ะ แต่ภาพลักษณ์ของเออยากให้ออกมาเป็น
“นักวิ่งสร้างแรงบันดาลใจ” จากเจตนารมณ์แรกที่เอตั้งใจไว้ว่าจะวิ่งและทำโครงการเพื่อส่งต่อกำลังใจที่ดีให้กับทุกคนๆค่ะ “เอนักวิ่งสร้างแรงบันดาลใจ”</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
