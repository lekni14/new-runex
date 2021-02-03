import React, { Suspense } from 'react'
// import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Swal from 'sweetalert2'
import ReactGA from 'react-ga'
import Callback from './components/Callback'
import RaceProfile from './components/RaceRegister'
import AddOtherPerson from './components/regrace/AddOtherPerson'
import RaceSummary from './components/regrace/RaceSummary'
import RacePayment from './components/regrace/RacePayment'
import RaceEditProfile from './components/regrace/RaceEditProfile'
import { RecoilRoot } from 'recoil'
import { history } from './store'
import PrivateRoute from './router/PrvateRoute'
import MyEventPage from './components/event/MyEventPage'

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

  showAlert = (msg) => {
    Swal.fire({
      type: 'warning',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    })
  }

  render() {
    const { alert } = this.props;
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" ,zIndex:99};
    if (alert) {
      if (alert.message !== undefined && alert.message !== null) {
        this.showAlert(alert.message)
      }
      if (alert.isLoading) {
        this.setState({ loading: alert.isLoading })
      }

    }
    return (
      <RecoilRoot>
        <Router history={history}>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <div id="content-wrap">
              <Route exact path="/callback" component={Callback} />
              <PrivateRoute exact path="/" component={MyEventPage} />
              <PrivateRoute exact path="/register/:code" component={RaceProfile} />
              <PrivateRoute path="/regsummary" component={RaceSummary} />
              <PrivateRoute exact path="/raceedit" component={RaceEditProfile} />
              <PrivateRoute exact path="/addother" component={AddOtherPerson} />
              <PrivateRoute exact path="/payment" component={RacePayment} />
            </div>
            <Footer />
          </Suspense>

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
      </RecoilRoot>
    )
  }
}

export default App
