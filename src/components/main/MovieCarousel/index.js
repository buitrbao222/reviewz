import { Skeleton } from 'antd';
import axios from 'axios';
import clsx from 'clsx';
import MovieCard from 'components/main/MovieCard';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import paramsToString from 'utils/paramsToString';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

export default function MovieSlider(props) {
  const { label, params = {}, className } = props;

  const [swiperId] = useState(() => {
    return `id-${uuid()}`;
  });

  const [movies, setMovies] = useState();

  const paramString = useMemo(() => paramsToString(params), [params]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await axios.get('/movie/filter', {
          params: {
            limit: 12,
            ...params,
          },
        });

        console.log('Get movies response', response);

        setMovies(response);
      } catch (error) {
        console.log('Get movies error', error);
      }
    }

    loadMovies();
  }, [params]);

  return (
    <div className={className}>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold leading-none text-dark">
          {label}
        </div>

        <Link
          className="text-base font-semibold leading-none hover:underline-offset-4 hover:underline hover:decoration-2"
          to={`/search/${paramString}`}
        >
          Xem thêm
        </Link>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={24}
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            nextEl: `.next.${swiperId}`,
            prevEl: `.prev.${swiperId}`,
          }}
          className="mt-3"
        >
          {movies &&
            movies.map(movie => (
              <SwiperSlide key={movie.id} className="pt-1 w-fit">
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}

          {!movies &&
            [...Array(7)].map((_, index) => (
              <SwiperSlide key={index} className="pt-1 w-fit">
                <Skeleton.Input active className="movie-card-skeleton" />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="movie-slider-nav-container prev">
          <button className={clsx('movie-slider-nav-button prev', swiperId)}>
            <FaChevronLeft />
          </button>
        </div>

        <div className="movie-slider-nav-container next">
          <button className={clsx('movie-slider-nav-button next', swiperId)}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
