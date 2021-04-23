import {adaptAuthInfo} from "../../adapters/authInfo";
import {AuthorizationStatus} from "../../const";
import {ActionType} from "./actions";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
};
const user = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_USER_INFO:
      return {
        ...state,
        userInfo: adaptAuthInfo(action.payload)
      };
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

  }
  return state;
};

export {user};
