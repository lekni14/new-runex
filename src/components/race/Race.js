import React from 'react'
import { Row, Col, Media, Card, Button, Form, FormLabel } from 'react-bootstrap'
import iconshirt from '../../images/icon-shirt.svg'
import iconshirtactive from '../../images/icon-tshirt-active.svg'
import iconmedal from '../../images/icon-medal.svg'
import iconrun from '../../images/icon-running.svg'
// import iconrunning from '../../images/icon-running.svg'
import { utils } from '../../utils/utils'
import iconrunningwhite from '../../images/icon-running-white.svg'
import { IMAGE_URL } from '../../utils/constants'
import Swal from 'sweetalert2'

class Race extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select_ticket: 'Select Distance',
            select_distance: 'Select Distance',
            productSize: -1,
            productOnTicketSize: -1,
            products: [],
            productTickets: [],
            size: undefined,
            priceShow: 0,
            selectTicket: undefined,
            reload: false,
            ticket: {}
        };
    }

    // componentWillReceiveProps(nextProp){
    //     const { event } = this.props
    //     if (event.event !== undefined && event.every !== null) {
    //         if(event.event.ticket.length > 0){
    //             this.setState({ticket:event.event.ticket[0]})
    //             console.log(event.event.ticket[0])
    //         }
    //     }
    // }
    onChangeTab = (step) => {
        this.props.handleOrder(this.state.products, this.state.productTickets)
        this.props.handleClickChange(step)
    }

    onChangeTicket = (e) => {
        const { event } = this.props
        event.event.ticket.map((item, index)=>{
            if(item.id === e.target.value){
                //console.log(e.target.value)
                this.setState({ticket:item})
                //this.setState({select_ticket:e.target.value})
                this.setState({selectTicket: undefined})
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
                ticket: this.state.ticket
            }
            arr.push(item)
        } else {
            //products.splice(currentIndex, 1)
            const item = {
                product: product,
                type: size.name,
                price: size.price,
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

    onClickNext = () => {
        const { productTickets, ticket } = this.state
        if (ticket.id === undefined || ticket.id === null){
            Swal.fire(
                '',
                'Please select distance.',
                'warning'
            )
        }else if (ticket.product != null && productTickets.length === 0) {
            Swal.fire(
                '',
                'Please select shirt size.',
                'warning'
            )
        } else {
            var check = 0
            if (ticket.product !== null){
                ticket.product.map((item) => (
                    item.show ? check += 1 : check += 0
                ))
                if (productTickets.length === check) {
                    this.props.handleClickChange(2)
                    this.props.handleOrder(this.state.products, productTickets)
                    
                }else{
                    Swal.fire(
                        '',
                        'Please select product on ticket.',
                        'warning'
                    )
                }
            }else if(ticket.price === 0){
                var arr = productTickets
                const item = {
                    product: {},
                    type: '',
                    price: 0.00,
                    ticket: ticket
                }
                arr.push(item)
                this.setState({ productTickets: arr},()=>{
                    this.props.handleClickChange(2)
                    this.props.handleOrder(this.state.products, productTickets)
                })
            }
            //this.onChangeTab.bind(this, this.props.nextTab)
        }
    }

    onClickBack = () => {
        this.props.handleClickChange(0)
        //this.props.handleClickChange({ Name: "Race detail", isActive: false })
    }

    checkIsAddOn=(event)=>{
        if(event.event !== null){
            if (event.event.product === null || event.event.product.length === 0) {
                return true
            }else{
                event.event.product.map((item)=>{
                    if (item.status === 'sold'){
                        return false
                    }
                })
            }

        }
        return true
    }

    showPrice () {
        const { event } = this.props
        const { products, selectTicket, ticket } = this.state
        var total = 0
        if (event.event !== undefined || event.event !== null) {
            if (selectTicket === undefined) {
                if (event.event.ticket.length > 0) {
                    total = event.event.ticket[0].price
                    products.map((element) => (
                        total += element.price
                    ))
                }
            } else {
                total = selectTicket.ticket.price
                products.map((element) => (
                    total += element.price
                ))
            }

        }
        // if (total === 0) {
        //     return 'ฟรี'
        // }
        return total
    }

    displayFinishedAward = (id) => {
        var datas = []
        if (id === '5ef2185f2fbe178b33190df0') {
            datas.push(
                <Media style={{marginTop:8}}>
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
                <Media style={{marginTop:8}}>
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
                <Media style={{marginTop:8}}>
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
        const { productOnTicketSize, ticket } = this.state
        const { event } = this.props
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col lg={5} md={12} className="component-event-aside">
                            <Card className="mb-5">
                                <Card.Img variant="top" src={event.event ? IMAGE_URL + event.event.cover : ''} />
                                <Card.Body>
                                    <h4 className="h4">{event.event ? event.event.name : ''}</h4>
                                    <h1 className="mb-0" onChange={e => this.setState({ showPrice: e.value })}>{this.showPrice() + ' ' + event.event.ticket[0].unit}</h1>
                                    {/* <p className="text-muted mb-4">(including. postage fee)</p> */}
                                    <Card.Title style={{ display: event.event ? (event.event.is_free === true ? "none" : "block") : 'none' }}>Finisher’s Award</Card.Title>
                                    <Media style={{ marginTop: 8}} hidden={event.event ? (event.event.is_free === true ? false : false) : false}>
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
                                    { event.event ? this.displayFinishedAward(event.event.id) : '' }
                                </Card.Body>
                                <Card.Footer className="bg-white mb-3">
                                    <h6>Hurry! Registration close in</h6>
                                    <ul className="list-group list-group-horizontal text-center">
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
                        <Col lg={7} md={12}>
                            <Card.Title>Race detail</Card.Title>
                            <Form className="mb-5">
                                <Form.Group controlId="formTicket">
                                    <Form.Label>Distance<span className="text-danger">*</span></Form.Label>
                                    <select className="custom-select" onChange={this.onChangeTicket.bind()}>
                                        <option value='' key='99'>{this.state.select_ticket}</option>
                                        {event.event ? event.event.ticket.map((item, index) => (
                                            <option value={item.id} key={index}>{item.title+' '+item.distance+ ' km.'}</option>
                                        )) : ''}
                                    </select>
                                </Form.Group> 
                                {ticket.product ? event.event.product ? event.event.product.map((prod, index) => (
                                        ticket.product.map((item) => (
                                            (item.id === prod.id && item.show) ? (
                                                <Form.Group className="mb-5" key={ticket.id + index}>
                                                    <Form.Label>{prod.name}<span className="text-danger"></span></Form.Label>
                                                    <Form.Label>{prod.detail}<span className="text-danger"></span></Form.Label>
                                                    <Row className="pirate">
                                                        {prod.type ? prod.type.map((type, index) => (
                                                            <Col className="col-half-offset" sm="2" xs="2" key={prod.id + index}>
                                                                <Card style={{cursor: 'pointer', borderColor: this.checkProductTicket(prod, type) ? '#FA6400' : 'rgba(0,0,0,0.19)' }} className="text-center" >
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
                                <hr />
                                <FormLabel style={{ display: event.event ? (this.checkIsAddOn(event) ? "none" : "block") : 'none' }}>Add on</FormLabel>
                                {event.event ? event.event.product.map((item, index) => (
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
                                                <Card style={{cursor: 'pointer', borderColor: this.checkProductAndSize(item, type) ? '#FA6400' : 'rgba(0,0,0,0.19)' }}
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
                                            <Card style={{cursor: 'pointer', borderColor: (this.checkProductIndex(item) === -1) ? '#FA6400' : 'rgba(0,0,0,0.19)', padding: 1 }}
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
                            </Form>
                            <Button className="float-right btn-custom rounded-pill px-4 ml-2" onClick={this.onClickNext}>
                                <img
                                    width={25}
                                    height={20}
                                    className="mr-1"
                                    src={iconrunningwhite}
                                    alt="runex"
                                />Next
                                    </Button>
                            <Button variant="outline-secondary" className="float-right rounded-pill px-4"
                                onClick={this.onClickBack}>Back</Button>
                            {/* <Button variant="light" className="float-right border-1 rounded-pill px-4" 
                            onClick={this.props.changeTab.bind(this, { Name: "Race detail", isActive: false })}>
                                        Back
                                    </Button> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
export default Race