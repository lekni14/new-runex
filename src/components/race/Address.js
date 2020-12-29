import React from 'react'
import { Row, Col, Media, Card, Button, Form } from 'react-bootstrap'
import iconmedal from '../../images/icon-medal.svg'
import ThaiAddress from "react-thai-address";
import iconshirt from '../../images/icon-shirt.svg'
import iconrun from '../../images/icon-running.svg'
import iconrunningwhite from '../../images/icon-running-white.svg'
import moment from 'moment'
import { utils } from '../../utils/utils'
import { IMAGE_URL } from '../../utils/constants'
import { history } from '../../store'
//import { userService } from '../../services'

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')) : JSON.parse(utils.getUser()),
            fullname: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).fullname : '',
            citycen_id: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).citycen_id : '',
            phone: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).phone : '',
            birthdate: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).birthdate : '',
            birthdateApi: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).birthdate : '',
            gender: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).gender : '',
            distant: 'Select distant',
            cities: [],
            tumbons: [],
            address: undefined,
            address_no_tmp: '',
            address_no: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).address[0].address : '',
            province: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).address[0].province : '',
            district: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).address[0].district : '',
            city: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).address[0].city : '',
            postcode: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).address[0].postcode : '',
            validated: false,
            hasAddress: false,
            isVR: true,
            firstname_th: '',
            lastname_th: '',
            firstname: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).firstname : '',
            lastname: sessionStorage.getItem('user_tmp') ? JSON.parse(sessionStorage.getItem('user_tmp')).lastname : '',
            toggleEditAddress: false
        };
    }
    onChangeTab = (address) => {
        this.props.handleAddress(address)
        this.props.handleClickChange(1)
    }

    componentDidMount () {
        const { user } = this.state
        if (sessionStorage.getItem('user_tmp') !== undefined && sessionStorage.getItem('user_tmp') !== null) {
            this.setState({ user: JSON.parse(sessionStorage.getItem('user_tmp')) }, () => {
                //this.setState({ fullname: user.fullname })
                if (user.citycen_id !== undefined) {
                    this.setState({ citycen_id: user.citycen_id })
                }

                this.setState({ gender: user.gender })
                this.setState({ phone: user.phone })
                this.setState({ birthdate: user.birthdate })
                this.setState({ fullname: user.fullname })
                this.setState({ firstname: user.firstname })
                this.setState({ lastname: user.lastname })
                this.setState({ firstname_th: user.firstname_th })
                this.setState({ lastname_th: user.lastname_th })
                if (user.address !== undefined) {
                    if (user.address.length > 0) {
                        this.setState({ address_no: user.address[0].address })
                        this.setState({ address_no_tmp: user.address[0].address })
                        var cities = [];
                        const results = ThaiAddress.search({ province: user.address[0].province });
                        //console.log(results);
                        results.map(item => {
                            if (!cities.includes(item.city)) {
                                //console.log(item.city)
                                cities.push(item.city)
                            }
                        })
                        this.setState({ province: user.address[0].province })
                        this.setState({ cities: cities }, () => {
                            this.setState({ district: user.address[0].district }, () => {
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
                                this.setState({ city: user.address[0].city })
                                this.setState({ postcode: user.address[0].zipcode })
                            })
                        });
                    }
                }
            })
        } else {
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
                }
            }

            this.setState({ fullname: user.fullname })
            this.setState({ firstname: user.firstname })
            this.setState({ lastname: user.lastname })
            if (user.citycen_id !== undefined) {
                this.setState({ citycen_id: user.citycen_id })
            }

            this.setState({ gender: user.gender })
            this.setState({ phone: user.phone })
            this.setState({ birthdate: user.birthdate })

        }

        //this.getEvent()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.event) {
            const { event } = this.props
            if (event !== undefined && event !== null) {
                if (event.event !== null && event.event !== undefined) {
                    if (event.event.category.id === '5d7dbc800ea2d6053ea1e226') {
                        this.setState({ isVR: true })
                    }
                }

            }
        }
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
        // data.birthdate = utils.convertDateToApi(this.state.birthdateApi)
        data.phone = this.state.phone
        data.firstname_th = this.state.firstname_th
        data.lastname_th = this.state.lastname_th
        // data.gender = this.state.gender
        // data.citycen_id = this.state.citycen_id
        data.address = [address]
        data.firstname = this.state.firstname
        data.lastname = this.state.lastname
        sessionStorage.setItem('user_tmp', JSON.stringify(data))
        this.onChangeTab(address)
        //userService.updateUser(data)
    }

    onClickNext = () => {
        if (this.state.user.address.length > 0) {
            const addr = this.state.user.address[0]
            addr.address = this.state.address_no
            addr.province = this.state.province
            addr.district = this.state.district
            addr.city = this.state.city
            addr.zipcode = this.state.postcode

            this.onChangeTab(addr)
        }
    }

    onClickBack = (event) => {
        if (event.event !== undefined) {
            history.push('/preview/' + (event.event ? event.event.id : ''))
        }

    }

    onSelectBirthdate = (e) => {
        //`${this.state.toDateReg}T${this.state.toTimeReg}:00`,
        //console.log(utils.convertDateToApi(e.target.value))
        this.setState({ birthdateApi: utils.convertDateToApi(e.target.value) })
        this.setState({ birthdate: e.target.value })
    }

    onSelectGender = e => {
        this.setState({ gender: e.target.value })
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

    editAddress = () => {
        const { user } = this.state

        if (user.address !== undefined) {
            if (user.address.length > 0) {
                this.setState({ address_no: user.address[0].address })
                this.setState({ address_no_tmp: user.address[0].address })
                var cities = [];
                const results = ThaiAddress.search({ province: user.address[0].province });
                //console.log(results);
                results.map(item => {
                    if (!cities.includes(item.city)) {
                        //console.log(item.city)
                        cities.push(item.city)
                    }
                })
                this.setState({ province: user.address[0].province })
                this.setState({ cities: cities }, () => {
                    this.setState({ district: user.address[0].district }, () => {
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
                        this.setState({ city: user.address[0].city })
                        this.setState({ postcode: user.address[0].zipcode })
                    })
                });
            }
        }

        this.setState({ toggleEditAddress: !this.state.toggleEditAddress })
    }

    onSaveAddress = () => {
        this.setState({ toggleEditAddress: false })
        this.setState({ address_no: this.state.address_no_tmp }, () => {
            const user = this.state.user
            user.address[0].address = this.state.address_no
            user.address[0].province = this.state.province
            user.address[0].district = this.state.district
            user.address[0].city = this.state.city
            user.address[0].zipcode = this.state.postcode
            user.phone = this.state.phone
            sessionStorage.setItem('user', JSON.stringify(user))
        })
    }

    displayFinishedAward = (id) => {
        var datas = []
        if (id === '5ef2185f2fbe178b33190df0') {
            datas.push(
                <Media style={{ marginTop: 8 }}>
                    <img
                        width={28}
                        height={28}
                        className="mr-1"
                        src={iconshirt}
                        alt="runex"
                    />
                    <Media.Body>
                        <h6 className="mb-1 pt-1">Finisher’s T Shirt</h6>
                    </Media.Body>
                </Media>
            )
            datas.push(
                <Media style={{ marginTop: 8 }}>
                    <img
                        width={28}
                        height={28}
                        className="mr-1"
                        src={iconrun}
                        alt="runex"
                    />
                    <Media.Body>
                        <h6 className="mb-1 pt-1">Top 100 Buf/Top 20 Team Buf</h6>
                    </Media.Body>
                </Media>
            )
            datas.push(
                <Media style={{ marginTop: 8 }}>
                    <img
                        width={28}
                        height={28}
                        className="mr-1"
                        src={iconmedal}
                        alt="runex"
                    />
                    <Media.Body>
                        <h6 className="mb-1 pt-1">Winner’s Trophy</h6>
                    </Media.Body>
                </Media>
            )
        }
        return datas
    }

    render () {
        const { isVR, validated, birthdate, citycen_id, gender, phone, address_no, province, district, postcode, city, hasAddress } = this.state
        const { event } = this.props
        const handleValidate = e => {
            const form = e.currentTarget;
            e.preventDefault();
            if (form.checkValidity() === false) {
                e.stopPropagation();
            } else {
                //
                this.saveData()
            }
            this.setState({ validated: true });

        };
        return (
            <Card >
                <Card.Body hidden={hasAddress}>
                    <Row>
                        <Col md={5}>
                            <Card className="mb-5">
                                <Card.Img variant="top" src={event.event ? IMAGE_URL + event.event.cover : ''} />
                                <Card.Body>
                                    <h4 className="h4">{event.event ? event.event.name : ''}</h4>
                                    <h1 className="mb-0">{event.event ? event.event.ticket[0].price + ' ' + event.event.ticket[0].unit : ''}</h1>
                                    <p className="text-muted mb-4" style={{ display: event.event ? (event.event.is_free === true ? "none" : "block") : 'none' }}>(including. postage fee)</p>
                                    <Card.Title style={{ display: event.event ? (event.event.is_free === true ? "none" : "block") : 'none' }}>Finisher’s Award</Card.Title>

                                    <Media style={{ marginTop: 8 }} hidden={event.event ? (event.event.is_free === true ? false : false) : false}>
                                        <img
                                            width={28}
                                            height={28}
                                            className="mr-1"
                                            src={iconmedal}
                                            alt="runex"
                                        />
                                        <Media.Body style={{ display: event.event ? (event.event.is_free === true ? "none" : "flex") : 'none' }}>
                                            <h6 className="mb-1 pt-1">Finisher's Medal</h6>
                                        </Media.Body>

                                    </Media>
                                    {event.event ? this.displayFinishedAward(event.event.id) : ''}

                                </Card.Body>
                                <Card.Footer className="bg-white mb-3">
                                    <h6>Hurry! Registration close in</h6>
                                    <ul className="list-group list-group-horizontal-md text-center">
                                        <li className="list-group-item px-3 border-0">
                                            <h6>{event.event ? utils.convertDateApiToString(event.event.end_reg) : ''}<small className="ml-1 text-muted"></small></h6>
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
                        <Col md={7}>
                            <Card.Title>Address</Card.Title>
                            <Form className="mb-5" validated={validated} onSubmit={handleValidate}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>First name(EN)<span className="text-danger">*</span></Form.Label>
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
                                        <Form.Label>Last name(EN)<span className="text-danger">*</span></Form.Label>
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
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>ชื่อ(ไทย)<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="ชื่อ"
                                            value={this.state.firstname_th}
                                            onChange={e => this.setState({ firstname_th: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="validationCustom02">
                                        <Form.Label>นามสกุล(ไทย)<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="นามสกุล"
                                            value={this.state.lastname_th}
                                            onChange={e => this.setState({ lastname_th: e.target.value })}
                                        />

                                    </Form.Group>
                                </Form.Row>

                                {/* <Form.Group controlId="formBasicFullname">
                                    <Form.Label>Full name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control value={fullname} type="text" placeholder="" required onChange={e => this.setState({ fullname: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Full name is required!
                                    </Form.Control.Feedback>
                                </Form.Group> */}
                                <Form.Group controlId="formBasicPassport" hidden={isVR}>
                                    <Form.Label>Passport ID<span className="text-danger">*</span></Form.Label>
                                    <Form.Control value={citycen_id} minLength='13' type="number" placeholder="" required={!isVR} onChange={e => this.setState({ citycen_id: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Passport ID is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicBirthday" hidden={isVR}>
                                    <Form.Row>
                                        <Col xs={7}>
                                            <Form.Label>Birthday<span className="text-danger">*</span></Form.Label>
                                            <Form.Row>
                                                <Form.Control value={utils.convertDateApiToString(birthdate)} required={!isVR} type="date" placeholder="Birthdate" max={moment().format("YYYY-MM-DD")} onChange={this.onSelectBirthdate} />
                                                <Form.Control.Feedback type="invalid">
                                                    Birthday is required!
                                            </Form.Control.Feedback>
                                            </Form.Row>

                                        </Col>
                                        <Col xs={5}>
                                            <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                                            {/* <select value={this.state.mycar}>
                                                        <option value="Ford">Ford</option>
                                                        <option value="Volvo">Volvo</option>
                                                        <option value="Fiat">Fiat</option>
                                                    </select> */}
                                            <Form.Control value={gender} as="select" onChange={this.onSelectGender} required={!isVR}>
                                                <option value="">Select gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Control>

                                            <Form.Control.Feedback type="invalid">
                                                Gender is required!
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone" >
                                    <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                                    <Form.Control minLength='10' type="number" placeholder="" value={phone} required onChange={e => this.setState({ phone: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Phone is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formGridAddress">
                                    <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                                    <Form.Control as="textarea" rows="2" placeholder="" value={address_no} required onChange={e => this.setState({ address_no: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Address is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Province<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={this.onSelectedprovince}
                                            required
                                            value={province}
                                        >
                                            <option value="">Select Province</option>
                                            {this.renderProvinces()}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Province is required!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>District<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={this.onSelectedDistrict}
                                            required
                                            value={district}
                                        >
                                            <option value="">Select District</option>
                                            {this.state.cities.map((item) => (
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
                                        <Form.Label>Sub District<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={this.onSelectedTumbon}
                                            required
                                            value={city}
                                        >
                                            <option value="">Select Sub District</option>
                                            {this.state.tumbons.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Sub district is required!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Postcode<span className="text-danger">*</span></Form.Label>
                                        <Form.Control required defaultValue={postcode} />
                                        <Form.Control.Feedback type="invalid">
                                            Postcode is required!
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit" className="float-right btn-custom rounded-pill px-4 ml-2" >
                                    <img
                                        width={25}
                                        height={20}
                                        className="mr-1"
                                        src={iconrunningwhite}
                                        alt="runex"
                                    />Next
                            </Button>
                                <Button type='button' variant="outline-secondary" className="float-right rounded-pill px-4"
                                    onClick={this.onClickBack.bind(this, event)}>Back</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
                <Row>

                </Row>
                <Card.Body hidden={!hasAddress}>
                    <Card.Title>Address</Card.Title>
                    <div className="clearfix">
                        {/* <h6 style={{ marginTop: 10 }} className="float-left">{fullname}</h6> */}
                        <Button className="float-right text-color-custom" style={{ borderColor: '#FA6400' }} variant="outline" onClick={this.editAddress} >{this.state.toggleEditAddress ? 'Cancel' : 'Edit'}</Button>
                    </div>
                    <Card.Text>
                        {this.state.firstname + ' ' + this.state.lastname}
                    </Card.Text>
                    <Card.Text>
                        {address_no + ' ' + city + ', ' + district + ', ' + province + ' ' + postcode}
                    </Card.Text>
                    <Card.Text>
                        {'เบอร์โทรศัพท์ : ' + this.state.phone}
                    </Card.Text>
                </Card.Body>

                <Card.Body hidden={!hasAddress || !this.state.toggleEditAddress}>
                    <h1>Edit Address</h1>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>ที่อยู่<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                name="address"
                                onChange={e => this.setState({ address_no_tmp: e.target.value })}
                                defaultValue={address_no}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Province<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.onSelectedprovince}
                                required
                                value={province}
                            >
                                <option value="">Select Province</option>
                                {this.renderProvinces()}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Province is required!
                                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>District<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.onSelectedDistrict}
                                required
                                value={district}
                            >
                                <option value="">Select District</option>
                                {this.state.cities.map((item) => (
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
                            <Form.Label>City<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.onSelectedTumbon}
                                required
                                value={city}
                            >
                                <option value="">Select City</option>
                                {this.state.tumbons.map((item) => (
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
                            <Form.Label>Postcode<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                required
                                defaultValue={postcode}
                            />
                            <Form.Control.Feedback type="invalid">
                                Postcode is required!
                                    </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group controlId="formBasicPhone" >
                            <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                            <Form.Control minLength='10' type="number" placeholder="" value={phone} required onChange={e => this.setState({ phone: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Phone is required!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button className="float-right btn-custom rounded-pill px-4 ml-2 d-flex justify-content-center align-content-between" onClick={this.onSaveAddress}>
                        <i className="material-icons">save</i>Save
                            </Button>
                </Card.Body>

                <Card.Body hidden={!hasAddress || this.state.toggleEditAddress}>
                    <Button className="float-right btn-custom rounded-pill px-4 ml-2" onClick={this.onClickNext.bind(this)}>
                        <img
                            width={25}
                            height={20}
                            className="mr-1"
                            src={iconrunningwhite}
                            alt="runex"
                        />Next
                            </Button>
                    <Button type='button' variant="outline-secondary" className="float-right rounded-pill px-4"
                        onClick={this.onClickBack.bind(this, event)}>Back</Button>
                </Card.Body>
                {/* <div className="fixed" style={{ position: 'fixed', bottom: '0', left: '0', width: '350px', height: '400px', overflowY: 'scroll', border: '3px solid #73AD21', backgroundColor: 'white', zIndex: 999 }}>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </div> */}
            </Card >
        )
    }
}
export default Address