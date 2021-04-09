import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../action';

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
  cities: state.cities,
  activeCity: state.activeCity,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
