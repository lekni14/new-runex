import React,{ Suspense } from 'react'
// import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux'
import { history } from './store'
import { alertActions } from './actions'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import AllEvent from './component/event/AllEvent'
// import { EventDetail } from './component/event'
import Header from './components/Header'
import Footer from './components/Footer'
import Swal from 'sweetalert2'
// import Home from './component/Home'
// import { PrivateRoute } from './route'
// import { Preview } from './component/event/Preview'
// import { Mpreview } from './component/event/Mpreview'
// import Register from './component/runex/Register'
// // import CreateEvent from './component/eventer/CreateEvent'
// import HomeOwner from './component/eventer/HomeOwner'
// import AddEvent from './component/eventer/AddEvent'
// import EditEvent from './component/eventer/EditEvent'
// //import CreateEvent from './component/eventer/CreateEvent'
// import { editUser } from './component/auth'
// import BackToTop from "react-back-to-top-button";
// import iconbacktotop from './images/icon-backtotop.svg'
// import Confirmation from './component/auth/ConfirmUser'
// import Upload from './component/Upload'
// import Landing from './component/runex/Landing'
// import MyEvent from './component/runex/MyEvent'
// import About from './component/Aboutus'
// import { PaymentSucc } from './component/runex'
// import PaymentReturn from './component/runex/PaymentReturn'
// import { css } from '@emotion/core';
// import BounceLoader from 'react-spinners/BounceLoader';
// import Contact from './component/Contact'
// import VirtaulRun from './component/VirtaulRun'
// import TrackingRealtime from './component/TrackingRealtime'
// import TrackProduct from './component/TrackProduct'
// import TrackDetail from './component/TrackDetail'
// import RunnnigTheDataAnalysis from './component/RunnnigTheDataAnalysis'
// import { PageLogin, PageRegister, ResetPassword } from './component/auth'
import ReactGA from 'react-ga'
// import PaymentInform from './component/PaymentInform'
// import TermsAndCondition from './component/TermsAndCondition'
// import RefundPolicy from './component/RefundPolicy'
// import Dashboard from './component/runex/Dashboard'
import RaceProfile from './components/RaceRegister'
import AddOtherPerson from './components/regrace/AddOtherPerson'
import RaceSummary from './components/regrace/RaceSummary'
import RaceEditProfile from './components/regrace/RaceEditProfile'
// import RacePayment from './component/runex/race/RacePayment'
// import RaceDashboard from './component/runex/race/RaceDashboard'
// import DashboardOwner from './component/eventer/DashboardOwner'
// import RaceHistory from './component/eventer/RaceHistory'
// import ListName from './component/event/ListName'
// import Carousel from './component/Carousel'

// const override = css`
//     display: block;
//     border-color: red;
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
// `;

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
    //const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            //console.log(location.pathname)
            ReactGA.pageview(location.pathname)
        });
    
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.alert) {
      
  //     if(nextProps.alert.message !== undefined && nextProps.alert.message !== null){
  //       this.showAlert(nextProps.alert.message)
  //     }
  //     if(nextProps.alert.isLoading){
  //       this.setState({loading:nextProps.alert.isLoading})
  //     }
      
  //   }
  // }

  showAlert = (msg) => {
    Swal.fire({
      type: 'warning',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    })
  }

  render () {
    const { alert } = this.props;
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" ,zIndex:99};
    if (alert) {
      if(alert.message !== undefined && alert.message !== null){
        this.showAlert(alert.message)
      }
      if(alert.isLoading){
        this.setState({loading:alert.isLoading})
      }
      
    }
    return (
      <Router>
        <div>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <div style={style} hidden={!alert.isLoading}>
            <BounceLoader
              css={override}
              sizeUnit={"px"}
              size={60}
              color={'#FA6400'}
              loading={this.state.loading}
              style = {{flex:1, alignSelf:'center'}}
            />
          </div> */}
          <Header />
          <Route exact path="/raceregister/:slug" component={RaceProfile} />
          <Route path="/racesummary" component={RaceSummary} />
          <Route exact path="/raceedit" component={RaceEditProfile} />
          <Route exact path="/addotherperson" component={AddOtherPerson} />
          <Footer/>
          {/* <Route exact path="/home" component={Home} />
          <Route exact path="/" component={HomePage} /> */}
          {/* <Route exact path="/" component={Home} /> */}
          {/* <PrivateRoute path="" component={} /> */}
          {/* <Route exact path="/preview/:eventID" component={Preview} /> */}
          {/* <Route exact path="/mpreview/:eventID" component={Mpreview} /> */}
          {/* <Route path="/users/confirmation/:confirmation" component={Confirmation} /> */}
          {/* <Route exact path='/event-detail' component={EventDetail} />
          <Route exact path='/allevent' component={AllEvent} />
          <Route exact path='/signin' component={PageLogin} />
          <PrivateRoute exact path='/add-activity/:id' component={Upload} />
          <PrivateRoute exact path="/register/:eventID" component={Register} />
          
          <PrivateRoute exact path="/racesummary" component={RaceSummary} />
          <PrivateRoute exact path="/racedashboard/:regID" component={RaceDashboard} />
          
          <PrivateRoute exact path="/addotherperson" component={AddOtherPerson} />
          <PrivateRoute exact path="/racepayment/:regID" component={RacePayment} />
          <PrivateRoute exact path="/homeowner" component={HomeOwner} />
          <PrivateRoute exact path="/dashboard-owner/:eventID" component={ DashboardOwner } />
          <PrivateRoute exact path="/racehistory-owner/:eventID" component={ RaceHistory } />
          {/* <PrivateRoute exact path="/addotherperson/:eventID" component={AddOtherPerson} />
          <PrivateRoute exact path="/termconditions/:eventID" component={TermConditions} /> 
          <PrivateRoute path="/create-event" component={AddEvent} />
          <PrivateRoute path="/edit-event/:eventID" component={EditEvent} />
          <PrivateRoute path="/users/edit" component={editUser} />
          <Route path="/users/reset-password" component={ResetPassword} />
          <Route path="/new-password/:token" component={ResetPassword} />
          <Route exact path="/landing" component={Landing} />
          <PrivateRoute exact path="/my-event" component={MyEvent} />
          <PrivateRoute exact path="/dashboard/:regID" component={Dashboard} />
          <PrivateRoute exact path="/payment-success" component={PaymentSucc} />
          <PrivateRoute exact path="/payment-return/:regID" component={PaymentReturn} />
          <Route exact path="/login" component={PageLogin} />
          <Route exact path="/signup" component={PageRegister} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/payment-inform" component={PaymentInform} />
          <Route exact path="/virtaul-run" component={VirtaulRun} />
          <Route exact path="/tracking-realtime" component={TrackingRealtime} />
          <Route exact path="/tracking-product" component={TrackProduct} />
          <Route trackKey=":trackKey" path="/tracking-product/:trackKey" component={TrackDetail} />
          <Route exact path="/runnnig-the-data-analysis" component={RunnnigTheDataAnalysis} />
          <Route exact path="/refund_policy" component={RefundPolicy} />
          <Route exact path="/terms_and_conditions" component={TermsAndCondition} />
          <Route exact path="/list-name" component={ListName} /> */}
          {/* <Route exact path='/event-detail' component={EventDetail} /> */}
          {/* <Route path="/login" component={LoginPage} />
             */}
           </Suspense> 
        </div>
        {/* <BackToTop
          showOnScrollUp
          showAt={100}
          speed={1500}
          easing="easeInOutQuint"
          className="rounded-circle">
          <span>
            <img
              width={25}
              height={25}
              src={iconbacktotop}
              alt="runex"
            />
          </span>
        </BackToTop> */}
       
      </Router>
      // </div>
    )
  }
}

function mapState (state) {
  const { alert } = state
  return { alert }
}

const actionCreators = {
  clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState, actionCreators)(App)
export { connectedApp as App }

// import logo from './logo.svg';
// import './App.css';

// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { history } from './store';

// const RaceRegister = lazy(() => import('./components/RaceRegister'));
// const RaceSummary = lazy(() => import('./components/visual/RaceSummary'));
// // import RaceSummary from './component/runex/race/RaceSummary'


// function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Switch>
//           <div>
//             <Route exact path="/raceregister/:slug" component={RaceRegister} />
//             <Route path="/racesummary" component={RaceSummary} />
//             {/* <Route path="/about" component={About} /> */}
//           </div>
//         </Switch>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;
