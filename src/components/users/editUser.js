import React from 'react'
import { Container, Media, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap'
import ThaiAddress from "react-thai-address";
import iconuser from '../../assets/icon-user.svg';
import iconpassword from '../../assets/icon-password.svg';
import iconavatar from '../../assets/icon-avatar.svg';
import iconmail from '../../assets/icon-mail.svg'
// import Credentials from './Credentials';
import { utils } from '../../utils/utils';
import ReactDatePicker from 'react-datepicker';
import { userService } from '../../services';
import Swal from 'sweetalert2';
import Resizer from 'react-image-file-resizer'
// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';

// Globalize.locale('en')

// globalizeLocalizer()

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);



class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            isShow: false,
            shown: true,
            password: '',
            email: '',
            conf_password: '',
            firstname: '',
            lastname: '',
            citycen_id: '',
            gender: '',
            birthdate: '',
            birthdateApi: '',
            phone: '',
            image: '',
            image_preview: '',
            isLogin: true,
            validated: false,
            cities: [],
            tumbons: [],
            address: undefined,
            address_no_tmp: '',
            address_no: '',
            province: '',
            district: '',
            city: '',
            postcode: '',
            file: undefined,
            cURL: null
        }
    }
    componentDidMount () {
        if (utils.getUser() != null) {
            this.setState({ user: JSON.parse(utils.getUser()) }, () => {
                this.setState({ citycen_id: this.state.user.citycen_id })
                this.setState({ gender: this.state.user.gender })
                this.setState({ birthdate: this.state.user.birthdate })
                this.setState({ birthdateApi: this.state.user.birthdate })
                if (this.state.user.address !== undefined && this.state.user.address !== null) {
                    if (this.state.user.address.length > 0) {
                        const addr = this.state.user.address[0]
                        this.setState({ hasAddress: true })
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
            })
        }
        //console.log(sessionStorage.getItem('user'))

    }
    componentDidUpdate () {
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user) {
          //console.log(nextProps.user)
          this.setState({ user: JSON.parse(sessionStorage.getItem('user')) })
        //   Swal.fire({
        //     position: 'top-center',
        //     type: 'success',
        //     title: 'การเปลียนแปลงข้อมูลส่วนตัวสำเร็จ',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
        //   Swal.fire({
        //     title: '',
        //     type: 'success',
        //     html:
        //         'การเปลียนแปลงข้อมูลส่วนตัวสำเร็จ',
        //     showCloseButton: false,
        //     showCancelButton: false,
        //     focusConfirm: true,
        //     confirmButtonText:
        //         '<i class="fa fa-thumbs-up"></i> OK',
        //     confirmButtonAriaLabel: 'Thumbs up, great!'
        // })
        }
      }

    requestUpdateUser = async () => {
        var data = this.state.user
        await new Promise((resolve, reject) => {
            if (this.state.file) {
                userService.uploadAvatar(this.state.file).then(res => {
                    data.avatar = res.data.data.url
                    console.log(res.data.data.url)
                    resolve()
                })
            } else {
                resolve()
            }
        })
        console.log(data.avatar)
        var address = {
            address: this.state.address_no,
            province: this.state.province,
            district: this.state.district,
            city: this.state.city,
            zipcode: this.state.postcode
        }
        data.address = [address]
        // data.firstname = this.state.firstname
        // data.lastname = this.state.lastname
        data.citycen_id = this.state.citycen_id
        //data.phone = this.state.phone
        data.gender = this.state.gender
        data.birthdate = utils.convertDateToApi(this.state.birthdateApi)
        data.fullname = this.state.user.firstname + ' ' + this.state.user.lastname
        // data.blood_type = this.state.blood_type

        Swal.fire({
            title: 'กำลังส่งข้อมูล',
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
                this.props.updateProfile(data)
                Swal.close()
                // userService.updateUser(data).then(res => {
                //     Swal.close()
                //     // console.log(res)
                //     if (res.data.code === 200) {
                //         // console.log(res.data)
                //         sessionStorage.setItem("user", JSON.stringify(res.data.data))
                        // Swal.fire({
                        //     title: '',
                        //     type: 'success',
                        //     html:
                        //         'การเปลียนแปลงข้อมูลส่วนตัวสำเร็จ',
                        //     showCloseButton: false,
                        //     showCancelButton: false,
                        //     focusConfirm: true,
                        //     confirmButtonText:
                        //         '<i class="fa fa-thumbs-up"></i> OK',
                        //     confirmButtonAriaLabel: 'Thumbs up, great!'
                        // })
                //     } else {
                //         Swal.fire({
                //             title: '',
                //             type: 'warning',
                //             html:
                //                 'การเปลียนแปลงข้อมูลส่วนตัวไม่สำเร็จ',
                //             showCloseButton: false,
                //             showCancelButton: false,
                //             focusConfirm: true,
                //             confirmButtonText:
                //                 '<i class="fa fa-thumbs-up"></i> OK',
                //             confirmButtonAriaLabel: 'Thumbs up, great!'
                //         })
                //     }
                // })
            }
        })

    }

    onChange = e => {
        const { name, value } = e.target

        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }

    onChangeCitycenValue = e => {
        this.setState({ citycen_id: e.target.value })
    }

    onSelectBirthdate = (e) => {
        //`${this.state.toDateReg}T${this.state.toTimeReg}:00`,
        if(e === null || e === undefined){
            this.setState({ birthdateApi: '' })
            this.setState({ birthdate: '' })
        }else{
            this.setState({ birthdateApi: utils.convertDateToApi(e) })
            this.setState({ birthdate: e })
        }
        
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

    handleChange = (event) => {
        var fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                600,
                1400,
                'JPEG',
                100,
                0,
                blob => {
                    var file = new File([blob], "uploaded.jpg", { type: "image/jpeg", lastModified: Date.now() })
                    this.setState({ file: file })
                },
                'blob'
            )
        }

        //this.setState({uploadEnable:true})

        this.setState({
            cURL: URL.createObjectURL(event.target.files[0])
        })
    }

    updateForm = () => {
        // let formatter = Globalize.dateFormatter({ raw: 'MMM dd, yyyy' })
        const { validated, conf_password, password, citycen_id, gender, firstname, lastname, birthdate, phone, postcode, province, tumbons, city, cities, district, address_no, user } = this.state

        const handleValidate = event => {
            const form = event.currentTarget;
            console.log(form)
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                // this.signup()
                this.requestUpdateUser()
                console.log(this.state.user)
            }
            this.setState({ validated: true });
        };

        return (
            <div>
                <Form noValidate validated={validated} onSubmit={handleValidate}>
                    <h4 className="my-3">ข้อมูล</h4>

                    <Form.Group controlId="regFirstname">
                        <Form.Label>ชื่อ</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconuser} alt="" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="ชื่อ"
                                aria-describedby="inputGroupPrepend"
                                name="firstname"
                                defaultValue={this.state.user.firstname}
                                // value={this.state.user.firstname}
                                required
                                onChange={this.onChange.bind()}
                                isValid={validated && firstname.length >= 1}
                                isInvalid={validated && firstname.length < 1}
                            />
                            <Form.Control.Feedback type={validated ? 'valid' : 'invalid'}>Firstname is required!</Form.Control.Feedback>
                        </InputGroup>

                    </Form.Group>

                    <Form.Group controlId="regLastname">
                        <Form.Label>นามสกุล</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconuser} alt="" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="นามสกุล"
                                aria-describedby="inputGroupPrepend"
                                name="lastname"
                                required
                                defaultValue={this.state.user.lastname}
                                onChange={this.onChange}
                                isValid={validated && lastname.length >= 1}
                                isInvalid={validated && lastname.length < 1}
                            />
                            <Form.Control.Feedback type={validated ? 'valid' : 'invalid'}>Lastname is required!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>บัตรประชาชน หรือ Passport</Form.Label>
                        <Form.Control value={citycen_id} minLength='13' type="number" placeholder="ระบุหมายเลขบัตรประชาชนหรือ Passport" onChange={this.onChangeCitycenValue} />
                        <Form.Control.Feedback type="invalid">บัตรประชาชน หรือ Passport ID is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>วันเกิด </Form.Label>
                        <InputGroup>
                            <ReactDatePicker
                                // selected={utils.convertDateApiToString(birthdate)}
                                value={birthdate !== null && birthdate !== '' ? utils.convertDateApiToString(birthdate, "DD/MM/YYYY") : ''}
                                onChange={this.onSelectBirthdate}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                maxDate={new Date()}
                                selected={birthdate !== null && birthdate !== '' ? utils.dateFromApi(birthdate) : ''}
                                className="form-control"
                                dropdownMode="select"
                                placeholderText='DD-MM-YYYY'
                            />
                            {/* <Form.Control value={utils.convertDateApiToString(birthdate)} type="date" placeholder="วันที่, DD เดือน, MM ปี, YYYY" max={moment().format("YYYY-MM-DD")} onChange={this.onSelectBirthdate} /> */}
                            <Form.Control.Feedback type="invalid">Birthday  is required!</Form.Control.Feedback>
                        </InputGroup>
                        {/* <DateTimePicker format='mmm YYY' />
                        <DateTimePicker
                            defaultValue={new Date()}
                            time={false}
                        /> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>เพศ, Gender<span className="text-danger">*</span></Form.Label>
                        <Form.Control value={gender} as="select" onChange={this.onSelectGender} required>
                            <option value="">ระบุ, Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Gender is required!</Form.Control.Feedback>
                    </Form.Group>
                    <h4 className="my-5 py-3 border-top">Contacts</h4>
                    <Form.Group controlId="regEmail">
                        <Form.Label>อีเมล</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><img className="" src={iconmail} alt="" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="อีเมล์"
                                aria-describedby="inputGroupPrepend"
                                name="email"
                                defaultValue={this.state.user.email} readOnly
                            />
                            <Form.Control.Feedback type={validated ? 'valid' : 'invalid'}>Email is required!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

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
                                defaultValue={this.state.user.phone}
                                onChange={this.onChange}
                                isValid={validated && phone.length >= 1}
                                isInvalid={validated && phone.length < 1}
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
                            ></Form.Control>
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
                    <Button className="mr-2 mb-4" type='submit' variant="primary">
                        บันทึก
                    </Button>
                    <Button className="mr-2 mb-4" variant="secondary">
                        ยกเลิก
                    </Button>
                </Form>
                {/* <Credentials></Credentials> */}


            </div>

        )
    }

    render () {
        return (
            <Container>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="my-5"></h2>
                        <Row className="border-bottom">
                            <Col>
                                <h4>ข้อมูลส่วนตัว</h4>
                                <Media className="mb-3">
                                    <img
                                        width={100}
                                        height={100}
                                        className="mr-3 rounded-circle"
                                        src={this.state.cURL !== null ? this.state.cURL : this.state.user.avatar ? utils.getImageProfile(this.state.user.avatar) : this.state.user.avatar} onError={(e) => { e.target.onerror = null; e.target.src = iconuser }}
                                        alt="runex profile"
                                        onClick={() => this.image.click()}
                                    />
                                    {/* <input type="file" className="form-control" id="image" name="file" style={{ display: 'none' }} ref={this.setRefFromID} onChange={this.handleChange} />
                                    <img src={this.state.filePreview ? this.state.filePreview : imageUpload} alt="" width="110" className="img-thumbnail" style={{ cursor: 'pointer', display: 'inline-block' }} onClick={() => this.image.click()} /> */}
                                    <Media.Body>
                                        <label>เปลี่ยนรูปโปรไฟล์</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="validatedCustomFile" ref={(e) => this.image = e} onChange={this.handleChange} />
                                            <label className="custom-file-label">{this.state.file !== undefined ? '' : 'Choose file...'}</label>
                                        </div>
                                    </Media.Body>
                                </Media>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.updateForm()}
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        )
    }
}

// function mapState (state) {
//     const { user } = state.authentication;
//     return { user };
// }

// const actionCreators = {
//     updateProfile: userActions.updateProfile,
// };

// const connectedEditUserPage = connect(mapState, actionCreators)(editUser);
// export { connectedEditUserPage as editUser }

export default EditUser