import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Router} from 'react-router-dom';
import App from './components/App/App';
import browserHistory from './browser-history';
import {reducer} from './reducer';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
