export const ActionType = {
  SET_OFFER_LOADING_STATUS: `/setOfferLoadingStatus`,
  GET_OFFER: `/getOffer`,
  GET_REVIEWS: `/getReviews`,
  GET_NEARBY_OFFERS: `/getNearbyOffers`,
  SET_COMMENT_STATUS: `/setCommentStatus`,
  GET_BOOKMARKS: `/getBookmarks`,
};

export const getOffer = (offer) => ({
  type: ActionType.GET_OFFER,
  payload: offer,
});

export const setOfferLoadingStatus = (status) => ({
  type: ActionType.SET_OFFER_LOADING_STATUS,
  payload: status,
});

export const getReviews = (reviews) => ({
  type: ActionType.GET_REVIEWS,
  payload: reviews,
});

export const getNearbyOffers = (offers) => ({
  type: ActionType.GET_NEARBY_OFFERS,
  payload: offers,
});

export const setCommentStatus = (status) => ({
  type: ActionType.SET_COMMENT_STATUS,
  payload: status,
});

export const getBookmarks = (offers) => ({
  type: ActionType.GET_BOOKMARKS,
  payload: offers,
});
