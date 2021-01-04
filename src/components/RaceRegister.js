import React, { Component } from 'react'
import { eventService } from '../services'


export default class RaceRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            tickets: [],
            products: [],
        };
    }
    componentDidMount() {
        this.getEvent()
    }
    getEvent() {
        const { slug } = this.props.match.params
        // const { eventID } = this.props.route.match.params

        eventService.getEventInfoBySlug(slug).then(res => {
            
            if (res.data.code === 200) {
                const { event } = res.data.data
                    let ticketArray = []
                    let productsArray = []
                    let productArray = []
                    // var result = Object.keys(event.ticket.products).map((key) => [Number(key), event.ticket.products[key]]);
                    // console.log(result)
                    // Set tickets
                    event.ticket && event.ticket.length > 0 && event.ticket.map((ticket, index) => {
                        const productTemps = ticket.products
                        productArray.push(productTemps)
                        const ticketTemp = {
                            ...ticket,
                            id: ticket.id,
                            title: ticket.title,
                            description: ticket.description,
                            price: ticket.price,
                            distance: ticket.distance,
                            quantity: ticket.quantity,
                            ticket_type: ticket.ticket_type,
                            team: ticket.team,
                            currency: "THB",
                            prodect: productArray
                        }
                        // console.log(ticketArray.filter(ticket => ticket.products && ticket.products.find(bb => bb.name ==='')))
                        
                        ticket.products && JSON.stringify(ticket.products, function (key, product) {
                            const typeInitial = []
                            product.sizes && product.sizes.length > 0 && product.sizes.map((size) => {
                                const sizeTemp = {
                                    name: size.name,
                                    remark: size.remark
                                }
                                typeInitial.push(sizeTemp)
                            })
                            
                          
                            const productTemps = {
                                ...product,
                                id: product.id,
                                name: product.name,
                                image: [{
                                    path_url: product.image[0].path_url
                                }],
                                detail: product.detail,
                                sizes: typeInitial,
                                status: product.status,
                                is_show: ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.name === product.name && bb.is_show === true)).length > 0,
                                forAllTicket: ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.name === product.name)).length === ticketArray.length,
                                ticketTitle: (ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.name === product.name)).length === ticketArray.length)?'':ticket.title
                            }
                            
                            // name: '',
                            // image: [{
                            //     path_url: null
                            // }],
                            // detail: '',
                            // sizes: [
                            //     typeInitial
                            // ],
                            // unit: 0,
                            // status: 'sold',
                            // is_show: true,
                            // forAllTicket: true,
                            // reuse: true,
                            // ticketID: 0
                            productsArray.push(productTemps)
                        })
                        ticketArray.push(ticketTemp)
                    })
                    
                    // Set products
                    /*event.product && event.product.length > 0 && event.product.map((product) => {
                        const typeTemp = []

                        product.type && product.type.length > 0 && product.type.map((type) => {
                            const typeInitial = {
                                name: type.name,
                                remark: type.remark,
                                price: type.price
                            }
                            typeTemp.push(typeInitial)
                        })

                        const productTemp = {
                            ...product,
                            id: product.id,
                            name: product.name,
                            image: [{
                                path_url: product.image[0].path_url
                            }],
                            detail: product.detail,
                            types: typeTemp,
                            unit: product.unit,
                            status: product.status,
                            show: ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.id === product.id && bb.show === true)).length > 0,
                            forAllTicket: ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.id === product.id)).length === ticketArray.length,
                            ticketID: ''
                        }

                        if (ticketArray.filter(ticket => ticket.product && ticket.product.find(bb => bb.id === product.id)).length === ticketArray.length) {
                            productTemp.ticketID = ''
                        } else {
                            ticketArray.map((ticket, indexA) => {
                                ticket.product && ticket.product.some(bb => {
                                    if (bb.id === product.id) {
                                        return (productTemp.ticketID = indexA)
                                    }
                                })
                            })
                        }

                        productArray.push(productTemp)
                    })*/

                    //ticketArray.map((tick) => tick.product = [])
                    let dataFromServer = {
                        name: event.name,
                        category: event.category,

                        cover: event.cover,
                        cover_thumb: event.cover_thumb[0].image,

                        location: event.location,
                        receive_location: event.receive_location,
                        is_post: event.is_post,
                        // post_end_date: moment(moment(event.post_end_date).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
                
                        // post_end_date: event.post_end_date ? moment(utils.convertDateApiToString(event.post_end_date), 'DD-MM-YYYY').toDate() : moment().toDate(),
                        // is_free: event.is_free,
                        // inapp: event.inapp,

                        // startReg: moment(moment(event.start_reg).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
                        // startTimeReg: moment(moment(event.start_reg).utc().format('HH:mm:ss'), 'HH:mm:ss').toDate(),
                        // endReg: moment(moment(event.end_reg).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
                        // endTimeReg: moment(moment(event.end_reg).utc().format('HH:mm:ss'), 'HH:mm:ss').toDate(),

                        // startEvent: moment(moment(event.start_event).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
                        // startTimeEvent: moment(moment(event.start_event).utc().format('HH:mm:ss'), 'HH:mm:ss').toDate(),
                        // endEvent: moment(moment(event.end_event).utc().format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
                        // endTimeEvent: moment(moment(event.end_event).utc().format('HH:mm:ss'), 'HH:mm:ss').toDate(),

                        // description: EditorState.createWithContent(convertFromRaw(JSON.parse(event.body))),

                        tickets: ticketArray,

                        products: productsArray,
                        partner: event.partner
                    }
                    
                    // initialFormData = dataFromServer
                this.setState({
                    event: res.data.data.event
                })
                this.setState({
                    tickets: dataFromServer.tickets
                })
                this.setState({
                    products: dataFromServer.products
                })
            }
        })
    }
    render() {
        const { event, tickets, products } = this.state 
        
        // if(event.event.category.name === 'Run'){
        //     history.push('/raceregister/'+eventID)
        // }else{
        //     history.push('/register/'+eventID)
        // }
        return (
            <Register event={event} tickets={tickets} products={products} />
        )
    }
}
const Race = React.lazy(() => import('./race/Register'));
const Visual = React.lazy(() => import('./visual/RaceProfile'));
function Register(props) {
    const {event, tickets, products} = props
    // const {category} = (props.event)?props.event.category:null;
    // console.log(category)
    if (event.category!=="Virtual Run") {
        return <Race event={props.event} tickets={props.tickets} products={props.products} />;
    }
    return <Visual event={props.event} tickets={props.tickets} products={props.products}/>;
}