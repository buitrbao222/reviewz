import { Skeleton } from 'antd';
import clsx from 'clsx';
import fallbackImg from 'images/fallback.png';
import { useEffect, useState } from 'react';

export default function Image(props) {
  const { src, id, className, imgClassName, ...rest } = props;

  const [error, setError] = useState(false);

  const [loaded, setLoaded] = useState(false);

  function handleError() {
    setError(true);
  }

  function handleLoad() {
    setLoaded(true);
  }

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src, id]);

  if (error) {
    return <img src={fallbackImg} alt="" {...rest} />;
  }

  return (
    <div className={clsx('relative', className)}>
      <img
        src={src || `${process.env.REACT_APP_BACKEND}/image/${id}`}
        onError={handleError}
        onLoad={handleLoad}
        alt=""
        className={clsx(
          'w-full h-full object-cover',
          !loaded && 'invisible',
          imgClassName
        )}
        {...rest}
      />

      <Skeleton.Input active={!loaded} className="image-skeleton" />
    </div>
  );
}
