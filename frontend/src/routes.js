import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

const isLogged = () => {
  return localStorage.getItem('ongId');
}

const requireAuth = (Component) => {
  return isLogged() !== null ? (<Component />) : (<Redirect to="/" />)
}

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon} />
        <Route path="/register" component={Register} />
        
        <Route path="/profile" render={() => requireAuth(Profile)} />
        <Route path="/incidents/new" render={() => requireAuth(NewIncident)} />
      </Switch>
    </BrowserRouter>
  );
};