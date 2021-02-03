/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import { Col, Button, Modal, Form, InputGroup } from "react-bootstrap";
import ThaiAddress from "react-thai-address";
import { regEventService } from '../../services';
import { utils } from '../../utils/utils';
import Swal from 'sweetalert2';

export default class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalAccess: false,
            cities: [],
            tumbons: [],
            address: undefined,
            address_no_tmp: '',
            address_no: '',
            province: '',
            district: '',
            city: '',
            postcode: '',
            phone: '',
            validated: false,
        }
        // this.handleFile = this.handleFile.bind(this);
        // this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount () {
        const { regData } = this.props
        if (regData !== null && regData !== undefined) {
            if (regData.event.category.name === 'Run') {
                
            } else if (regData.event.category.name === 'Virtual Run') {
                this.setState({ phone: regData.phone })
                if (regData.shiping_address !== null) {
                    const addr = regData.shiping_address
                    this.setState({ address_no: addr.address })
                    this.setState({ address_no_tmp: addr.address })
                    this.setState({ province: addr.province })
                    this.setState({ district: addr.district })
                    this.setState({ city: addr.city })
                    this.setState({ postcode: addr.zipcode })

                    var cities = []
                    const results = ThaiAddress.search({ province: addr.province });
                    //console.log(results);
                    results.map(item => {
                        if (!cities.includes(item.city)) {
                            //console.log(item.city)
                            cities.push(item.city)
                        }
                    })
                    this.setState({ cities: cities }, () => {
                        this.setState({ district: addr.district }, () => {
                            var tumbons = [];
                            const results = ThaiAddress.search({
                                city: this.state.district,
                                province: this.state.province
                            });
                            //console.log(results);
                            results.map(item => {
                                if (!tumbons.includes(item.tumbon)) {
                                    //console.log(item.city)
                                    tumbons.push(item.tumbon);
                                }
                            });
                            this.setState({ tumbons: tumbons });
                            this.setState({ city: addr.city })
                            this.setState({ postcode: addr.zipcode })
                        })
                    });
                }
            }
        }
    }

    onSelectedprovince = e => {
        this.setState({ province: e.target.value }, () => {
            var cities = [];
            const results = ThaiAddress.search({ province: this.state.province });
            //console.log(results);
            results.map(item => {
                if (!cities.includes(item.city)) {
                    //console.log(item.city)
                    cities.push(item.city)
                }
            })

            this.setState({ cities: cities });
            this.setState({ tumbons: [] });
            this.setState({ postcode: "" });
        });
    };

    onSelectedDistrict = e => {
        this.setState({ district: e.target.value }, () => {
            var tumbons = [];
            const results = ThaiAddress.search({
                city: this.state.district,
                province: this.state.province
            });
            //console.log(results);
            results.map(item => {
                if (!tumbons.includes(item.tumbon)) {
                    //console.log(item.city)
                    tumbons.push(item.tumbon);
                }
            });
            this.setState({ tumbons: tumbons });
            this.setState({ postcode: "" });
            this.setState({ address: undefined });
        });
    };

    onSelectedTumbon = e => {
        //console.log(e.target.value);
        const results = ThaiAddress.search({
            tumbon: e.target.value,
            city: this.state.district,
            province: this.state.province
        });
        //console.log(results);
        results.map(item => {
            if (
                item.tumbon === e.target.value &&
                item.city === this.state.district &&
                item.province === this.state.province
            ) {
                this.setState({ city: item.tumbon })
                this.setState({ postcode: '' + item.zipcode });
                this.setState({ address: item });
                //console.log(item)
            }
        });

        //this.setState({ tumbons: tumbons });
    };

    renderProvinces () {
        ThaiAddress.search({ province: "" });
        var arr = [];
        const results = ThaiAddress.provinces;

        results.map((item) => {
            arr.push(
                <option key={item} value={item}>
                    {item}
                </option>
            );
        });

        return arr;
    }

    requestUpdateEvent = () => {
        if (this.state.phone === null || this.state.phone === undefined || this.state.phone.length < 1) {
            Swal.fire({
                title: '',
                type: 'warning',
                html:
                    'กรุณาระบุเบอร์โทร',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: true,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> OK',
                confirmButtonAriaLabel: 'Thumbs up, great!'
            })
        }else if(this.state.address_no.length < 1){
            Swal.fire({
                title: '',
                type: 'warning',
                html:
                    'กรุณาระบุที่อยู่',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: true,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> OK',
                confirmButtonAriaLabel: 'Thumbs up, great!'
            })
        }else if(this.state.postcode.length < 1){
            Swal.fire({
                title: '',
                type: 'warning',
                html:
                    'กรุณาระบุที่อยู่',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: true,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> OK',
                confirmButtonAriaLabel: 'Thumbs up, great!'
            })
        }else {
            const { regData } = this.props
            var address = {
                address: this.state.address_no,
                province: this.state.province,
                district: this.state.district,
                city: this.state.city,
                zipcode: this.state.postcode
            }
            regData.shiping_address = address
            regEventService.editRegEvent(regData).then(res => {
                console.log(res)
                this.ModalClose()
            })
        }
    }

    ModalClose = () => {
        this.setState({ ModalAccess: false })
    }
    ModalShow = () => {
        this.setState({ ModalAccess: true })
    }
    render () {
        const { province, district, city, tumbons, address_no, cities, postcode, phone, validated } = this.state
        const { regData } = this.props
        const handleValidate = event => {
            console.log('validate')
            const form = event.currentTarget;
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                // this.signup()
                this.requestUpdateEvent()
            }
            this.setState({ validated: true });
        };
        return (
            <>
                {/* <Form noValidate validated={validated} onSubmit={handleValidate}> */}
                {/* <Button variant="outline-primary">Add/Edit Access</Button> */}
                <Button variant="outline-warning" onClick={this.ModalShow} hidden={regData.event.category.name === 'Run' || utils.isAfterDate(regData.event.end_event)} >
                    แก้ไขที่อยู่จัดส่ง
                </Button>

                <Modal show={this.state.ModalAccess} onHide={this.ModalClose} noValidate validated='true' onSubmit={handleValidate}>

                    <Modal.Header closeButton>
                        <Modal.Title className="h5">แก้ไขข้อมูล {regData.event.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="float-right">
                        <Form.Group controlId="regLastname">
                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    {/* <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconuser} alt="" /></InputGroup.Text> */}
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="หมายเลขโทรศัพท์"
                                    aria-describedby="inputGroupPrepend"
                                    name="phone"
                                    required
                                    defaultValue={phone}
                                    onChange={e => this.setState({ phone: e.target.value })}
                                    isValid={validated && phone ? phone.length >= 1 : false}
                                    isInvalid={validated && phone ? phone.length < 1 : false}
                                />
                                <Form.Control.Feedback type={validated ? 'valid' : 'invalid'}>Mobile phone number is required!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>ที่อยู่</Form.Label>
                                <Form.Control
                                    name="address"
                                    onChange={e => this.setState({ address_no: e.target.value })}
                                    defaultValue={address_no}
                                    as="textarea" rows="3"
                                    required
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    address is required!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>จังหวัด</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.onSelectedprovince}
                                    required
                                    value={province}
                                >
                                    <option value="">เลือกจังหวัด</option>
                                    {this.renderProvinces()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Province is required!
                                        </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>อำเภอ</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.onSelectedDistrict}
                                    required
                                    value={district}
                                >
                                    <option value="">เลือกอำเภอ</option>
                                    {cities.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    District is required!
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTumbon">
                                <Form.Label>ตำบล</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.onSelectedTumbon}
                                    required
                                    value={city}
                                >
                                    <option value="">เลือกตำบล</option>
                                    {tumbons.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    City is required!
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>รหัสไปรษณีย์</Form.Label>
                                <Form.Control
                                    required
                                    defaultValue={postcode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Postcode is required!
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="outline-primary" onClick={this.ModalClose}>
                            Close
                    </Button> */}
                        <Button variant="primary" onClick={this.requestUpdateEvent}>
                            Confirm
                        </Button>
                    </Modal.Footer>

                </Modal>
                {/* </Form> */}
            </>
        )
    }
}