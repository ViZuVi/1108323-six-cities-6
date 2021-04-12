import {ActionCreator} from "./action";
import {AuthorizationStatus, LoadingStatus} from "./const";

export const fetchOffers = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setLoadingStatus(LoadingStatus.LOADING));
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
    .then(() => dispatch(ActionCreator.setLoadingStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(ActionCreator.setLoadingStatus(LoadingStatus.ERROR)));
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(ActionCreator.getUserInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(ActionCreator.getUserInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    // .then(() => dispatch(ActionCreator.fetchFavorites()))
);
