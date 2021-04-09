import {ActionType} from './action';
import {getCitiesSet} from './common';
import {offers} from './mocks/offers';

const citiesSet = getCitiesSet(offers);
const activeCity = citiesSet[0];

const initialState = {
  offers,
  cities: citiesSet,
  activeCity,
  filteredOffers: offers.filter((offer) => (offer.city.name === activeCity)),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload,
        filteredOffers: state.offers.filter((offer) => (offer.city.name === action.payload)),
      };
    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
  }
  return state;
};

export {reducer};

