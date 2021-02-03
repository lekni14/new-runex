/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Row, Col, Media, Card, Button, Form, Container } from 'react-bootstrap'
import iconmedal from '../../images/icon-medal.svg'
import iconshirt from '../../images/icon-shirt.svg'
import iconshirtactive from '../../images/icon-tshirt-active.svg'
// import iconrunning from '../../images/icon-running.svg'
import iconrunningwhite from '../../images/icon-running-white.svg'
//import moment from 'moment'
import { utils } from '../../utils/utils'
import { history } from '../../store'
import { getDistrict, getTambon, getProvince, getAmphoe, regEventService } from '../../services'
// import { CountryDropdown } from 'react-country-region-selector'
import Swal from 'sweetalert2'
import ReactDatePicker from 'react-datepicker'
import { category } from '../../utils/constants'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core'
import validator from "validator";
import empty from "is-empty";

export default function RaceProfile(props) {
    const event = props.event
    const tickets = event.tickets
    const [firstname, setFirstname] = useState('')
    const [citycen_id, setCitycenID] = useState('')
    const [lastname, setLastname] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [phone, setPhone] = useState('')
    const [birthdateApi, setBirthdateApi] = useState('')
    const [gender, setGender] = useState('')
    const [blood_type, setBloodType] = useState('')
    const [emergency_phone, setEmergencyPhone] = useState('')
    const [emergency_contact, setEmergencyContact] = useState('')
    const [reciept_type, setRecieptType] = useState(event.category === category.VR ? 'postman' : 'yourself')
    const [shirts, setShirts] = useState(null)
    const [tambons, setTambons] = useState([])
    const [tambon, setTambon] = useState(null)
    const [ticket, setTicket] = useState(null)
    const [validated, setValidated] = useState(false)
    const [address_no, setAddressNo] = useState('')
    const [errors, setErrors] = useState({});
    const [isReg, setIsReg] = useState(false)

    useEffect(() => {
        regEventService.checkRegEvent(event.code).then(res=>{
            if(res.code === 200){
                setIsReg(res.data.is_reg)
                if(res.data.is_reg){
                    history.push('/')
                    history.go(0)
                }
            }
        }).catch(err=>{
            
        })
    }, [event.code])

    function onSelectBirthdate(e) {
        setBirthdateApi(utils.convertDateToApi(e))
        setBirthdate(e)
    }

    const onSelectGender = (e) => {
        setGender(e.target.value)
    }

    function onChangeCitycenValue(e) {
        setCitycenID(e.target.value)
    }

    function onSelectBloodType(e) {
        setBloodType(e.target.value)
    }

    function searchDistrict(e, v) {
        if (v.length > 2) {
            getDistrict(v).then(res => {
                console.log(res.data)
                setTambons(res.data)
            }).catch(err => {
                setTambons([])
            })
        }
    }

    function searchAmphoe(e, v) {
        if (v.length > 2) {
            getAmphoe(v).then(res => {
                setTambons(res.data)
            }).catch(err => {
                setTambons([])
            })
        }
    }

    function searchProvince(e, v) {
        if (v.length > 2) {
            getProvince(v).then(res => {
                setTambons(res.data)
            }).catch(err => {
                setTambons([])
            })
        }
    }

    function searchZipcode(e, v) {
        if (v.length > 3) {
            getTambon(v).then(res => {
                setTambons(res.data)
            }).catch(err => {
                setTambons([])
            })
        }
    }

    function onTambonChange(event, values) {
        console.log(values)
        setTambon(values)
    }

    function onChangeTicket(e) {
        tickets.map((item) => {
            if (item.id === e.target.value) {
                setTicket(item)
            }
        })
    }

    const onSelectedSize = (s) => {
        setShirts(s)
    }

    function checkProductTicket(shirt) {
        var check = false
        if (shirts !== null && shirts !== undefined) {
            // eveent.shirts.map((element) => {
            if (shirts.id === shirt.id) {
                check = true
            }

        }

        // })
        return check
    }

    function showPrice() {
        var total = 0
        if (ticket !== null && ticket !== undefined) {
            total += parseFloat(ticket.price)
            if(event.category === category.ER){
                if (reciept_type === 'postman') {
                    total += 60
                }
            }
        }
        // if (total === 0) {
        //     return 'ฟรี'
        // }
        return total
    }

    function validateThaiCitizenID(id) {
        if (
            id.length !== 13 ||
            id.charAt(0).match(/[09]/)
        ) return false;

        var sum = 0;
        for (var i = 0; i < 12; i++) {
            sum += parseInt(id.charAt(i)) * (13 - i);
        }

        if ((11 - sum % 11) % 10 !== parseInt(id.charAt(12))) {
            return false;
        }

        return true;
    }

    function saveData() {
        // var address = {
        //     address: address_no,
        //     province: province,
        //     district: district,
        //     city: city,
        //     zipcode: postcode
        // }

        var address = `${address_no}, ${tambon.district}, ${tambon.amphoe}, ${tambon.province}, ${tambon.zipcode.toString()}`

        var data = {
            birthdate: utils.convertDateToApi(birthdateApi),
            phone: phone,
            emergency_contact: emergency_contact,
            emergency_phone: emergency_phone,
            gender: gender,
            citycen_id: citycen_id,
            address: address,
            address_no: address_no,
            tambon: tambon,
            firstname: firstname,
            lastname: lastname,
            blood_type: blood_type,
            fullname: firstname + ' ' + lastname
        }

        if (ticket === undefined || ticket === null) {
            Swal.fire(
                '',
                'Please select distance.',
                'warning'
            )
        } else if (event.shirts.length !== 0 && shirts === null) {
            Swal.fire(
                '',
                'Please select shirt size.',
                'warning'
            )
        } else {
            const ticket_options = {
                user_option: data,
                tickets: ticket,
                shirts: shirts,
                total_price: showPrice(),
                reciept_type: reciept_type
            }
            history.push('/regsummary',
                {
                    ticket: tickets,
                    event: event,
                    ticket_options: [ticket_options],
                    index: 0
                }
            )
            history.go(0)
        }
    }

    const handleValidate = e => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const allErrors = {};

            // validation
            if (!validator.isMobilePhone(phone, ["th-TH"])) {
                allErrors.phone = "Invalid phone number";
            }

            if (!validateThaiCitizenID(citycen_id)) {
                allErrors.citycen_id = "Invalid Citycen ID";
            }

            if (!empty(allErrors)) {
                setErrors(allErrors);
                setValidated(false);
            }
            else {
                saveData()
                setValidated(true);
            }
            
        }
        // setValidated(true)

    }

    return (
        <div>
            <Container className="mt-5" >
                <Card >
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <Card className="mb-5">
                                    <Card.Img variant="top" src={event ? event.cover : ''} />
                                    <Card.Body>
                                        <h4 className="h4">{event ? event.name : ''}</h4>
                                        <p className="text-muted mb-4" style={{ color: '#FA6400', display: ticket !== undefined ? "block" : 'none' }} >Total Price</p>
                                        <h1 className="mb-0">{showPrice() + ' THB'} </h1>
                                        {/* <p className="text-muted mb-4" style={{ display: event ? (event.is_free === true ? "none" : "block") : 'none' }}>(including. postage fee)</p> */}
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
                                        <Card.Title>User Info </Card.Title>
                                        <Form className="mb-5" validated={validated} onSubmit={handleValidate}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>Firstname<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={firstname}
                                                        placeholder="Firstname"
                                                        onChange={e => setFirstname(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="validationCustom02">
                                                    <Form.Label>Lastname<span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={lastname}
                                                        placeholder="Lastname"
                                                        onChange={e => setLastname(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Form.Group>

                                            </Form.Row>

                                            <Form.Group controlId="formBasicBirthday">
                                                <Form.Row>
                                                    {/* <Col xs={5}> */}
                                                    {/* <Form.Label>ID Card Number, Passport<span className="text-danger">*</span></Form.Label> */}
                                                    {/* <Form.Control value={citycen_type} as="select" onChange={this.onSelectCitycen} required>
                                                            <option value="CiticenID">บัตรประชาชน</option>
                                                            <option value="Passport">Passport</option>
                                                        </Form.Control> */}
                                                    {/* </Col> */}
                                                    <Col >
                                                        <Form.Label>ID Card Number, Passport<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control value={citycen_id} maxLength='13' type="number" placeholder="ระบุหมายเลข, Specify number" required isInvalid={!!errors.citycen_id}  onChange={e => onChangeCitycenValue(e)} />
                                                        <Form.Control.Feedback type="invalid">บัตรประชาชน หรือ Passport ID is required!</Form.Control.Feedback>

                                                    </Col>

                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control minLength='10' maxLength="10" type="number" placeholder="Phone Number" value={phone} required isInvalid={!!errors.phone}  onChange={e => setPhone(e.target.value)} />
                                                        <Form.Control.Feedback type="invalid">Phone is required!</Form.Control.Feedback>

                                                    </Col>
                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicGender">
                                                <Form.Row>
                                                    <Col >
                                                        <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control value={gender} as="select" onChange={e => onSelectGender(e)} required>
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">Gender is required!</Form.Control.Feedback>

                                                    </Col>
                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicBirthday">
                                                <Form.Row>
                                                    <Col >
                                                        <Form.Label>Birthday <span className="text-danger">*</span></Form.Label>
                                                        <Form.Row>
                                                            <ReactDatePicker
                                                                // selected={utils.convertDateApiToString(birthdate)}
                                                                value={utils.convertDateApiToString(birthdate)}
                                                                onChange={e => onSelectBirthdate(e)}
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
                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicBlood">
                                                <Form.Row>
                                                    <Col >
                                                        <Form.Label>Blood type<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control value={blood_type} as="select" onChange={e => onSelectBloodType(e)} required>
                                                            <option value="">Select</option>
                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                            <option value="AB">AB</option>
                                                            <option value="O">O</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">Gender is required!</Form.Control.Feedback>
                                                    </Col>
                                                </Form.Row>
                                            </Form.Group>

                                            <br />
                                            <hr color='#FA6400'></hr>
                                            <br />

                                            <Form.Group controlId="formGridAddress">
                                                <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                                                <Form.Control as="textarea" rows="2" placeholder="" value={address_no} required onChange={e => setAddressNo(e.target.value)} />
                                                <Form.Control.Feedback type="invalid">Address is required!</Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="formGridZip">
                                                <Form.Label>ตำบล, District<span className="text-danger">*</span></Form.Label>
                                                <Autocomplete
                                                    id="combo-box-address"
                                                    name="combo-address"
                                                    placeholder="District"
                                                    options={tambons}
                                                    renderOption={(option) => `${option.district}, ${option.amphoe}, ${option.province}, ${option.zipcode}`}
                                                    getOptionLabel={(option) => `${option.district}`}
                                                    value={tambon}
                                                    onInputChange={(event, value) => searchDistrict(event, value)}
                                                    onChange={(event, value) => onTambonChange(event, value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} label="district" variant="outlined" required
                                                        />
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">District is required!</Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="formGridZip">
                                                <Form.Label>อำเภอ, Amphoe<span className="text-danger">*</span></Form.Label>
                                                <Autocomplete
                                                    id="combo-box-address"
                                                    name="combo-address"
                                                    placeholder="Amphoe"
                                                    options={tambons}
                                                    renderOption={(option) => `${option.district}, ${option.amphoe}, ${option.province}, ${option.zipcode}`}
                                                    getOptionLabel={(option) => `${option.amphoe}`}
                                                    value={tambon}
                                                    onInputChange={(event, value) => searchAmphoe(event, value)}
                                                    onChange={(event, value) => onTambonChange(event, value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} label="amphoe" variant="outlined" required
                                                        />
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">District is required!</Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="formGridZip">
                                                <Form.Label>จังหวัด, Province<span className="text-danger">*</span></Form.Label>
                                                <Autocomplete
                                                    id="combo-box-address"
                                                    name="combo-address"
                                                    placeholder="Province"
                                                    options={tambons}
                                                    renderOption={(option) => `${option.district}, ${option.amphoe}, ${option.province}, ${option.zipcode}`}
                                                    getOptionLabel={(option) => `${option.province}`}
                                                    value={tambon}
                                                    onInputChange={(event, value) => searchProvince(event, value)}
                                                    onChange={(event, value) => onTambonChange(event, value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} label="province" variant="outlined" required
                                                        />
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">District is required!</Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="formGridZip">
                                                <Form.Label>รหัสไปรษณีย์, Zipcode<span className="text-danger">*</span></Form.Label>
                                                <Autocomplete
                                                    id="combo-box-address"
                                                    name="combo-address"
                                                    placeholder="zipcode, tambon, district, province"
                                                    options={tambons}
                                                    getOptionSelected={(obj, newval) => obj.zipcode === newval.zipcode}
                                                    renderOption={(option) => `${option.district}, ${option.amphoe}, ${option.province}, ${option.zipcode}`}
                                                    getOptionLabel={(option) => `${option.zipcode}`}
                                                    value={tambon}
                                                    onInputChange={(event, value) => searchZipcode(event, value)}
                                                    onChange={(event, value) => onTambonChange(event, value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} label="zipcode" variant="outlined" required
                                                        />
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">Postcode is required!</Form.Control.Feedback>
                                            </Form.Group>
                                            <br />
                                            <hr color='#FA6400'></hr>
                                            <br />

                                            <Form.Group controlId="formTicket">
                                                <Form.Label>ระบุระยะ, Distance<span className="text-danger">*</span></Form.Label>
                                                <select value={ticket !== null ? ticket.id : ''} className="custom-select" onChange={e => onChangeTicket(e)}>
                                                    <option value='' key='99'>{'Selcted Ticket'}</option>
                                                    {
                                                        tickets !== undefined ? tickets.map((item, key) => (
                                                            <option value={item.id} key={key}>{item.title + ' ' + item.distance + ' km.'}</option>
                                                        )
                                                        ) : ''}
                                                </select>
                                            </Form.Group>
                                            <Form.Group className="mb-5">
                                                <Form.Label> <span className="text-danger"></span></Form.Label>
                                                {/* <Form.Label>{prod.detail}<span className="text-danger"></span></Form.Label> */}
                                                <Row className="pirate">
                                                    {event.shirts ? event.shirts.map((prod, index) => (
                                                        (event.shirts.length === index) ? (
                                                            <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                <Card key={prod.id + index} style={{ cursor: 'pointer', borderColor: checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center mt-1" >
                                                                    <Card.Body className="p-2" style={{ color: checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.75)' }}
                                                                        onClick={e => onSelectedSize(prod)}>

                                                                        <img
                                                                            width={25}
                                                                            height={20}
                                                                            className="mr-1"
                                                                            src={checkProductTicket(prod) ? iconshirtactive : iconshirt}
                                                                            alt="runex"
                                                                        />
                                                                        <h6 className="card-text">{prod.size}<br></br><small>{prod.chest}</small></h6>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        ) : (
                                                                <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                    <Card key={prod.id + index} style={{ cursor: 'pointer', borderColor: checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center mt-1" >
                                                                        <Card.Body className="p-2" style={{ color: checkProductTicket(prod) ? '#FA6400' : 'rgba(0,0,0,0.75)' }}
                                                                            onClick={e => onSelectedSize(prod)}>

                                                                            <img
                                                                                width={25}
                                                                                height={20}
                                                                                className="mr-1"
                                                                                src={checkProductTicket(prod) ? iconshirtactive : iconshirt}
                                                                                alt="runex"
                                                                            />
                                                                            <h6 className="card-text">{prod.size}<br></br><small>{prod.chest}</small></h6>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>
                                                            )
                                                    )) : ''}
                                                </Row>
                                                {/* <Row className="size">
                                                    <Col className="mt-2" sm="2" xs="4" key={item.id + '99'}>
                                                        <Card style={{ cursor: 'pointer', borderColor: (this.checkProductIndex(item) === -1) ? '#FA6400' : 'rgba(0,0,0,0.19)', padding: 1 }}
                                                            className="text-center" >
                                                            <Card.Body className="p-2" style={{ color: (productOnTicketSize === index ? '#FA6400' : 'rgba(0,0,0,0.75)'), padding: 1 }}
                                                                onClick={this.onSelectedProduct.bind(this, true, item, null)}>

                                                                <h6 className="card-text">ไม่ได้เลือก<br></br><small></small></h6>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row> */}
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
                                                            onClick={() => setRecieptType('yourself')}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label='รับเสื้อทางไปรษณีย์ (ค่าจัดส่ง 60  บาท)'
                                                            name="shippingRadios"
                                                            id="RecieptPost"
                                                            onClick={() => setRecieptType('postman')}
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
                                                        {event.category !== "VR" ? <Form.Control type="text" placeholder="ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact" value={emergency_contact} required onChange={e => setEmergencyContact(e.target.value)} /> : <Form.Control type="text" placeholder="ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact" value={emergency_contact} onChange={e => this.setState({ emergency_contact: e.target.value })} />}
                                                        <Form.Control.Feedback type="invalid">ชื่อผู้ติดต่อฉุกเฉิน, Emergency contact is required!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    {/* {(event.catagory === "VR" ? required:'')} */}
                                                    <Form.Group controlId="formEmergencyPhone">
                                                        <Form.Label>เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number<span className="text-danger">*</span></Form.Label>
                                                        {event.category !== "VR" ? <Form.Control type="text" placeholder="เบอร์โทรผู้ติดต่อฉุกเฉย, Emergency contact number" value={emergency_phone} required onChange={e => setEmergencyPhone(e.target.value)} /> : <Form.Control type="text" placeholder="เบอร์โทรผู้ติดต่อฉุกเฉย, Emergency contact number" value={emergency_phone} onChange={e => this.setState({ emergency_phone: e.target.value })} />}

                                                        <Form.Control.Feedback type="invalid">เบอร์โทรผู้ติดต่อฉุกเฉิน, Emergency contact number is required!</Form.Control.Feedback>
                                                    </Form.Group>
                                                </>
                                                : ""}
                                            <Row className="justify-content-md-center" style={{ display:isReg ? "none" : "block"}}>
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
