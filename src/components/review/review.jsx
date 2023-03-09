import avatarReview from '../../assets/images/avatar-review.jpg';

import './review.css';

export const Review = ({ review }) => (
    <div className='review'>
        <div className='review__user'>
            {review.user.avatarUrl === null ? (
                <img src={avatarReview} alt='avatar-review' />
            ) : (
                <img src={review.user.avatarUrl} alt='avatar-review' />
            )}
            <p>
                {review.user.firstName} {review.user.lastName}
            </p>
            <p>
                {new Date(review.createdAt).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
        </div>
        <div className='review__user-mobile'>
            {review.user.avatarUrl === null ? (
                <img src={avatarReview} alt='avatar-review' />
            ) : (
                <img src={review.user.avatarUrl} alt='avatar-review' />
            )}
            <div className='review__user-mobile-wrapper'>
                <p>
                    {review.user.firstName} {review.user.lastName}
                </p>
                <p className='review__user-mobile-date'>
                    {new Date(review.createdAt).toLocaleString('ru', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
        <p>{review.text ? review.text : ''}</p>
    </div>
);
