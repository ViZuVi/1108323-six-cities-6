import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import App from './components/App/App';
import browserHistory from './browser-history';

ReactDOM.render(
    <Router history={browserHistory}>
      <App />
    </Router>,
    document.querySelector(`#root`)
);
