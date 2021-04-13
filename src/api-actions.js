import {ActionCreator} from "./action";
import {AuthorizationStatus, LoadingStatus} from "./const";

export const fetchOffers = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setOffersLoadingStatus(LoadingStatus.LOADING));
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
    .then(() => dispatch(ActionCreator.setOffersLoadingStatus(LoadingStatus.LOADED)))
    .then(() => dispatch(fetchBookmarks()))
    .catch(() => dispatch(ActionCreator.setOffersLoadingStatus(LoadingStatus.ERROR)));
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setOfferLoadingStatus(LoadingStatus.LOADING));
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(ActionCreator.getOffer(data)))
    .then(() => dispatch(ActionCreator.setOfferLoadingStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(ActionCreator.setOfferLoadingStatus(LoadingStatus.ERROR)));
};

export const fetchReviews = (id) => (dispatch, _getState, api) => {
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(ActionCreator.getReviews(data)));
};

export const fetchNearbyOffers = (id) => (dispatch, _getState, api) => {
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(ActionCreator.getNearbyOffers(data)));
};

export const postComment = ({id, rating, comment}) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setCommentStatus(LoadingStatus.LOADING));
  return api.post(`/comments/${id}`, {rating, comment})
    .then(({data}) => dispatch(ActionCreator.getReviews(data)))
    .then(() => dispatch(ActionCreator.setCommentStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(ActionCreator.setCommentStatus(LoadingStatus.ERROR)));
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
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(ActionCreator.getUserInfo({})))
);

export const addToFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`, {id, status})
    .then(() => dispatch(fetchBookmarks()))
    .then(() => dispatch(fetchOffers()))
    .then(() => dispatch(fetchOffer(id)))
    .then(() => dispatch(fetchNearbyOffers(id)))
);

export const fetchBookmarks = () => (dispatch, _getState, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(ActionCreator.getBookmarks(data)))
);

