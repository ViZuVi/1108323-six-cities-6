export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  GET_OFFERS: `/getOffers`,
  CHANGE_SORTING: `/changeSorting`,
  LOAD_OFFERS: `/loadOffers`,
  SET_OFFERS_LOADING_STATUS: `/setOffersLoadingStatus`,
};

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export const getOffers = (offers) => ({
  type: ActionType.GET_OFFERS,
  payload: offers,
});

export const changeSorting = (sortType) => ({
  type: ActionType.CHANGE_SORTING,
  payload: sortType,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

export const setOffersLoadingStatus = (status) => ({
  type: ActionType.SET_OFFERS_LOADING_STATUS,
  payload: status,
});
