import { Form, Modal } from 'antd';
import axios from 'axios';
import MovieForm from 'components/admin/MovieForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notifyError from 'utils/notifyError';

export default function AdminMovieCreatePage() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  async function handleFinish(values) {
    const {
      name,
      summary,
      releaseDate,
      genres,
      actors,
      directors,
      posterFile,
    } = values;

    setLoading(true);

    // Upload poster to get poster id for uploading movie
    let posterId;
    try {
      const formData = new FormData();
      formData.append('file', posterFile);
      posterId = await axios.post('image', formData);
    } catch (error) {
      notifyError(error);
      setLoading(false);
      return;
    }

    // Upload movie
    try {
      await axios.post('movie', {
        nameEn: name,
        nameVn: '',
        summary,
        releaseDate: releaseDate.valueOf(),
        categories: genres,
        actors,
        directors,
        img: posterId,
      });

      Modal.success({
        title: 'Thêm phim thành công',
        onOk: function () {
          navigate('/admin/movie');
        },
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
      onFinish={handleFinish}
      loading={loading}
      submitLabel="Thêm phim"
      title="Thêm phim"
    />
  );
}
