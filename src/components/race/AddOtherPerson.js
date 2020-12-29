import React, { Component } from 'react'
import { Row, Col, Media, Card, Button, Form, Container } from 'react-bootstrap'
import iconmedal from '../../../images/icon-medal.svg'
import iconshirt from '../../../images/icon-shirt.svg'
import iconshirtactive from '../../../images/icon-tshirt-active.svg'
import ThaiAddress from "react-thai-address";
// import iconrunning from '../../images/icon-running.svg'
import iconrunningwhite from '../../../images/icon-running-white.svg'
import { utils } from '../../../utils/utils'
import { IMAGE_URL } from '../../../utils/constants'
import { history } from '../../../store'
import { CountryDropdown} from 'react-country-region-selector'
import Swal from 'sweetalert2'
import ReactDatePicker from 'react-datepicker'

export default class RaceProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(utils.getUser()),
            fullname: '',
            citycen_id: '',
            passport: '',
            phone: '',
            birthdate: '',
            birthdateApi: '',
            gender: '',
            blood_type: '',
            distant: 'Select distant',
            cities: [],
            tumbons: [],
            address: undefined,
            address_no_tmp: '',
            address_no: '',
            province: '',
            district: '',
            city: '',
            postcode: '',
            validated: false,
            hasAddress: false,
            isVR: true,
            firstname_th: '',
            lastname_th: '',
            firstname: '',
            lastname: '',
            toggleEditAddress: false,
            event: {},
            select_ticket: 'ระบุระยะ, Distance',
            select_distance: 'ระบุระยะ, Distance',
            productSize: -1,
            productOnTicketSize: -1,
            products: [],
            productTickets: [],
            size: undefined,
            priceShow: 0,
            selectTicket: undefined,
            reload: false,
            ticket: {},
            country: 'Thailand',
            emergency_phone: '',
            emergency_contact: '',
            citycen_type: 'CiticenID',
            reciept_type: 'yourself',
        };
    }

    componentDidMount () {
        const { event } = this.props.location.state
        this.setState({ event: event })
    }

    onSelectBirthdate = (e) => {
        //`${this.state.toDateReg}T${this.state.toTimeReg}:00`,
        this.setState({ birthdateApi: utils.convertDateToApi(e) })
        this.setState({ birthdate: e })
    }

    onSelectGender = e => {
        this.setState({ gender: e.target.value })
    }

    onSelectCitycen = e => {
        this.setState({ citycen_type: e.target.value })
    }

    onChangeCitycenValue = e => {
        const { citycen_type } = this.state
        if (citycen_type === 'CiticenID') {
            this.setState({ citycen_id: e.target.value })
        } else {
            this.setState({ passport: e.target.value })
        }
    }

    onSelectBloodType = e => {
        this.setState({ blood_type: e.target.value })
    }

    selectCountry (val) {
        this.setState({ country: val });
    }

    selectRegion (val) {
        this.setState({ region: val });
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

    onChangeTicket = (e) => {
        const { event } = this.state
        event.ticket.map((item, index) => {
            if (item.id === e.target.value) {
                //console.log(e.target.value)
                this.setState({ ticket: item })
                //this.setState({select_ticket:e.target.value})
                this.setState({ selectTicket: undefined })
                //console.log(item)
            }
        })


    }

    onSelectedSize = (size, product, tick) => {
        // const { reload } = this.state
        // const data = {
        //     product: product,
        //     type: size.name,
        //     remark: size.remark,
        //     ticket: this.state.ticket
        // }
        // this.setState({ selectTicket: data }, () => {
        //     //console.log(this.state.selectTicket)
        // })
        // this.setState({ reload: !reload })
        const { productTickets, reload } = this.state
        var arr = productTickets
        var currentIndex = this.checkTicketIndex(product)
        if (currentIndex !== -1) {
            arr.splice(currentIndex, 1)
            const item = {
                product: product,
                type: size.name,
                price: size.price,
                remark: size.remark,
                ticket: this.state.ticket
            }
            arr.push(item)
        } else {
            //products.splice(currentIndex, 1)
            const item = {
                product: product,
                type: size.name,
                price: size.price,
                remark: size.remark,
                ticket: this.state.ticket
            }
            arr.push(item)
        }
        this.setState({ productTickets: arr })
        this.setState({ reload: !reload })
    }

    onSelectedProduct = (isDeselect, item, type) => {
        const { products, reload } = this.state
        var arr = products
        var currentIndex = this.checkProductIndex(item)
        if (isDeselect) {
            if (currentIndex !== -1) {
                arr.splice(currentIndex, 1)
            }
        } else {
            if (currentIndex !== -1) {
                arr.splice(currentIndex, 1)
                const product = {
                    id: item.id,
                    type: type.name,
                    price: type.price,
                    product: item
                }
                arr.push(product)
            } else {
                //products.splice(currentIndex, 1)
                const product = {
                    id: item.id,
                    type: type.name,
                    price: type.price,
                    product: item
                }
                arr.push(product)
            }
        }
        this.setState({ products: arr })
        this.setState({ reload: !reload })
    }

    checkProductIndex = (item) => {
        const { products } = this.state
        var check = -1
        products.map((element, index) => {
            if (element.id === item.id) {
                check = index
            }
        })
        return check
    }

    checkProductAndSize = (item, type) => {
        const { products } = this.state
        var check = false
        products.map((element) => {
            if (element.id === item.id && element.type === type.name) {
                check = true
            }

        })
        return check
    }

    checkTicketIndex = (product, type) => {
        const { productTickets } = this.state
        var check = -1
        productTickets.map((element, index) => {
            if (element.product.id === product.id) {
                check = index
            }
        })
        return check
        // if (selectTicket === undefined) {
        //     return false
        // }
        // if (product.id === selectTicket.product.id && selectTicket.type === type.name) {
        //     check = true
        // }
        // return check
    }

    checkProductTicket = (product, type) => {
        const { productTickets } = this.state
        var check = false
        productTickets.map((element) => {
            if (product.id === element.product.id && element.type === type.name) {
                check = true
            }

        })
        return check
    }

    showCitycen () {
        const { citycen_type, citycen_id, passport } = this.state
        if (citycen_type === 'CiticenID') {
            return citycen_id
        } else {
            return passport
        }
    }

    showPrice () {
        const { products, ticket } = this.state
        const { event } = this.props.location.state
        var total = 0
        if (event.ticket !== undefined && event.ticket !== null) {
            if (ticket !== undefined) {
                // if (event.ticket.length > 0) {
                //     total = event.ticket[0].price
                //     products.map((element) => (
                //         total += element.price
                //     ))
                // }
                if (ticket.price !== undefined) {
                    total = ticket.price
                    products.map((element) => (
                        total += element.price
                    ))
                }
            }
        }
        // if (total === 0) {
        //     return 'ฟรี'
        // }
        return total
    }

    isSold (event) {
        var check = false
        event.product.map(item => {
            if (item.status === 'sold') {
                check = true
            }
        })
        return check
    }

    saveData = () => {
        const { index, ticket_options } = this.props.location.state
        var address = {
            address: this.state.address_no,
            province: this.state.province,
            district: this.state.district,
            city: this.state.city,
            zipcode: this.state.postcode
        }

        var data = this.state.user
        data.birthdate = utils.convertDateToApi(this.state.birthdateApi)
        data.phone = this.state.phone
        data.passport = this.state.passport
        data.emergency_contact = this.state.emergency_contact
        data.emergency_phone = this.state.emergency_phone
        data.gender = this.state.gender
        data.citycen_id = this.state.citycen_id
        data.address = [address]
        data.firstname = this.state.firstname
        data.lastname = this.state.lastname
        data.blood_type = this.state.blood_type
        data.nationality = this.state.country
        data.fullname = this.state.firstname + ' ' + this.state.lastname
        var check = 0
        const { productTickets, ticket, event, products } = this.state
        if (ticket.id === undefined || ticket.id === null) {
            Swal.fire(
                '',
                'Please select distance.',
                'warning'
            )
        } else if (ticket.product != null && productTickets.length === 0) {
            Swal.fire(
                '',
                'Please select shirt size.',
                'warning'
            )
        } else {

            if (ticket.product !== null) {
                ticket.product.map((item) => (
                    item.show ? check += 1 : check += 0
                ))
                if (productTickets.length === check) {
                    let ticket_option = {
                        user_option: data,
                        product: products,
                        tickets: productTickets,
                        total_price: this.showPrice(),
                        reciept_type : this.state.reciept_type
                    }
                    ticket_options.push(ticket_option)
                    history.push({
                        pathname: '/racesummary',
                        state: {
                            ticket: productTickets,
                            product: products,
                            event: event,
                            ticket_options: ticket_options,
                            index: index
                        }
                    })

                } else {
                    Swal.fire(
                        '',
                        'Please select product on ticket.',
                        'warning'
                    )
                }
            } else if (ticket.price === 0) {
                var arr = productTickets
                const item = {
                    product: {},
                    type: '',
                    price: 0.00,
                    ticket: ticket
                }
                arr.push(item)
                this.setState({ productTickets: arr }, () => {
                    let ticket_option = {
                        user_option: data,
                        product: products,
                        tickets: productTickets,
                        total_price: this.showPrice(),
                        reciept_type : this.state.reciept_type
                    }
                    ticket_options.push(ticket_option)
                    history.push({
                        pathname: '/racesummary',
                        state: {
                            ticket: ticket,
                            product: productTickets,
                            event: event,
                            ticket_options: ticket_options,
                            index: index
                        }
                    })
                })
            }
            //}
        }
    }

    onClickConfirm = () => {
        this.saveData()
    }

    render () {

        const { validated, birthdate, gender, phone, address_no, province, district, postcode, city } = this.state
        const { ticket, productOnTicketSize, blood_type, country, emergency_contact, emergency_phone } = this.state
        const { event, index } = this.props.location.state
        const handleValidate = e => {
            const form = e.currentTarget;
            e.preventDefault();
            if (form.checkValidity() === false) {
                e.stopPropagation();
            } else {
                //
                this.onClickConfirm()
            }
            this.setState({ validated: true });

        }

        return (
            <div>
                <Container className="mt-5" >
                    <Card >
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card className="mb-5">
                                        <Card.Img variant="top" src={event ? IMAGE_URL + event.cover : ''} />
                                        <Card.Body>
                                            <h4 className="h4">{event ? event.name : ''}</h4>
                                            <p className="text-muted mb-4" style={{ color: '#FA6400', display: ticket.price !== undefined ? "block" : 'none' }} >ราคาค่าสมัคร</p>
                                            <h1 className="mb-0" style={{ color: '#FA6400', display: ticket.price !== undefined ? "block" : 'none' }}>{this.showPrice() + ' ' + 'THB'} </h1>
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
                                    <Card>
                                        <Card.Body>
                                    <Card.Title>กรอกข้อมูลผู้สมัคร คนที่ {index}</Card.Title>
                                            <Form className="mb-5" validated={validated} onSubmit={handleValidate}>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="validationCustom01">
                                                        <Form.Label>ชื่อ,Name<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={this.state.firstname}
                                                            placeholder="First name"
                                                            onChange={e => this.setState({ firstname: e.target.value })}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="validationCustom02">
                                                        <Form.Label>นามสกุล, Last name<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={this.state.lastname}
                                                            placeholder="Last name"
                                                            onChange={e => this.setState({ lastname: e.target.value })}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                </Form.Row>

                                                <Form.Group controlId="formBasicBirthday">
                                                    <Form.Row>
                                                        <Col xs={5}>
                                                            <Form.Label>บัตรประชาชน, Passport<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={this.state.citycen_type} as="select" onChange={this.onSelectCitycen} required>
                                                                <option value="CiticenID">บัตรประชาชน</option>
                                                                <option value="Passport">Passport</option>
                                                            </Form.Control>
                                                        </Col>
                                                        <Col xs={7}>
                                                            <Form.Label>&nbsp;<span className="text-danger"> </span></Form.Label>
                                                            <Form.Control value={this.showCitycen()} minLength='13' type="number" placeholder="ระบุหมายเลข, Specify number" required onChange={this.onChangeCitycenValue} />
                                                            <Form.Control.Feedback type="invalid">บัตรประชาชน หรือ Passport ID is required!</Form.Control.Feedback>

                                                        </Col>

                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicBirthday">
                                                    <Form.Row>
                                                        <Col xs={7}>

                                                            <Form.Label>เบอร์โทรศัพท์, Phone<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control minLength='10' type="number" placeholder="เบอร์โทรศัพท์, Phone" value={phone} required onChange={e => this.setState({ phone: e.target.value })} />
                                                            <Form.Control.Feedback type="invalid">เบอร์โทรศัพท์, Phone is required!</Form.Control.Feedback>

                                                        </Col>
                                                        <Col xs={5}>

                                                            <Form.Label>เพศ, Gender<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={gender} as="select" onChange={this.onSelectGender} required>
                                                                <option value="">ระบุ, Select</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">Gender is required!</Form.Control.Feedback>

                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicBirthday">
                                                    <Form.Row>
                                                        <Col xs={7}>
                                                            <Form.Label>วัน เดือน ปีเกิด, Birthday <span className="text-danger">*</span></Form.Label>
                                                            <Form.Row>
                                                            <ReactDatePicker
                                                                    // selected={utils.convertDateApiToString(birthdate)}
                                                                    value={utils.convertDateApiToString(birthdate)}
                                                                    onChange={this.onSelectBirthdate}
                                                                    peekNextMonth
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    maxDate={new Date()}
                                                                    className="form-control"
                                                                    dropdownMode="select"
                                                                    placeholderText='วันที่, DD เดือน, MM ปี, YYYY'
                                                                    required
                                                                />
                                                                {/* <Form.Control value={utils.convertDateApiToString(birthdate)} type="date" placeholder="วันที่, DD เดือน, MM ปี, YYYY" max={moment().format("YYYY-MM-DD")} onChange={this.onSelectBirthdate} /> */}
                                                                <Form.Control.Feedback type="invalid">วัน เดือน ปีเกิด, Birthday  is required!</Form.Control.Feedback>
                                                            </Form.Row>
                                                        </Col>
                                                        <Col xs={5}>
                                                            <Form.Label>กรุ๊ปเลือด, Blood type<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={blood_type} as="select" onChange={this.onSelectBloodType} required>
                                                                <option value="">ระบุ, Select</option>
                                                                <option value="A">A</option>
                                                                <option value="B">B</option>
                                                                <option value="AB">AB</option>
                                                                <option value="O">O</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">Gender is required!</Form.Control.Feedback>
                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>สัญชาติ, Nationality<span className="text-danger">*</span></Form.Label>
                                                    <Form.Row>
                                                        <CountryDropdown
                                                            value={country}
                                                            onChange={(val) => this.selectCountry(val)}
                                                            style={{
                                                                backgroundColor: '#fff',
                                                                color: '#3b3b3b',
                                                                fontSize: 16,
                                                                height: 38
                                                            }} />
                                                        <Form.Control.Feedback type="invalid">สัญชาติ, nationality is required!</Form.Control.Feedback>
                                                    </Form.Row>

                                                </Form.Group>
                                                <Form.Group controlId="formGridAddress">
                                                    <Form.Label>ที่อยู่, Address<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control as="textarea" rows="2" placeholder="" value={address_no} required onChange={e => this.setState({ address_no: e.target.value })} />
                                                    <Form.Control.Feedback type="invalid">ที่อยู่, Address is required!</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridCity">
                                                        <Form.Label>จังหวัด, Province<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            onChange={this.onSelectedprovince}
                                                            required
                                                            value={province}
                                                        >
                                                            <option value="">Select จังหวัด, Province</option>
                                                            {this.renderProvinces()}
                                                        </Form.Control>

                                                        <Form.Control.Feedback type="invalid">จังหวัด, Province is required!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridState">
                                                        <Form.Label>อำเภอ, District<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            onChange={this.onSelectedDistrict}
                                                            required
                                                            value={district}
                                                        >
                                                            <option value="">Select อำเภอ, District</option>
                                                            {this.state.cities.map((item) => (
                                                                <option key={item} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">อำเภอ, District is required!</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridTumbon">
                                                        <Form.Label>ตำบล, Sub District<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            onChange={this.onSelectedTumbon}
                                                            required
                                                            value={city}
                                                        >
                                                            <option value="">Select ตำบล, Sub District</option>
                                                            {this.state.tumbons.map((item) => (
                                                                <option key={item} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">ตำบล, Sub District is required!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridZip">
                                                        <Form.Label>รหัสไปรษณีย์, Postcode<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control required defaultValue={postcode} />
                                                        <Form.Control.Feedback type="invalid">Postcode is required!</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                                <hr color='#FA6400'></hr>

                                                <Form.Group controlId="formTicket">
                                                    <Form.Label>ระบุระยะ, Distance<span className="text-danger">*</span></Form.Label>
                                                    <select value={ticket.id} className="custom-select" onChange={this.onChangeTicket.bind()}>
                                                        <option value='' key='99'>{this.state.select_ticket}</option>
                                                        {event.ticket !== undefined ? event.ticket.map((item, index) => (
                                                            <option value={item.id} key={index}>{item.title + ' ' + item.distance + ' km.'}</option>
                                                        )) : ''}
                                                    </select>
                                                </Form.Group>
                                                <Form.Label hidden={ticket.product === undefined}>ขนาดไซต์เสื้อ, T-Shirt Size<span className="text-danger">*</span></Form.Label>
                                                {ticket.product ? event.product ? event.product.map((prod, index) => (
                                                    ticket.product.map((item) => (
                                                        (item.id === prod.id && item.show) ? (
                                                            <Form.Group className="mb-5" key={ticket.id + index}>
                                                                <Form.Label>{prod.name}<span className="text-danger"></span></Form.Label>
                                                                <Form.Label>{prod.detail}<span className="text-danger"></span></Form.Label>
                                                                <Row className="pirate">
                                                                    {prod.type ? prod.type.map((type, index) => (
                                                                        <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                            <Card style={{ cursor: 'pointer', borderColor: this.checkProductTicket(prod, type) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center" >
                                                                                <Card.Body className="p-2" style={{ color: this.checkProductTicket(prod, type) ? '#FA6400' : 'rgba(0,0,0,0.75)' }}
                                                                                    onClick={this.onSelectedSize.bind(this, type, prod, ticket)}>

                                                                                    <img
                                                                                        width={25}
                                                                                        height={20}
                                                                                        className="mr-1"
                                                                                        src={this.checkProductTicket(prod, type) ? iconshirtactive : iconshirt}
                                                                                        alt="runex"
                                                                                    />
                                                                                    <h6 className="card-text">{type.name}<br></br><small>{type.remark}</small></h6>
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    )) : ''}
                                                                </Row>
                                                            </Form.Group>
                                                        ) : ''
                                                    ))
                                                )) : '' : ''}
                                                <Form.Row>
                                                    <Form.Label style={{ display: event.product ? (!this.isSold(event) ? "none" : "block") : 'none' }}>ซื้อสินค้าเพิ่มเติม</Form.Label>
                                                    {event.product ? event.product.map((item, index) => (
                                                        item.status === 'sold' ? (<Form.Group className="mb-5" key={index}>

                                                            <Form.Label>{item.name}<span className="text-danger"></span></Form.Label>
                                                            <Form.Label>{item.detail}<span className="text-danger"></span></Form.Label>
                                                            <Row>
                                                                <Col>
                                                                    <img
                                                                        width={64}
                                                                        height={64}
                                                                        className="mr-3"
                                                                        style={{ marginBottom: 5 }}
                                                                        src={item.image ? IMAGE_URL + item.image[0].path_url : ''}
                                                                        alt=""
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row className="size">
                                                                {item ? item.type.map((type, index) => (
                                                                    <Col className="col-half-offset" sm="2" md="2" key={item.id + index}>
                                                                        <Card style={{ cursor: 'pointer', borderColor: this.checkProductAndSize(item, type) ? '#FA6400' : 'rgba(0,0,0,0.19)' }}
                                                                            className="text-center"
                                                                        >
                                                                            <Card.Body className="p-2" style={{ color: (productOnTicketSize === index ? '#FA6400' : 'rgba(0,0,0,0.75)') }}
                                                                                onClick={this.onSelectedProduct.bind(this, false, item, type)}>

                                                                                <h6 className="card-text">{type.name}<br></br><small>{type.remark}</small></h6>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                )) : ''}
                                                                {/* <Col className="" sm="12" md="2"  key={item.id + '99'}>
                                            <Card style={{ borderColor: (this.checkProductIndex(item) === -1) ? '#FA6400' : 'rgba(0,0,0,0.19)', padding: 1 }} 
                                            className="text-center" >
                                                <Card.Body className="p-2" style={{ color: (productOnTicketSize === index ? '#FA6400' : 'rgba(0,0,0,0.75)'), padding: 1 }}
                                                    onClick={this.onSelectedProduct.bind(this, true, item, null)}>

                                                    <h6 className="card-text">ไม่ได้เลือก<br></br><small></small></h6>
                                                </Card.Body>
                                            </Card>
                                        </Col> */}
                                                            </Row>
                                                            <Row className="size">
                                                                <Col className="mt-2" sm="2" xs="4" key={item.id + '99'}>
                                                                    <Card style={{ cursor: 'pointer', borderColor: (this.checkProductIndex(item) === -1) ? '#FA6400' : 'rgba(0,0,0,0.19)', padding: 1 }}
                                                                        className="text-center" >
                                                                        <Card.Body className="p-2" style={{ color: (productOnTicketSize === index ? '#FA6400' : 'rgba(0,0,0,0.75)'), padding: 1 }}
                                                                            onClick={this.onSelectedProduct.bind(this, true, item, null)}>

                                                                            <h6 className="card-text">ไม่ได้เลือก<br></br><small></small></h6>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>
                                                            </Row>

                                                        </Form.Group>) : ''
                                                    )) : ''}
                                                    {/* {event.event ? event.event.product.map((product, index) => (
                                    <Form.Group key={index}>
                                        <Row>
                                            <Col>
                                                <Media>
                                                    <img
                                                        width={64}
                                                        height={64}
                                                        className="mr-3"
                                                        src={product.image ? IMAGE_URL + product.image[0].path_url : ''}
                                                        alt="Generic placeholder"
                                                    />
                                                    <Media.Body>
                                                        <div className="clearfix">
                                                            <h6 className="float-left">{product.name}</h6>
                                                            <h6 className="float-right">Price {product.type[0].price + ' ' + (product.currency !== undefined ? product.currency : 'THB')}</h6>
                                                        </div>
                                                        <ul className="list-group list-group-horizontal-lg" style={{ marginBottom: 8, marginRight: 8 }}>
                                                            {product.type.map((item, index) => (
                                                                <li key={index} className="list-group-item rounded-pill mr-1 py-1 mt-1"
                                                                    style={{ borderColor: (productSize === index ? '#FA6400' : 'rgba(0,0,0,0.19)'), color: (productSize === index ? '#FA6400' : 'rgba(0,0,0,0.75)') }}
                                                                    onClick={this.onSelectedProduct.bind(this, index, product)} >{item.name}</li>
                                                            ))}
                                                            
                                                        </ul>
                                                        <ul className="list-group list-group-horizontal-lg mt-1">
                                                            <li  className="list-group-item rounded-pill mr-1 py-1"
                                                                style={{ borderColor: (productSize === -1 ? '#FA6400' : 'rgba(0,0,0,0.19)'), color: (productSize === -1 ? '#FA6400' : 'rgba(0,0,0,0.75)') }}
                                                                onClick={this.onSelectedProduct.bind(this, -1, product)} >ไม่ได้เลือก</li>
                                                        </ul>
                                                    </Media.Body>
                                                </Media>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                )) : ''} */}
                                                </Form.Row>

                                                <fieldset>
                                                    <Form.Group as={Row}>

                                                        <Col sm={10}>
                                                            <Form.Label>รูปแบบการจัดส่ง , Shipping<span className="text-danger">*</span></Form.Label>
                                                            <Form.Check
                                                                type="radio"
                                                                label={'รับเสื้อที่หน้างาน ' + event.receive_location}
                                                                name="shippingRadios"
                                                                id="RecieptMyself"
                                                                checked={this.state.reciept_type === 'yourself'}
                                                                onClick={() => this.setState({ reciept_type: 'yourself' })}
                                                                onChange={() => console.log('')}
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                label='รับเสื้อทางไปรษณีย์ (ค่าจัดส่ง 60  บาท)'
                                                                name="shippingRadios"
                                                                id="RecieptPost"
                                                                checked={this.state.reciept_type !== 'yourself'}
                                                                onClick={() => this.setState({ reciept_type: 'postman' })}
                                                                onChange={() => console.log('')}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </fieldset>
                                                <hr color='#FA6400'></hr>

                                                <Form.Group controlId="formEmergencyContact">
                                                    <Form.Label>ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact list<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact" value={emergency_contact} required onChange={e => this.setState({ emergency_contact: e.target.value })} />
                                                    <Form.Control.Feedback type="invalid">ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="formEmergencyPhone">
                                                    <Form.Label>เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="เบอร์โทรผู้ติดต่อฉุกเฉย, Emergency contact number" value={emergency_phone} required onChange={e => this.setState({ emergency_phone: e.target.value })} />
                                                    <Form.Control.Feedback type="invalid">เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number is required!</Form.Control.Feedback>
                                                </Form.Group>
                                                <Row className="justify-content-md-center">
                                                    <Col md={"auto"} sm={"auto"}>
                                                        <Button type="submit" className="btn-custom rounded-pill px-4 ml-2" >
                                                            <img
                                                                width={25}
                                                                height={20}
                                                                className="mr-1"
                                                                src={iconrunningwhite}
                                                                alt="runex"
                                                            />ยืนยัน</Button>
                                                    </Col>
                                                </Row>

                                                {/* <Button type='button' variant="outline-secondary" className="float-right rounded-pill px-4"
                                    onClick={this.onClickBack.bind(this, event)}>Back</Button> */}
                                            </Form>
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
