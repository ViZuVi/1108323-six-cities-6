import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from '../Main/Main';
import Favorites from '../Favorites/Favorites';
import SignIn from '../SignIn/SignIn';
import Property from '../Property/Property';
import NotFound from '../NotFound/NotFound';
import {offers} from '../../mocks/offers';

const App = () => {
  return (
    <Switch>
      <Route exact path="/"><Main offers={offers} /></Route>
      <Route exact path="/favorites"><Favorites /></Route>
      <Route exact path="/login"><SignIn /></Route>
      <Route exact path="/offer/:id"><Property /></Route>
      <Route><NotFound /></Route>
    </Switch>
  );
};

export default App;
