import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeCity} from '../../store/offersData/actions';
import {getActiveCity, getCities} from '../../store/offersData/selectors';

const CitiesList = ({cities, activeCity, onCityClick}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={activeCity === city ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  activeCity: getActiveCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(changeCity(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
