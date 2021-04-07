import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from '../Main/Main';
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer';
import SignIn from '../SignIn/SignIn';
import Property from '../Property/Property';
import NotFound from '../NotFound/NotFound';
import {offers} from '../../mocks/offers';
import {AppRoute} from '../../const';

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}><Main offers={offers} /></Route>
      <Route exact path={AppRoute.FAVORITES}><FavoritesContainer favorites={offers}/></Route>
      <Route exact path={AppRoute.LOGIN}><SignIn /></Route>
      <Route exact path={AppRoute.PROPERTY} render={(props) => {
        const activeOffer = offers.find((el) => {
          return el.id === parseInt(props.match.params.id, 10);
        });
        return (
          <Property
            {...props}
            offers={offers}
            offer={activeOffer}
          />
        );
      }} />
      <Route><NotFound /></Route>
    </Switch>
  );
};

export default App;
