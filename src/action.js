export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  GET_OFFERS: `/getOffers`,
  CHANGE_SORTING: `/changeSorting`,
  REQUIRE_AUTHORIZATION: `/requireAuthorization`,
  LOAD_OFFERS: `/loadOffers`,
  SET_LOADING_STATUS: `/setLoadingStatus`
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
  setLoadingStatus: (status) => ({
    type: ActionType.SET_LOADING_STATUS,
    payload: status,
  })
};
