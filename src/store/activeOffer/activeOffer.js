import {adaptOffer, adaptOffers} from "../../adapters/offers";
import {adaptReviews} from "../../adapters/reviews";
import {LoadingStatus} from "../../const";
import {ActionType} from "./actions";

const initialState = {
  favorites: [],
  nearbyOffers: [],
  offerStatus: LoadingStatus.PENDING,
  offer: null,
  reviews: [],
  commentStatus: LoadingStatus.PENDING,
};

const activeOffer = (state = initialState, action) => {
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
    case ActionType.SET_OFFER_LOADING_STATUS:
      return {
        ...state,
        offerStatus: action.payload
      };
  }
  return state;
};

export {activeOffer};

