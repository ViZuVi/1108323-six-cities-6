import React from 'react';
import PropTypes from 'prop-types';
import Review from '../Review/Review';
import CommentForm from '../CommentForm/CommentForm';

const Reviews = ({reviews}) => {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review review={review} key={review.id} />)}
      </ul>
      <CommentForm />
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Reviews;
