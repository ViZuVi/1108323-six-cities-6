import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postComment} from '../../api-actions';
import {LoadingStatus} from '../../const';

const CommentForm = ({onSubmit, offer, commentStatus}) => {
  const [stars, setStars] = useState(0);
  const [commentText, setCommentText] = useState(``);
  const [disabledButton, setDisabledButton] = useState(true);
  const STARS = [5, 4, 3, 2, 1];
  const MAX_COMMENT_LENGTH = 300;
  const MIN_COMMENT_LENGTH = 50;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      id: offer.id,
      rating: stars,
      comment: commentText,
    });
  };

  useEffect(() => {
    if (commentStatus === LoadingStatus.LOADED) {
      setStars(0);
      setCommentText(``);
    }
  }, [commentStatus]);

  useEffect(() => {
    if (commentText.length >= MIN_COMMENT_LENGTH && commentText.length < MAX_COMMENT_LENGTH && stars > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [commentText, stars]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STARS.map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              onChange={(evt) => setStars(+evt.target.value)}
              disabled={commentStatus === LoadingStatus.LOADING}
              checked={stars === star}
            />
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        onChange={(evt) => setCommentText(evt.target.value)}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={commentStatus === LoadingStatus.LOADING}
        value={commentText}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={commentStatus === LoadingStatus.LOADING ? true : disabledButton}>Submit</button>
      </div>
      {commentStatus === LoadingStatus.ERROR && <div style={{color: `red`}}>Error. Please try again</div>}
    </form>
  );
};

CommentForm.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  commentStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  commentStatus: state.commentStatus,
  offer: state.offer,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData) {
    dispatch(postComment(commentData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
