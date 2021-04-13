import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logout} from '../../api-actions';

const Header = ({userInfo, authorizationStatus, onLogoutClick}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.AUTH
                  ? <>
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{userInfo.email}</span>
                    </Link>
                    <a style={{fontFamily: `inherit`, fontSize: `inherit`, color: `#4481c3`}} href="#" onClick={onLogoutClick}>Log Out</a>
                  </>
                  : <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
                    <span className="header__user-name user__name">Sign In</span>
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick() {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
