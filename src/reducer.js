import {ActionType} from './action';
import {AuthorizationStatus, LoadingStatus, SortingValues} from './const';
import {adaptOffer, adaptOffers} from './adapters/offers';
import {adaptAuthInfo} from './adapters/authInfo';
import {adaptReviews} from './adapters/reviews';

const sortOffers = (offersToSort, selectedSortType) => {
  const initOffers = offersToSort.slice();
  switch (selectedSortType) {
    case SortingValues.POPULAR:
      return initOffers;
    case SortingValues.TOP_RATED:
      return offersToSort.sort((a, b) => b.rating - a.rating);
    case SortingValues.LOW_TO_HIGH_PRICE:
      return offersToSort.sort((a, b) => a.price - b.price);
    case SortingValues.HIGH_TO_LOW_PRICE:
      return offersToSort.sort((a, b) => b.price - a.price);
  }
  return initOffers;
};

const initialState = {
  offers: [],
  offersStatus: LoadingStatus.PENDING,
  cities: [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`],
  activeCity: `Paris`,
  filteredOffers: [],
  activeSortType: SortingValues.POPULAR,
  sortedOffers: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  favorites: [],
  userInfo: {},
  nearbyOffers: [],
  offerStatus: LoadingStatus.PENDING,
  offer: null,
  reviews: [],
  commentStatus: LoadingStatus.PENDING,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_BOOKMARKS:
      return {
        ...state,
        favorites: adaptOffers(action.payload),
      };
    case ActionType.SET_COMMENT_STATUS:
      return {
        ...state,
        commentStatus: action.payload,
      };
    case ActionType.GET_NEARBY_OFFERS:
      return {
        ...state,
        nearbyOffers: adaptOffers(action.payload)
      };
    case ActionType.GET_REVIEWS:
      return {
        ...state,
        reviews: adaptReviews(action.payload)
      };
    case ActionType.GET_OFFER:
      return {
        ...state,
        offer: adaptOffer(action.payload)
      };
    case ActionType.GET_USER_INFO:
      return {
        ...state,
        userInfo: adaptAuthInfo(action.payload)
      };
    case ActionType.LOAD_OFFERS:
      const offers = adaptOffers(action.payload);
      return {
        ...state,
        offers,
        filteredOffers: offers.slice().filter((offer) => (offer.city.name === state.activeCity)),
        sortedOffers: offers.slice().filter((offer) => (offer.city.name === state.activeCity)),
      };
    case ActionType.SET_OFFERS_LOADING_STATUS:
      return {
        ...state,
        offersStatus: action.payload
      };
    case ActionType.SET_OFFER_LOADING_STATUS:
      return {
        ...state,
        offerStatus: action.payload
      };
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.CHANGE_CITY:
      const filteredByCityOffers = state.offers.slice().filter((offer) => (offer.city.name === action.payload));
      return {
        ...state,
        activeCity: action.payload,
        filteredOffers: filteredByCityOffers,
        sortedOffers: filteredByCityOffers,
      };
    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.CHANGE_SORTING:
      const sortedOffers = state.filteredOffers.slice();
      return {
        ...state,
        activeSortType: action.payload,
        sortedOffers: sortOffers(sortedOffers, action.payload)
      };
  }
  return state;
};

export {reducer};

