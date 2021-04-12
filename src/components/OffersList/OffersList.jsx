import React from 'react';
import PropTypes from 'prop-types';
import OfferItem from '../OfferItem/OfferItem';

const OffersList = ({offers, onCardMouseover}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferItem
          offer={offer}
          key={offer.id + offer.title}
          onCardMouseover={onCardMouseover}
        />)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardMouseover: PropTypes.func.isRequired,
};

export default OffersList;
