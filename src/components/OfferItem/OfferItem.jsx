import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {countStars} from '../../common';
import {AppRoute, AuthorizationStatus} from '../../const';
import {addToFavorite} from '../../api-actions';

const OfferItem = ({offer, offerType, onCardMouseover, authorizationStatus, onBookmarkClick}) => {
  const offerClass = {
    MAIN: {
      article: `cities__place-card`,
      img: {
        wrapper: `cities__image-wrapper`,
        width: 260,
        height: 200,
      },
      info: ``
    },
    FAVORITES: {
      article: `favorites__card`,
      img: {
        wrapper: `favorites__image-wrapper`,
        width: 150,
        height: 110,
      },
      info: `favorites__card-info `
    },
    PROPERTY: {
      article: `near-places__card`,
      img: {
        wrapper: `near-places__image-wrapper`,
        width: 260,
        height: 200,
      },
      info: ``
    }
  };
  const selectedOfferType = offerClass[offerType];
  const history = useHistory();

  return (
    <article className={`${selectedOfferType.article} place-card`} onMouseOver={() => onCardMouseover(offer)} onMouseOut={() => onCardMouseover(null)}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${selectedOfferType.img.wrapper} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={selectedOfferType.img.width} height={selectedOfferType.img.height} alt="Place image" />
        </a>
      </div>
      <div className={`${selectedOfferType.info}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite && `place-card__bookmark-button--active`}`}
            type="button"
            onClick={() => {
              return authorizationStatus === AuthorizationStatus.AUTH
                ? onBookmarkClick(offer.id, Number(!offer.isFavorite))
                : history.push(AppRoute.LOGIN);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${countStars(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  onCardMouseover: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  offerType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onBookmarkClick(id, status) {
    dispatch(addToFavorite(id, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferItem);
