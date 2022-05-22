import ReviewItem from 'components/main/OtherReviews/ReviewItem';

export default function OtherReviews(props) {
  const { reviews, hashtags } = props;

  return (
    <div>
      <h2>Đánh giá khác</h2>

      {reviews.length === 0 ? (
        <div>Không có đánh giá nào</div>
      ) : (
        <div className="flex flex-col gap-5">
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} hashtags={hashtags} />
          ))}
        </div>
      )}
    </div>
  );
}
