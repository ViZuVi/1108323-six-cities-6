import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {countStars} from '../../common';
import Header from '../Header/Header';
import Reviews from '../Reviews/Reviews';
import Map from '../Map/Map';
import OffersList from '../OffersList/OffersList';
import {AppRoute, AuthorizationStatus, LoadingStatus} from '../../const';
import NotFound from '../NotFound/NotFound';
import {addToFavorite, fetchNearbyOffers, fetchOffer, fetchReviews} from '../../api-actions';
import Spinner from '../Spinner/Spinner';
import {getNearbyOffers, getOffer, getOfferStatus} from '../../store/activeOffer/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

const Property = ({offer, nearbyOffers, offerStatus, onComponentMount, onBookmarkClick, authorizationStatus}) => {
  const MAX_NEARBY_OFFERS = 3;
  const nearbyOffersSliced = nearbyOffers.slice(0, MAX_NEARBY_OFFERS);
  const {id} = useParams();
  const history = useHistory();
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
                  <button
                    className={`property__bookmark-button button ${offer.isFavorite && `property__bookmark-button--active`}`}
                    type="button"
                    onClick={() => {
                      return authorizationStatus === AuthorizationStatus.AUTH
                        ? onBookmarkClick(id, Number(!offer.isFavorite))
                        : history.push(AppRoute.LOGIN);
                    }}
                  >
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
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
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
                <Reviews />
              </div>
            </div>
            <section className="property__map map">
              {nearbyOffers.length > 0 ? <Map offers={nearbyOffersSliced} /> : ``}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList offers={nearbyOffersSliced} onCardMouseover={() => {}} offerType={`PROPERTY`} />
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
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  nearbyOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  offerStatus: PropTypes.string.isRequired,
  onComponentMount: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    })
  })),
  authorizationStatus: PropTypes.string.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: getOffer(state),
  nearbyOffers: getNearbyOffers(state),
  offerStatus: getOfferStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMount(id) {
    dispatch(fetchOffer(id));
    dispatch(fetchReviews(id));
    dispatch(fetchNearbyOffers(id));
  },
  onBookmarkClick(id, status) {
    dispatch(addToFavorite(id, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
