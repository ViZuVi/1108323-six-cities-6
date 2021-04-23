import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Router} from 'react-router-dom';
import App from './components/App/App.jsx';
import browserHistory from './browser-history';
import rootReducer from './store/root-reducer';
import {createAPI} from './api';
import {AuthorizationStatus} from './const';
import {fetchOffers, checkAuth} from './api-actions';
import {requireAuthorization} from './store/user/actions.js';

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
