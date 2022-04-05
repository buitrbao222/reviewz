import ReviewItem from 'components/main/MovieDetails/ReviewItem';

export default function Reviews(props) {
  const { reviews } = props;

  return (
    <div>
      <h2>Đánh giá</h2>

      <div className="flex flex-col gap-5">
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
