import React from 'react';
import PropTypes from 'prop-types';
import Favorites from '../Favorites/Favorites';
import FavoritesEmty from '../FavoritesEmpty/FavoritesEmty';

const FavoritesContainer = ({favorites}) => {
  return (
    favorites.length
      ? <Favorites favorites={favorites} />
      : <FavoritesEmty />
  );
};

FavoritesContainer.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FavoritesContainer;
