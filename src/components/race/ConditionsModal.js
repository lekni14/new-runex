import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class ConditionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Isshow: false,
        }
    }
    handleClickShow () {
        this.setState({ Isshow: true })
    }
    handleClickClose () {
        this.setState({ Isshow: false })
    }

    handleClickConfirm () {
        this.setState({ Isshow: false })
        this.props.onClick()
    }
    render () {
        return (
            <>
                <Button className="btn-custom rounded-pill px-4 ml-2 custom-font"  onClick={this.handleClickShow.bind(this)}>
                    ยืนยันการสมัคร
                </Button>

                <Modal show={this.state.Isshow} onHide={this.handleClickClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>ข้อตกลง/เงื่อนไขกาารสมัคร</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>RUNEX โดย บริษัท ธิงค เทคโนโลยี จำกัด จะไม่ทำการเปลี่ยนแปลงหรือแก้ไขชื่อ อายุ และขนาดเสื้อของผู้สมัคร ไม่ว่ากรณีใดๆทั้งสิ้น 

สำหรับอีเว้นท์หรือรายการที่มีถ้วยรางวัลและเงินรางวัล หากพบว่าผู้เข้าแข่งขันไม่ตรงกันชื่อที่ลงทะเบียน RUNEX ขอสงวนสิทธิ์ในการคืนเงินค่าสมัครทุกรณี ผู้สมัครต้องกรอกข้อมูลที่เป็นจริงให้ครบทุกข้อ เพื่อสิทธิประโยชน์ของผู้สมัครในการเข้าร่วมรายการแข่งขันของ RUNEX</Modal.Body>
                    <Modal.Footer className="text-center">
                        <Button variant="outline-secondary" className="rounded-pill" onClick={this.handleClickClose.bind(this)}>
                            Close
                        </Button>
                        <Button variant="primary" className="custom-font rounded-pill btn-custom " onClick={this.handleClickConfirm.bind(this)}>
                            ตกลง
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
