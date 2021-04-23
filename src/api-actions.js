import {AuthorizationStatus, LoadingStatus} from "./const";
import {getBookmarks, getNearbyOffers, getOffer, getReviews, setCommentStatus, setOfferLoadingStatus} from "./store/activeOffer/actions";
import {loadOffers, setOffersLoadingStatus} from "./store/offersData/actions";
import {getUserInfo, requireAuthorization} from "./store/user/actions";

export const fetchOffers = () => (dispatch, _getState, api) => {
  dispatch(setOffersLoadingStatus(LoadingStatus.LOADING));
  api.get(`/hotels`)
    .then(({data}) => dispatch(loadOffers(data)))
    .then(() => dispatch(setOffersLoadingStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(setOffersLoadingStatus(LoadingStatus.ERROR)));
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  dispatch(setOfferLoadingStatus(LoadingStatus.LOADING));
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(getOffer(data)))
    .then(() => dispatch(setOfferLoadingStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(setOfferLoadingStatus(LoadingStatus.ERROR)));
};

export const fetchReviews = (id) => (dispatch, _getState, api) => {
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(getReviews(data)));
};

export const fetchNearbyOffers = (id) => (dispatch, _getState, api) => {
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(getNearbyOffers(data)));
};

export const postComment = ({id, rating, comment}) => (dispatch, _getState, api) => {
  dispatch(setCommentStatus(LoadingStatus.LOADING));
  return api.post(`/comments/${id}`, {rating, comment})
    .then(({data}) => dispatch(getReviews(data)))
    .then(() => dispatch(setCommentStatus(LoadingStatus.LOADED)))
    .catch(() => dispatch(setCommentStatus(LoadingStatus.ERROR)));
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(getUserInfo(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(getUserInfo(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(getUserInfo({})))
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
    .then(({data}) => dispatch(getBookmarks(data)))
);

