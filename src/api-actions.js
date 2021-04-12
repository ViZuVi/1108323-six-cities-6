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
    // .then(({data}) => dispatch(getUserInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);
