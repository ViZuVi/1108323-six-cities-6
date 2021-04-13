import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {countStars} from '../../common';
import Header from '../Header/Header';
// import Map from '../Map/Map';
// import OffersList from '../OffersList/OffersList';
import {LoadingStatus} from '../../const';
import NotFound from '../NotFound/NotFound';
import {fetchOffer} from '../../api-actions';
import Spinner from '../Spinner/Spinner';

const Property = ({offer, offers, offerStatus, onComponentMount}) => {
  const MAX_NEARBY_OFFERS = 3;
  const nearbyOffersSliced = offers.slice(0, MAX_NEARBY_OFFERS);
  const {id} = useParams();
  // const history = useHistory();
  if (offerStatus === LoadingStatus.ERROR) {
    return <NotFound />;
  }

  useEffect(() => {
    onComponentMount(id);
  }, [id]);

  return (
    offerStatus === LoadingStatus.LOADED ?
      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.map((img, i) => (
                  <div className="property__image-wrapper" key={i + img}>
                    <img className="property__image" src={img} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${countStars(offer.rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {`${offer.bedrooms} Bedrooms`}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {`Max ${offer.maxAdults} adults`}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((good, i) => (
                      <li className="property__inside-item" key={i + good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>
                    }

                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                {/* <Reviews reviews={reviews} /> */}
              </div>
            </div>
            <section className="property__map map">
              {/* <Map offers={nearbyOffersSliced} /> */}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {/* <OffersList offers={nearbyOffersSliced} /> */}
              </div>
            </section>
          </div>
        </main>
      </div>
      : <Spinner />
  );
};

Property.propTypes = {
  offer: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPremium: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }),
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  offerStatus: PropTypes.string.isRequired,
  onComponentMount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  offers: state.nearbyOffers,
  offerStatus: state.offerStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMount(id) {
    dispatch(fetchOffer(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
