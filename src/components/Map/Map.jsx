import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';

const Map = ({offers}) => {
  const city = [52.38333, 4.9];

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  useEffect(() => {
    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    .addTo(map);

    offers.forEach((offer) => (
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(map)
    ));
  }, []);

  return (
    <div id="map" style={{width: `100%`, height: `100%`}}></div>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
