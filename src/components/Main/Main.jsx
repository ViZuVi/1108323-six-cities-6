import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OffersList from '../OffersList/OffersList';
import Map from '../Map/Map';
import CitiesList from '../CititesList/CitiesList';
import Header from '../Header/Header';
import SortTypes from '../SortTypes/SortTypes';
import {LoadingStatus} from '../../const';
import Spinner from '../Spinner/Spinner';
import MainEmpty from '../MainEmpty/MainEmpty';

const Main = ({offers, activeCity, offersStatus}) => {
  const [hoveredOffer, setHoveredOffer] = useState(null);
  return (
    !offers.length ? <MainEmpty /> :
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>
          <div className="cities">
            {offersStatus === LoadingStatus.LOADED ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                  <SortTypes />
                  {offersStatus === LoadingStatus.LOADED ? <OffersList offers={offers} onCardMouseover={setHoveredOffer} offerType={`MAIN`} /> : <Spinner />}
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    {offersStatus === LoadingStatus.LOADED ? <Map offers={offers} hoveredOffer={hoveredOffer}/> : <Spinner />}
                  </section>
                </div>
              </div> : <Spinner />}
          </div>
        </main>
      </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCity: PropTypes.string.isRequired,
  offersStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.sortedOffers,
  activeCity: state.activeCity,
  offersStatus: state.offersStatus,
});

export default connect(mapStateToProps, null)(Main);
