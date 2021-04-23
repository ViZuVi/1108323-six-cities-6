import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../api-actions';
import Header from '../Header/Header';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/selectors';

const SignIn = ({onSubmit, authorizationStatus}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    history.push(AppRoute.MAIN);
  };

  return (
    authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.MAIN} /> :
      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={emailRef} />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" ref={passwordRef} />
                </div>
                <button className="login__submit form__submit button" type="submit" onClick={handleSubmit}>Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
};

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
