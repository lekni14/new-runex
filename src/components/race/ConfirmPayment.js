import React, { Component } from 'react'
import iconupload from '../../images/icon-upload-file.svg'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import icon from '../../images/icon-upload-logo.svg'
import iconreceipt from '../../images/icon-receipt.svg'
import Resizer from 'react-image-file-resizer'
// import logoBank2 from '../../images/b2-logo.png'

export default class ConfirmPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false,
            file: null,
            uploadEnable: false,
            cURL: null
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleClose = () => {
        this.setState({ show: false, setShow: false })
    }
    handleShow = () => {
        this.setState({ show: true, setShow: true })
    }
    handleChange(event) {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                600,
                1400,
                'JPEG',
                100,
                0,
                blob => {
                    var file = new File([blob], "uploaded.jpg", { type: "image/jpeg", lastModified: Date.now() })
                    this.setState({file:file})
                },
                'blob'
            )
        }
        
        this.setState({uploadEnable:true})
        
        this.setState({
          cURL: URL.createObjectURL(event.target.files[0])
        })
    }
    onClickUpload=()=>{
        this.props.uploadSlip(this.state.file)
        this.setState({ show: false, setShow: false })
    }

    render () {
        // const [show, setShow] = useState(false);

        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);

        return (
            <div>
                <button type="button" className="btn btn-outline-warning float-right rounded-pill" onClick={this.handleShow}><img width="25" height="20" className="mr-1" src={iconupload} alt="runex" />อัปโหลดสลิป</button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>แนบหลักฐานการชำระเงิน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center pt-5">
                        <Row>
                            <Col md={12}>
                            <img style={{ display: this.state.file  ? "none" : "" }}
                                // width={25}
                                height={44}
                                className="mr-3 my-2"
                                src={iconreceipt}
                            />
                            <p style={{ display: this.state.file  ? "none" : "" }} className="text-muted mb-5">ยังไม่มีรูปหลักฐาน</p>
                            <img style={{ display: !this.state.file  ? "none" : "block" }}
                                width={400}
                                // height={44}
                                // className="mr-3 my-2"
                                src={this.state.cURL}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>  
                                <div className="upload-btn-wrapper">
                                    <button className="btn btn-outline-dark"> <img
                                        width={25}
                                        height={25}
                                        className="mr-3"
                                        src={icon}
                                    />เลือกรูปภาพ</button>
                                    <input type="file" name="myfile" onChange={this.handleChange} />
                                </div>
                                {/* <Button variant="outline-dark mt-5">
                                    
                                    <img
                                        width={25}
                                        height={25}
                                        className="mr-3"
                                        src={icon}
                                    />เลือกรูปภาพ
                                </Button> */}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ยกเลิก
                        </Button>
                        <Button variant="outline-warning" disabled={!this.state.uploadEnable} onClick={this.onClickUpload.bind()}>ยืนยัน</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
