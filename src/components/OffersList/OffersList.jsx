import React, {useState} from 'react';
import PropTypes from 'prop-types';
import OfferItem from '../OfferItem/OfferItem';

const OffersList = ({offers}) => {
  const [hoveredOffer, setHoveredOffer] = useState(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferItem
          offer={offer}
          key={offer.id + offer.title}
          onCardMouseover={(targetOffer) => setHoveredOffer(targetOffer)}
        />)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OffersList;
