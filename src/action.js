export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  GET_OFFERS: `/getOffers`,
  CHANGE_SORTING: `/changeSorting`
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
  })
};
