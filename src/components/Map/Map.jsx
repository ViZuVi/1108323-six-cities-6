import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import {CITIES} from '../../const';

const Map = ({offers, hoveredOffer}) => {
  const map = useRef();
  const city = CITIES[offers[0].city.name];

  const setIcon = (offer) => {
    let icon;
    if (offer === hoveredOffer) {
      icon = leaflet.icon({
        iconUrl: `img/pin-active.svg`,
        iconSize: [30, 30]
      });
    } else {
      icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      });
    }
    return icon;
  };

  useEffect(() => {
    const zoom = offers[0].city.location.zoom;
    map.current = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.current.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    .addTo(map.current);


    offers.forEach((offer) => {
      const icon = setIcon(offer);
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(map.current);
    });

    return () => (
      map.current.remove()
    );
  }, [hoveredOffer, offers]);

  return (
    <div id="map" style={{width: `100%`, height: `100%`}} ref={map} ></div>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  hoveredOffer: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })
};

export default Map;
