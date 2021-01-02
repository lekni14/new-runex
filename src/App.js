import logo from './logo.svg';
import './App.css';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './store';

const RaceRegister = lazy(() => import('./components/RaceRegister'));
const RaceSummary = lazy(() => import('./components/visual/RaceSummary'));
// import RaceSummary from './component/runex/race/RaceSummary'


function App() {
  return (
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/raceregister/:slug" component={RaceRegister} />
            <Route exact path="/racesummary" component={RaceSummary} />
            {/* <Route path="/about" component={About} /> */}
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
