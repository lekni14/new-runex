import React, { Component } from 'react'
import { Button, Media } from 'react-bootstrap'
import iconrunningwhite from '../../images/icon-running-white.svg'
import { IMAGE_URL, regStatusConstants } from '../../utils/constants';
import { history } from '../../store'

class PaymentSucc extends Component {
    render () {
        const { regEvent } = this.props
        console.log(regEvent)
        return (
            <div className="h-100 container">
                <div className="row justify-content-md-center mt-5">
                    <div className="col col-lg-2">
                        {/* 1 of 3 */}
                    </div>
                    <div className="col-md-auto">
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className="clearfix border-bottom">
                                    <h4 className="float-left">สมัครรายกาารวิ่งเสร็จสมบูรณ์</h4>
                                </div>
                                <h5 className="mt-3">รายละเอียดรายการสมัคร</h5>
                                <Media className="border-bottom pb-2">
                                    <img
                                        width={64}
                                        height={28}
                                        className="mr-3"
                                        src={regEvent ? (IMAGE_URL + regEvent.tickets[0].ticket.image) : ''}
                                        alt=""
                                    />
                                    
                                    <Media.Body style={{width: '100%'}}>
                                        <h6 className="mb-0"></h6>
                                        <p className="mb-0">Distant : {regEvent ? regEvent.tickets[0].ticket.title : ''}</p>
                                        {regEvent ? regEvent.tickets.map((item)=>(
                                            <p className="mb-3">{item.product.name} : {item.type}</p>
                                        ) ): ''}
                                        
                                        <h6 className="mb-0">หมายเลขอ้างอิง</h6>
                                        <h3 className="text-color-custom">{regEvent ? regEvent.id : ''}</h3>
                                    </Media.Body>
                                </Media>
                                <h6 className="mt-3 mb-0" hidden={regEvent ? regEvent.payment_type === regStatusConstants.PAYMENT_FREE : false}>เงื่อนไข</h6>
                                <p hidden={regEvent ? (regEvent.status !== regStatusConstants.PAYMENT_WAITING ) : false }>ยืนยันการสมัครเรียบร้อย ท่านสามารถส่งหลักฐานการชำระได้ภายใน 3 วัน ขอบคุณที่ใช้บริการ</p>
                                <p hidden={regEvent ? (regEvent.status !== regStatusConstants.PAYMENT_WAITING_APPROVE ): false}>แนบหลักฐานยืนยันการสมัครเรียบร้อย ขอบคุณที่ใช้บริการ</p>
                                <p hidden={regEvent ? (regEvent.status !== regStatusConstants.PAYMENT_SUCCESS || regEvent.payment_type === regStatusConstants.PAYMENT_FREE) : false}>ยืนยันการสมัครและชำระเงินเรียบร้อยแล้ว ขอบคุณที่ใช้บริการ</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button className="btn-custom rounded-pill px-5 py-2  mb-2" onClick={()=>history.push('/my-event')}>
                                <img
                                    width={25}
                                    height={20}
                                    className="mr-1"
                                    src={iconrunningwhite}
                                    alt="runex"
                                    
                                />รายการสมัครทั้งหมด
                            </Button>
                            
                        </div>
                        <div className="text-center">
                            <Button variant="link" onClick={()=>history.push('/')}> กลับหน้าหลัก</Button>   
                        </div>
                    </div>
                    <div className="col col-lg-2">
                        {/* 3 of 3 */}
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentSucc