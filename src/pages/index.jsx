import MovieSlider from 'components/main/MovieSlider';

export default function HomePage() {
  return (
    <div className="py-10">
      <MovieSlider label="Mới cập nhật" />

      <MovieSlider
        label="Điểm cao"
        params={{
          sort: 'highestStar',
        }}
        className="mt-12"
      />

      <MovieSlider
        label="Nhiều đánh giá"
        params={{
          sort: 'mostRated',
        }}
        className="mt-12"
      />
    </div>
  );
}
