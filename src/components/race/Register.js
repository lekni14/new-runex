import React from 'react'
import { Content } from '.'
import { eventService } from '../../services'
import Icon from '@material-ui/core/Icon';


// import ReactWizard from 'react-bootstrap-wizard';
// import { Container, Row, Col } from 'reactstrap';
import { Navbar, Nav, Container} from 'react-bootstrap'

// const StepsName = [
//   { Name: "Address", isActive: true, status:'active' },
//   { Name: "Race detail", isActive: false, status:'wait' },
//   { Name: "Confirm", isActive: false, status:'wait' }
// ]
import { history } from '../../store'

class Steps extends React.Component {

  onClickTap=(data)=>{
    this.setState({activeTab:data})
    this.props.changeTab(data)
  }

  render () {
    return (
      <Navbar bg="light" variant="light" expand="md" style={{ minHeight: '80' }} className="border-1 navbar-step py-0">
        <Container>
          <Nav className="mr-auto nav-step">
            {/*  */}
            {this.props.stepName.map(function (n, i) {
              return (
              <Tab collapse={this.props.collapse} onOpenCollapse={this.props.onOpenCollapse} data={n} key={i} /> 
              );
            }.bind(this))}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            {this.props.stepName.map(function (n, i) {
              return (
                n.status === 'active' ?  (i+1)+'/3' : ''
                )
            })}
              </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

class Tab extends React.Component {

  // constructor(props){
  //   super(props)
  // }

  onChangeTab=()=>{
    this.props.handleClickChange(this.props.data)
  }
  onOpenCollapse=()=>{
    this.props.onOpenCollapse()
    // this.props.handleClickChange(this.props.data)
  }

  render() {
    var hidden = this.props.data.Name==='Confirm' ? "float-right mt-1 show-mobile d-none" : "float-right mt-1 d-none"
    return (
      // <Nav.Link onClick={this.onChangeTab.bind()} className={this.props.data.status==='wait'?'disabled':''}>
      <Nav.Link className={this.props.data.status==='wait'?'disabled':this.props.data.status}  onClick={this.onOpenCollapse.bind()}>
        <IconRunnung color={this.props.data.status}></IconRunnung>
      {this.props.data.Name}<Icon  className={hidden}>{this.props.collapse===true?'keyboard_arrow_up':'keyboard_arrow_down'}</Icon>
    </Nav.Link>
    );
  }
}

function IconRunnung(props) {
  console.log(props)
  const color = props.color==='active' ? '#FA6400':props.color==='finish' ?'#5EB503':'rgba(0,0,0,0.5)'
  
  return (
    <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" style={{ width: '32', margin :'0 5px 0 0' }}  width="32" height="32" viewBox="0 0 487.811 487.81" aria-labelledby="title">
      <title id="title">Umbrella</title>
      <g id="_x33_6_24_" fill={color}>
        <g>
          <path d="M150.463,109.521h150.512c3.955,0,7.16-3.206,7.16-7.161c0-3.955-3.205-7.161-7.16-7.161H150.463
            c-3.955,0-7.161,3.206-7.161,7.161C143.302,106.315,146.508,109.521,150.463,109.521z"/>
          <path d="M15.853,179.537h150.511c3.955,0,7.161-3.206,7.161-7.161s-3.206-7.16-7.161-7.16H15.853
            c-3.955,0-7.161,3.205-7.161,7.16S11.898,179.537,15.853,179.537z"/>
          <path d="M56.258,253.214c0,3.955,3.206,7.162,7.161,7.162H213.93c3.955,0,7.161-3.207,7.161-7.162s-3.206-7.16-7.161-7.16H63.419
            C59.464,246.054,56.258,249.259,56.258,253.214z"/>
          <path d="M142.396,336.44H7.161C3.206,336.44,0,339.645,0,343.6s3.206,7.161,7.161,7.161h135.235c3.955,0,7.161-3.206,7.161-7.161
            S146.351,336.44,142.396,336.44z"/>
          <path d="M385.729,154.418c21.6,0,39.111-17.513,39.111-39.114s-17.512-39.113-39.111-39.113
            c-21.605,0-39.119,17.513-39.119,39.113C346.609,136.905,364.123,154.418,385.729,154.418z"/>
          <path d="M450.066,143.155c-22.459,31.459-52.533,35.102-84.895,15.89c-2.203-1.306-11.977-6.691-14.141-7.977
            c-52.061-30.906-104.061-18.786-138.934,30.05c-14.819,20.771,19.455,40.459,34.108,19.93
            c18.018-25.232,40.929-32.533,65.986-24.541c-12.83,22.27-24.047,44.405-39.875,75.853
            c-15.832,31.448-50.787,56.562-84.374,36.92c-24.235-14.165-46.09,20.651-21.928,34.772
            c45.854,26.799,99.619,10.343,127.066-24.493c0.952,0.509,1.958,0.968,3.062,1.354c22.422,7.812,51.814,28.61,60.77,35.981
            c8.953,7.371,24.336,44.921,33.471,63.788c11.082,22.893,46.871,6.219,35.748-16.771c-10.355-21.406-27.736-64.129-41.293-74.938
            c-10.875-8.669-31.988-24.803-49.895-33.956c12.115-23.466,24.729-46.679,38.008-69.491
            c42.328,12.969,82.561-2.308,111.215-42.446C498.996,142.312,464.73,122.624,450.066,143.155z"/>
        </g>
      </g>
    </svg>
  )
}

class Regiter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: {},
      nextTab: {},
      backTab: {},
      event:{},
      is_collapse_open: true,
      StepsName: [
        { Name: "Address", isActive: false, status:'wait' },
        { Name: "Race detail", isActive: false, status:'wait' },
        { Name: "Confirm", isActive: false, status:'wait' }
      ]
    }
  }

  componentDidMount(){
    // this.getEvent()
    this.initailPage()
    this.state.StepsName[0]['isActive'] = true;
    this.state.StepsName[0]['status'] = 'active';
  }

  initailPage = async () => {
    await this.checkUserRegisterEvent()
    await this.getEvent()
  }

  getEvent () {
    const { eventID } = this.props.match.params
    // const { eventID } = this.props.route.match.params

    eventService.getEventInfo(eventID).then(res => {
        if (res.data.code === 200) {
            this.setState({
                event: res.data.data
            })
        }
    })
  }

  checkUserRegisterEvent = () => {
    const { eventID } = this.props.match.params

    eventService.checkUserRegisteredEvent(eventID).then(res => {
      if (res.data.code === 200) {
        if (res.data.data) {
          history.push('/my-event')
        }
      }
    })
  }

  handleClickChange=(step)=> {
    const { StepsName } = this.state
    var tmp = StepsName
    tmp.forEach(function(element, index) {
      if (index === step){
        element.status = 'active'
      }else if (index < step){
        element.status = 'finish'
      }else{
        element.status = 'wait'
      }
    })
    this.setState({StepsName:tmp})
  }

  onOpenCollapse=()=>{
    //console.log(this.state.is_collapse_open)
    if (this.state.is_collapse_open===true){
      this.setState({is_collapse_open:false})
    }
    else{
      this.setState({is_collapse_open:true})
    }
  }

  render () {
    const { regEvent } = this.props
    return (
      <div>
        <Steps collapse={this.state.is_collapse_open} onOpenCollapse={this.onOpenCollapse} stepName={this.state.StepsName}/> {/*changeTab={this.handleClickChange}*/} 
        <Container className="mt-5" >
        <Content collapse={this.state.is_collapse_open} stepName={this.state.StepsName} onTabChange={this.handleClickChange} event={this.state.event}/>
        </Container>
      </div>
    )
  }
}

export default Regiter
