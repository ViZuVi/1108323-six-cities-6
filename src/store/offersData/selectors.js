import {NameSpace} from '../root-reducer';

export const getOffers = (state) => state[NameSpace.OFFERS_DATA].offers;
export const getOffersStatus = (state) => state[NameSpace.OFFERS_DATA].offersStatus;
export const getCities = (state) => state[NameSpace.OFFERS_DATA].cities;
export const getActiveCity = (state) => state[NameSpace.OFFERS_DATA].activeCity;
export const getFilteredOffers = (state) => state[NameSpace.OFFERS_DATA].filteredOffers;
export const getActiveSortType = (state) => state[NameSpace.OFFERS_DATA].activeSortType;
export const getSortedOffers = (state) => state[NameSpace.OFFERS_DATA].sortedOffers;
