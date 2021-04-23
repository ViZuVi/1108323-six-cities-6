import {combineReducers} from 'redux';
import {activeOffer} from './activeOffer/activeOffer';
import {offersData} from './offersData/offersData';
import {user} from './user/user';

export const NameSpace = {
  ACTIVE_OFFER: `ACTIVE_OFFER`,
  OFFERS_DATA: `OFFERS_DATA`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.OFFERS_DATA]: offersData,
  [NameSpace.ACTIVE_OFFER]: activeOffer,
  [NameSpace.USER]: user,
});
