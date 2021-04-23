import {adaptOffers} from "../../adapters/offers";
import {LoadingStatus, SortingValues} from "../../const";
import {ActionType} from "./actions";

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
};

const offersData = (state = initialState, action) => {
  switch (action.type) {
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

export {offersData};
