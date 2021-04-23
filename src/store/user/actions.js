export const ActionType = {
  REQUIRE_AUTHORIZATION: `/requireAuthorization`,
  GET_USER_INFO: `getUserInfo`,
};

export const getUserInfo = (userInfo) => ({
  type: ActionType.GET_USER_INFO,
  payload: userInfo,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRE_AUTHORIZATION,
  payload: status,
});
