import {MAX_STARS} from "./const";

export const countStars = (rating) => (Math.round(rating) * 100 / MAX_STARS);

export const getCitiesSet = (offers) => {
  const allCities = offers.map(({city}) => city.name);
  return [...new Set(allCities)];
};

export const formatDate = (date) => {
  const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `November`, `Decembler`];
  const commentDate = new Date(date);
  return `${months[commentDate.getMonth()]} ${commentDate.getFullYear()}`;
};
