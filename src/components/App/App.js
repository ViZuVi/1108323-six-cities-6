import React from 'react';
import Main from '../Main/Main';
import {offers} from '../../mocks/offers';

const App = () => {
  return (
    <Main offers={offers} />
  );
};

export default App;
