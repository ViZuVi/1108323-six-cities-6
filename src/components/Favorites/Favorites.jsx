import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FavoriteOffer from '../FavoriteOffer/FavoriteOffer';
import {getCitiesSet} from '../../common';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {fetchBookmarks} from '../../api-actions';

const Favorites = ({favorites, onComponentMount}) => {
  useEffect(() => {
    onComponentMount();
  }, []);
  const favoriteCities = getCitiesSet(favorites);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoriteCities.map((city) => {
                const offersByCity = favorites.filter((offer) => offer.city.name === city);
                return (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offersByCity.map((offer) => <FavoriteOffer offer={offer} key={offer.id} />)}
                    </div>
                  </li>
                );
              })}

            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComponentMount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onComponentMount() {
    dispatch(fetchBookmarks());
  }
});

export default connect(null, mapDispatchToProps)(Favorites);
