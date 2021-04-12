import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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

const mapStateToProps = (state) => ({
  favorites: state.favorites
});

export default connect(mapStateToProps, null)(FavoritesContainer);
