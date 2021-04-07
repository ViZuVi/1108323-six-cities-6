import {MAX_STARS} from "./const";

export const countStars = (rating) => (Math.round(rating) * 100 / MAX_STARS);

export const getCitiesSet = (offers) => {
  const allCities = offers.map(({city}) => city.name);
  return [...new Set(allCities)];
};
