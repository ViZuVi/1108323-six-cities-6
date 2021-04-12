export const MAX_STARS = 5;

export const AppRoute = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  PROPERTY: `/offer/:id`,
};

export const SortingValues = {
  POPULAR: `Popular`,
  LOW_TO_HIGH_PRICE: `Price: low to high`,
  HIGH_TO_LOW_PRICE: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const CITIES = {
  Amsterdam: [52.3833, 4.9044],
  Paris: [48.8589, 2.3469],
  Cologne: [50.9293, 6.9595],
  Brussels: [50.8552, 4.3453],
  Hamburg: [53.5503, 10.0006],
  Dusseldorf: [51.2287, 6.7743]
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const LoadingStatus = {
  PENDING: `PENDING`,
  LOADING: `LOADING`,
  LOADED: `LOADED`,
  ERROR: `ERROR`,
};
