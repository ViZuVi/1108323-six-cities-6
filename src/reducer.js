import {ActionType} from './action';
import {getCitiesSet} from './common';
import {SortingValues} from './const';
import {offers} from './mocks/offers';

const citiesSet = getCitiesSet(offers);
const activeCity = citiesSet[0];
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
  offers,
  cities: citiesSet,
  activeCity,
  filteredOffers: offers.filter((offer) => (offer.city.name === activeCity)),
  activeSortType: SortingValues.POPULAR,
  sortedOffers: offers.filter((offer) => (offer.city.name === activeCity)),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      const filteredByCityOffers = initialState.offers.filter((offer) => (offer.city.name === action.payload));
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

