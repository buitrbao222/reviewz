import MovieSlider from 'components/main/MovieSlider';

export default function Home() {
  return (
    <div className="py-10">
      <MovieSlider label="Mới cập nhật" />

      <MovieSlider
        label="Điểm cao"
        params={{
          highestStar: true,
        }}
        className="mt-12"
      />

      <MovieSlider
        label="Nhiều đánh giá"
        params={{
          mostRated: true,
        }}
        className="mt-12"
      />
    </div>
  );
}
