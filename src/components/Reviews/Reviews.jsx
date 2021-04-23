import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Review from '../Review/Review';
import CommentForm from '../CommentForm/CommentForm';
import {AuthorizationStatus} from '../../const';
import {getReviews} from '../../store/activeOffer/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

const Reviews = ({reviews, authorizationStatus}) => {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.reverse().map((review) => <Review review={review} key={review.id} />)}
      </ul>
      {authorizationStatus === AuthorizationStatus.AUTH && <CommentForm />}
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps, null)(Reviews);
