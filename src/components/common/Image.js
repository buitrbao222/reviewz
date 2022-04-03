import { Skeleton } from 'antd';
import clsx from 'clsx';
import fallbackImg from 'images/fallback.png';
import { useEffect, useMemo, useState } from 'react';
import getImage from 'utils/getImage';

export default function Image(props) {
  const { src, id, className, imgClassName, loadedImgClassName, ...rest } =
    props;

  const [error, setError] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const imgSrc = useMemo(() => src || getImage(id), [src, id]);

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src, id]);

  function handleError() {
    setError(true);
  }

  function handleLoad() {
    setLoaded(true);
  }

  return (
    <div className={clsx('relative', className)}>
      <img
        src={error ? fallbackImg : imgSrc}
        onError={handleError}
        onLoad={handleLoad}
        alt=""
        className={clsx(
          'w-full h-full object-cover',
          !loaded && 'invisible',
          error && 'invert',
          loaded && loadedImgClassName,
          imgClassName
        )}
        {...rest}
      />

      {!loaded && <Skeleton.Input active className="image-skeleton" />}
    </div>
  );
}
