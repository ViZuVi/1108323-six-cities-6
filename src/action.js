export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  GET_OFFERS: `/getOffers`,
  CHANGE_SORTING: `/changeSorting`,
  REQUIRE_AUTHORIZATION: `/requireAuthorization`,
  LOAD_OFFERS: `/loadOffers`,
  SET_OFFERS_LOADING_STATUS: `/setOffersLoadingStatus`,
  SET_OFFER_LOADING_STATUS: `/setOfferLoadingStatus`,
  GET_USER_INFO: `/getUserInfo`,
  GET_OFFER: `/getOffer`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  changeSorting: (sortType) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sortType,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  setOffersLoadingStatus: (status) => ({
    type: ActionType.SET_OFFERS_LOADING_STATUS,
    payload: status,
  }),
  setOfferLoadingStatus: (status) => ({
    type: ActionType.SET_OFFER_LOADING_STATUS,
    payload: status,
  }),
  getUserInfo: (userInfo) => ({
    type: ActionType.GET_USER_INFO,
    payload: userInfo,
  }),
  getOffer: (offer) => ({
    type: ActionType.GET_OFFER,
    payload: offer,
  })
};
