import {MAX_STARS} from "./const";

export const countStars = (rating) => (Math.round(rating) * 100 / MAX_STARS);
