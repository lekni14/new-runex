/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import { Row, Col, Media, Card, Button, Form, Container } from 'react-bootstrap'
import iconmedal from '../../images/icon-medal.svg'
import iconshirt from '../../images/icon-shirt.svg'
import iconshirtactive from '../../images/icon-tshirt-active.svg'
import ThaiAddress from "react-thai-address";
// import iconrunning from '../../images/icon-running.svg'
import iconrunningwhite from '../../images/icon-running-white.svg'
//import moment from 'moment'
import { utils } from '../../utils/utils'
import { history } from '../../store'
import { eventService } from '../../services'
// import { CountryDropdown } from 'react-country-region-selector'
import Swal from 'sweetalert2'
import ReactDatePicker from 'react-datepicker'
import { category } from '../../utils/constants'

export default class RaceProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
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
            country: '',
            emergency_phone: '',
            emergency_contact: '',
            citycen_type: '',
            reciept_type: 'yourself',
        };
    }

    componentDidMount() {
        // this.getEvent()
        console.log(this.props)
        // this.setState({
        //     products: this.props.products
        // })
        this.setState({
            event: this.props.event
        })
        this.setState({
            tickets: this.props.tickets
        })
        const { user } = this.state
        if (user.address !== undefined && user.address !== null) {
            if (user.address.length > 0) {
                const addr = user.address[0]
                this.setState({ hasAddress: true })
                this.setState({ address_no: addr.address })
                this.setState({ address_no_tmp: addr.address })
                this.setState({ province: addr.province })
                this.setState({ district: addr.district })
                this.setState({ city: addr.city })
                this.setState({ postcode: addr.zipcode })
                var cities = []
                const results = ThaiAddress.search({ province: user.address[0].province });
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
                        })
                        this.setState({ tumbons: tumbons })
                    })
                })
            }
            this.setState({ fullname: user.fullname })
            this.setState({ firstname: user.firstname })
            this.setState({ lastname: user.lastname })
            if (user.passport !== undefined) {
                this.setState({ passport: user.passport })
                if (user.passport !== '') {
                    this.setState({ citycen_type: 'Passport' })
                } else {
                    this.setState({ citycen_type: 'CiticenID' })
                }
            }
            if (user.citycen_id !== undefined) {
                this.setState({ citycen_id: user.citycen_id })
                if (user.citycen_id !== '') {
                    this.setState({ citycen_type: 'CiticenID' })
                }
            }
            if (user.nationality !== undefined && user.nationality !== '') {
                this.setState({ country: user.nationality })
            } else {
                this.setState({ country: 'Thailand' })
            }
            this.setState({ gender: user.gender })
            this.setState({ phone: user.phone })
            this.setState({ birthdate: user.birthdate })
            this.setState({ birthdateApi: user.birthdate })
            this.setState({ blood_type: user.blood_type })
            this.setState({ emergency_contact: user.emergency_contact })
            this.setState({ emergency_phone: user.emergency_phone })
        }
        //this.getEvent()
    }

    // componentWillReceiveProps (nextProps) {
    //     if (nextProps.event) {
    //         const { event } = this.props
    //         if (event !== undefined && event !== null) {
    //             if (event.event !== null && event.event !== undefined) {
    //                 if (event.event.category.id === '5d7dbc800ea2d6053ea1e226') {
    //                     this.setState({ isVR: true })
    //                 }
    //             }
    //         }
    //     }
    // }

    getEvent() {
        const { code } = this.props.match.params
        // const { eventID } = this.props.route.match.params
        console.log(code)
        eventService.getDetail(code).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    event: res.data.data.event
                })
            }
        })
    }

    onSelectBirthdate = (e) => {
        //console.log(e)
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

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
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

    renderProvinces() {
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
        this.props.tickets.map((item, index) => {
            if (item.id === e.target.value) {
                console.log(e.target.value)
                this.setState({ ticket: item })
                //this.setState({select_ticket:e.target.value})
                this.setState({ selectTicket: undefined })
                this.setState({ productTickets: [] })
                console.log(this.state.ticket)
            }
        })


    }

    onSelectedSize = (shirts) => {
        console.log(shirts)
        const { productTickets, reload } = this.state
        // var arr = productTickets
        // var currentIndex = this.checkTicketIndex(product)
        // if (currentIndex !== -1) {
        //     arr.splice(currentIndex, 1)
        //     const item = {
        //         product: product,
        //         type: size.name,
        //         price: size.price,
        //         remark: size.remark,
        //         ticket: this.state.ticket
        //     }
        //     arr.push(item)

        // } else {
        //     //products.splice(currentIndex, 1)
        //     const item = {
        //         product: product,
        //         type: size.name,
        //         price: size.price,
        //         remark: size.remark,
        //         ticket: this.state.ticket
        //     }
        //     arr.push(item)
        // }
        this.setState({ productTickets: shirts })
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

        //console.log(arr)
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
            if (element.product.id === product.id || element.product.reuse === product.reuse) {
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

    checkProductTicket = (shirts) => {
        const { productTickets } = this.state
        var check = false
        // productTickets.map((element) => {
        if (shirts.id === productTickets.id) {
            check = true
        }

        // })
        return check
    }

    showCitycen() {
        const { citycen_type, citycen_id, passport } = this.state
        if (citycen_type === 'CiticenID') {
            return citycen_id
        } else {
            return passport
        }
    }

    showPrice() {
        const { ticket } = this.state
        const { event, tickets } = this.props
        console.log(ticket)
        var total = 0
        // if (event.ticket !== undefined && event.ticket !== null) {
        // if (ticket !== undefined) {
        if (ticket.price !== undefined) {
            total = ticket.price
            // ticket.map((element) => (
            //     total += element.price
            // ))
        }
        // }
        if (event.isSendShirtByPost === true) {
            total += 60
        }
        // }
        return total
    }

    isSold(event) {
        console.log(event)
        var check = false
        event.shirts.map(item => {
            if (item.status === 'sold') {
                check = true
            }
        })
        return check
    }

    saveData = () => {
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
        const { productTickets, ticket, reciept_type } = this.state
        const { event } = this.props
        if (ticket.id === undefined || ticket.id === null) {
            Swal.fire(
                '',
                'Please select distance.',
                'warning'
            )
        } else if (event.shirts.length !== 0 && productTickets.length === 0) {
            Swal.fire(
                '',
                'Please select shirt size.',
                'warning'
            )
        } else {
            let ticket_options = {
                user_option: data,
                tickets: ticket,
                total_price: this.showPrice(),
                reciept_type: reciept_type
            }
            history.push('/racesummary',
                {
                    ticket: this.props.tickets,
                    event: this.props.event,
                    ticket_options: [ticket_options],
                    index: 0
                }
            )
            history.go(0)
            // var check = 0

            // if (products.length > 0) {
            //     console.log(products)
            //     products.map((item) => (
            //         item.show ? check += 1 : check += 0
            //     ))
            //     if (productTickets.length === check) {
            //         console.log(productTickets)
            //         let ticket_options = {
            //             user_option: data,
            //             product: products,
            //             tickets: productTickets,
            //             total_price: this.showPrice(),
            //             reciept_type: reciept_type
            //         }
            //         history.push('/summary', productTickets)
            //         // history.push({
            //         //     pathname: '/racesummary',
            //         //     state: {
            //         //         ticket: productTickets,
            //         //         product: products,
            //         //         event: event,
            //         //         ticket_options: [ticket_options],
            //         //         index: 0
            //         //     }
            //         // })

            //     } else {
            //         Swal.fire(
            //             '',
            //             'Please select product on ticket.',
            //             'warning'
            //         )
            //     }
            // } else if (ticket.isFreeEvent === true) {
            //     console.log(ticket)
            //     var arr = productTickets
            //     const item = {
            //         product: {},
            //         type: '',
            //         price: 0.00,
            //         ticket: ticket
            //     }
            //     arr.push(item)
            //     let ticket_options = {
            //         user_option: data,
            //         product: products,
            //         tickets: arr,
            //         total_price: this.showPrice(),
            //         reciept_type: reciept_type
            //     }
            // history.push({
            //     // pathname: '/racesummary',
            //     state: {
            //         ticket: ticket,
            //         product: arr,
            //         event: event,
            //         ticket_options: [ticket_options],
            //         index: 0
            //     }

            // })

            //     {
            //         ticket: ticket,
            //         product: arr,
            //         event: event,
            //         ticket_options: [ticket_options],
            //         index: 0
            //     }
            // ,()=>history.go)
            // console.log(history)
            // history.go()


            // this.setState({ productTickets: arr }, () => {

            // })
            // } else {
            //     Swal.fire(
            //         '',
            //         'ไม่สามารถบันทึกข้อมูลได้',
            //         'warning'
            //     )
            // }
        }

        console.log('not thing')
        // } else {
        //     Swal.fire(
        //         '',
        //         'ไม่สามารถบันทึกข้อมูลได้',
        //         'warning'
        //     )
        // }
        // }, error => {
        //     console.log(error)
        // })
    }

    onClickConfirm = () => {
        this.saveData()
    }

    render() {

        const { validated, birthdate, citycen_id, gender, phone, address_no, province, district, postcode, city } = this.state
        const { productOnTicketSize, ticket, blood_type, country, emergency_contact, emergency_phone } = this.state
        const { event, tickets } = this.props
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
        // const rowLen = 12;
        return (
            <div>
                <Container className="my-5" >
                    <Card >
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card className="mb-5">
                                        <Card.Img variant="top" src={event ? event.cover : ''} />
                                        <Card.Body>
                                            <h4 className="h4">{event ? event.name : ''}</h4>
                                            <p className="text-muted mb-4" style={{ color: '#FA6400', display: ticket.price !== undefined ? "block" : 'none' }} >ราคาค่าสมัคร</p>
                                            <h1 className="mb-0" style={{ color: '#FA6400', display: ticket.price !== undefined ? "block" : 'none' }}>{this.showPrice() + ' ' + 'THB'} </h1>
                                            {/* <p className="text-muted mb-4" style={{ display: event ? (event.isFreeEvent === true ? "none" : "block") : 'none' }}>(including. postage fee)</p> */}
                                            <Card.Title style={{ display: event ? (event.isFreeEvent === true ? "none" : "block") : 'none' }}>Finisher’s Award</Card.Title>
                                            <Media style={{ display: event ? (event.isFreeEvent === true ? "none" : "block") : 'none' }}>
                                                <img
                                                    width={35}
                                                    height={35}
                                                    className="mr-1"
                                                    src={iconmedal}
                                                    alt="runex"
                                                />
                                                <Media.Body style={{ display: event ? (event.isFreeEvent === true ? "none" : "block") : 'none' }}>
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

                                            </ul>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>กรอกข้อมูลผู้สมัคร</Card.Title>
                                            <Form className="mb-5" noValidate validated={validated} onSubmit={handleValidate}>
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
                                                </Form.Row>

                                                <Form.Row>
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

                                                <Form.Group controlId="formPassport">
                                                    <Form.Row>
                                                        <Col xs={5}>
                                                            <Form.Label>บัตรประชาชน, Passport<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={this.state.citycen_type} className="form-select" as="select" onChange={this.onSelectCitycen} required>
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
                                                <Form.Group controlId="formBasicPhone">
                                                    <Form.Row>
                                                        <Col>

                                                            <Form.Label>เบอร์โทรศัพท์, Phone<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control minLength='10' type="number" placeholder="เบอร์โทรศัพท์, Phone" value={phone} required onChange={e => this.setState({ phone: e.target.value })} />
                                                            <Form.Control.Feedback type="invalid">เบอร์โทรศัพท์, Phone is required!</Form.Control.Feedback>

                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicGender">
                                                    <Form.Row>
                                                        <Col >

                                                            <Form.Label>เพศ, Gender<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={gender} as="select" className="form-select" onChange={this.onSelectGender} required>
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
                                                        <Col>
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
                                                                {/* <Form.Control value={utils.convertDateApiToString(birthdate)} type="date" placeholder="วันที่, DD เดือน, MM ปี, YYYY" max={moment().format("YYYY-MM-DD")} required onChange={this.onSelectBirthdate} /> */}
                                                                <Form.Control.Feedback type="invalid">วัน เดือน ปีเกิด, Birthday  is required!</Form.Control.Feedback>
                                                            </Form.Row>
                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicBlood">
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label>กรุ๊ปเลือด, Blood type<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control value={blood_type} as="select" className="form-select" onChange={this.onSelectBloodType} required>
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

                                                < br />
                                                <hr color='#FA6400'></hr>

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
                                                            className="form-select"
                                                            onChange={this.onSelectedprovince}
                                                            required
                                                            value={province}
                                                        >
                                                            <option value="">Select จังหวัด, Province</option>
                                                            {this.renderProvinces()}
                                                        </Form.Control>

                                                        <Form.Control.Feedback type="invalid">จังหวัด, Province is required!</Form.Control.Feedback>
                                                    </Form.Group>

                                                </Form.Row>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridState">
                                                        <Form.Label>อำเภอ, District<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            className="form-select"
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
                                                            className="form-select"
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
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridZip">
                                                        <Form.Label>รหัสไปรษณีย์, Postcode<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control required defaultValue={postcode} />
                                                        <Form.Control.Feedback type="invalid">Postcode is required!</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>

                                                <hr color='#FA6400'></hr>
                                                <br />
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title>เลือกระยะการวิ่ง</Card.Title>

                                                        {/* <hr color='#FA6400'></hr> */}

                                                        <Form.Group controlId="formTicket">
                                                            <Form.Label>ระบุระยะ, Distance<span className="text-danger">*</span></Form.Label>
                                                            <select className="custom-select form-select" onChange={this.onChangeTicket.bind()} required>
                                                                <option value='' key='99'>{this.state.select_ticket}</option>
                                                                {tickets !== undefined ? tickets !== null ? tickets.map((item, index) => (
                                                                    <option value={item.id} key={index}>{item.distance !== 0 ? item.title + ' ' + item.distance + ' km.' : item.title}</option>
                                                                )) : '' : ''}
                                                            </select>
                                                        </Form.Group>
                                                        <br />

                                                        <Form.Label hidden={event.shirts === undefined}>ขนาดไซต์เสื้อ, T-Shirt Size<span className="text-danger">*</span></Form.Label>
                                                        {/* {event ? event.shirts ? event.shirts.map((prod, index) => ( 
                                                    // ticket.product.map((item) => (
                                                    //     (item.id === prod.id && item.show) ? (1:*/}
                                                        <Form.Group className="mb-5">
                                                            <Form.Label> <span className="text-danger"></span></Form.Label>
                                                            {/* <Form.Label>{prod.detail}<span className="text-danger"></span></Form.Label> */}
                                                            <Row className="pirate">

                                                                {event.shirts ? event.shirts.map((prod, index) => (
                                                                    (event.shirts.length === index) ? (
                                                                        <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                            <Card key={prod.id + index} style={{ cursor: 'pointer', borderColor: this.checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center mt-1" >
                                                                                <Card.Body className="p-2" style={{ color: this.checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.75)' }}
                                                                                    onClick={this.onSelectedSize.bind(this, prod)}>

                                                                                    <img
                                                                                        width={25}
                                                                                        height={20}
                                                                                        className="mr-1"
                                                                                        src={this.checkProductTicket(prod) ? iconshirtactive : iconshirt}
                                                                                        alt="runex"
                                                                                    />
                                                                                    <h6 className="card-text">{prod.size}<br></br><small>{prod.chest}</small></h6>
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    ) : (
                                                                            <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                                <Card key={prod.id + index} style={{ cursor: 'pointer', borderColor: this.checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center mt-1" >
                                                                                    <Card.Body className="p-2" style={{ color: this.checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.75)' }}
                                                                                        onClick={this.onSelectedSize.bind(this, prod)}>

                                                                                        <img
                                                                                            width={25}
                                                                                            height={20}
                                                                                            className="mr-1"
                                                                                            src={this.checkProductTicket(prod) ? iconshirtactive : iconshirt}
                                                                                            alt="runex"
                                                                                        />
                                                                                        <h6 className="card-text">{prod.size}<br></br><small>{prod.chest}</small></h6>
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        )
                                                                )) : ''}
                                                            </Row>
                                                        </Form.Group>
                                                        <fieldset>
                                                            <Form.Group as={Row} style={{ display: event ? (event.category === category.VR ? "none" : "block") : 'none' }}>

                                                                <Col sm={10}>
                                                                    <Form.Label>รูปแบบการจัดส่ง , Shipping<span className="text-danger">*</span></Form.Label>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label={'รับเสื้อที่หน้างาน ' + event.title}
                                                                        name="shippingRadios"
                                                                        id="RecieptMyself"
                                                                        defaultChecked={true}
                                                                        onClick={() => this.setState({ reciept_type: 'yourself' })}
                                                                    />
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label='รับเสื้อทางไปรษณีย์ (ค่าจัดส่ง 60  บาท)'
                                                                        name="shippingRadios"
                                                                        id="RecieptPost"
                                                                        onClick={() => this.setState({ reciept_type: 'postman' })}
                                                                        style={{ display: event ? (!event.isSendShirtByPost || utils.isAfterDate(event.post_end_date) ? "none" : "block") : 'none' }}
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        </fieldset>

                                                        {/* {if(event.catagory!=="VR")}  */}
                                                        {event.category !== category.VR ?
                                                            <><hr color='#FA6400'></hr>
                                                                <Form.Group controlId="formEmergencyContact">
                                                                    <Form.Label>ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact list<span className="text-danger">*</span></Form.Label>
                                                                    {event.category !== "VR" ? <Form.Control type="text" placeholder="ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact" value={emergency_contact} required onChange={e => this.setState({ emergency_contact: e.target.value })} /> : <Form.Control type="text" placeholder="ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact" value={emergency_contact} onChange={e => this.setState({ emergency_contact: e.target.value })} />}
                                                                    <Form.Control.Feedback type="invalid">ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact is required!</Form.Control.Feedback>
                                                                </Form.Group>
                                                                {/* {(event.catagory === "VR" ? required:'')} */}
                                                                <Form.Group controlId="formEmergencyPhone">
                                                                    <Form.Label>เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number<span className="text-danger">*</span></Form.Label>
                                                                    {event.category !== "VR" ? <Form.Control type="text" placeholder="เบอร์โทรผู้ติดต่อฉุกเฉย, Emergency contact number" value={emergency_phone} required onChange={e => this.setState({ emergency_phone: e.target.value })} /> : <Form.Control type="text" placeholder="เบอร์โทรผู้ติดต่อฉุกเฉย, Emergency contact number" value={emergency_phone} onChange={e => this.setState({ emergency_phone: e.target.value })} />}

                                                                    <Form.Control.Feedback type="invalid">เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number is required!</Form.Control.Feedback>
                                                                </Form.Group>
                                                            </>
                                                            : ""}
                                                    </Card.Body>
                                                </Card>

                                                <br />

                                                <Row className="justify-content-md-center">
                                                    <Col md={"auto"} sm={"auto"} lg={"auto"}>
                                                        <Button type="submit" className="btn-custom rounded-pill px-4 ml-8" >
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
