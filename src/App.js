import logo from './logo.svg';
import './App.css';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const RaceRegister = lazy(() => import('./components/RaceRegister'));
// const About = lazy(() => import('./routes/About'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/raceregister/:slug" component={RaceRegister} />
          {/* <Route path="/about" component={About} /> */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
