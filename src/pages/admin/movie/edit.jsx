import { Form, message } from 'antd';
import axios from 'axios';
import MovieForm from 'components/admin/MovieForm';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getImage from 'utils/getImage';
import notifyError from 'utils/notifyError';

export default function AdminMovieEditPage() {
  const { id } = useParams();

  const [form] = Form.useForm();

  const [movie, setMovie] = useState();

  const [loadingMovie, setLoadingMovie] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovie();
  }, []);

  async function loadMovie() {
    try {
      const movie = await axios.get(`movie/detail/${id}`);

      setMovie(movie);

      form.setFieldsValue({
        name: movie.nameEn,
        releaseDate: moment(movie.releaseDate),
        summary: movie.summary,
        genres: movie.categories,
        actors: movie.actors,
        directors: movie.directors,
        posterPreviewUrl: getImage(movie.img),
      });
    } catch (error) {
      notifyError();
    } finally {
      setLoadingMovie(false);
    }
  }

  async function handleFinish(values) {
    const {
      name,
      summary,
      releaseDate,
      genres,
      actors,
      directors,
      posterFile,
      posterPreviewUrl,
    } = values;

    setLoading(true);

    let posterId = movie.img;

    const initialPosterPreviewUrl = getImage(movie.img);

    // Upload poster if posterPreviewUrl field changed
    if (posterPreviewUrl !== initialPosterPreviewUrl) {
      try {
        const formData = new FormData();
        formData.append('file', posterFile);
        posterId = await axios.post('image', formData);
      } catch (error) {
        notifyError(error);
        setLoading(false);
        return;
      }
    }

    // Update movie
    try {
      await axios.put(`movie/${id}`, {
        nameEn: name,
        nameVn: '',
        summary,
        releaseDate: releaseDate.valueOf(),
        categories: genres,
        actors,
        directors,
        img: posterId,
      });

      message.success('L??u thay ?????i th??nh c??ng');

      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MovieForm
      form={form}
      loading={loading}
      onFinish={handleFinish}
      submitLabel="L??u thay ?????i"
      loadingFormData={loadingMovie}
      title="S???a phim"
    />
  );
}
