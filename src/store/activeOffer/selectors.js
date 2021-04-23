import {NameSpace} from '../root-reducer';

export const getFavorites = (state) => state[NameSpace.ACTIVE_OFFER].favorites;
export const getNearbyOffers = (state) => state[NameSpace.ACTIVE_OFFER].nearbyOffers;
export const getOfferStatus = (state) => state[NameSpace.ACTIVE_OFFER].offerStatus;
export const getOffer = (state) => state[NameSpace.ACTIVE_OFFER].offer;
export const getReviews = (state) => state[NameSpace.ACTIVE_OFFER].reviews;
export const getCommentStatus = (state) => state[NameSpace.ACTIVE_OFFER].commentStatus;
