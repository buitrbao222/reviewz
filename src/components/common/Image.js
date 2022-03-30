import { useState } from 'react';
import fallbackImg from 'images/fallback.png';

export default function Image(props) {
  const { src, id, ...rest } = props;

  const [imageUrl, setImageUrl] = useState(
    src || `${process.env.REACT_APP_BACKEND}/image/${id}`
  );

  function handleError() {
    setImageUrl(fallbackImg);
  }

  return <img src={imageUrl} onError={handleError} alt="" {...rest} />;
}
