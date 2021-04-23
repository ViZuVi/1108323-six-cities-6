import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SortingValues} from '../../const';
import {changeSorting} from '../../store/offersData/actions';
import {getActiveSortType} from '../../store/offersData/selectors';

const SortTypes = ({activeSortType, onSortingClick}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isActiveSortType = SortingValues.POPULAR;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={() => setIsVisible(!isVisible)}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isVisible && <ul className="places__options places__options--custom places__options--opened">
        {Object.values(SortingValues).map((item) => (
          <li
            className={isActiveSortType ? `places__option places__option--active` : `places__option`}
            tabIndex="0"
            key={item}
            onClick={() => {
              onSortingClick(item);
              setIsVisible(false);
            }}
          >
            {item}

          </li>
        ))}
      </ul>}
    </form>
  );
};

SortTypes.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onSortingClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeSortType: getActiveSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortingClick(sortType) {
    dispatch(changeSorting(sortType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SortTypes);
