import {ActionType} from './action';
import {offers} from './mocks/offers';

const initialState = {
  offers,
  activeCity: ``,
  filteredOffers: offers,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload,
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

