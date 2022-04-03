import { Skeleton } from 'antd';
import clsx from 'clsx';
import fallbackImg from 'images/fallback.png';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getImage from 'utils/getImage';

export default function MovieCard(props) {
  const { movie } = props;

  const { id, img, nameEn, releaseDate, starAvg } = movie;

  const [imgError, setImgError] = useState(false);

  const [imgLoaded, setImgLoaded] = useState(false);

  const src = useMemo(() => getImage(img), [img]);

  const releaseYear = useMemo(
    () => moment.utc(releaseDate).get('year'),
    [releaseDate]
  );

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [img]);

  function handleError() {
    setImgError(true);
  }

  function handleLoad() {
    setImgLoaded(true);
  }

  return (
    <Link
      to={`/movie/${id}`}
      className="relative block w-64 overflow-hidden text-white rounded-lg movie-card"
    >
      {!imgLoaded && (
        <div className="absolute inset-0">
          <Skeleton.Input active className="image-skeleton" />
        </div>
      )}

      <div
        className={clsx(
          'transition-opacity duration-300 ease-in-out bg-dark',
          !imgLoaded && 'opacity-0'
        )}
      >
        <div className="movie-card-gradient" />

        <img
          src={imgError ? fallbackImg : src}
          onError={handleError}
          onLoad={handleLoad}
          alt=""
          className={clsx(
            'relative w-full aspect-[3/4] object-cover',
            imgError && 'invert'
          )}
        />

        <div className="flex flex-col gap-2 p-2.5">
          <div
            className="h-10 text-base font-medium leading-5 line-clamp-2"
            title={nameEn}
          >
            {nameEn}
          </div>

          <div className="flex items-center gap-3 text-xs leading-none opacity-70">
            <div>{releaseYear}</div>

            <div className="dot" />

            {starAvg ? (
              <div className="flex items-center whitespace-pre">
                <FaStar /> {' ' + starAvg}
              </div>
            ) : (
              <div>Chưa có đánh giá</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
