import { Button, Form, Input, Rate } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export default function MyReview(props) {
  const { myReview, movieId, refresh } = props;

  const user = useUserStore(store => store.user);

  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  function onFinish(values) {
    if (myReview) {
      editReview(values);
    } else {
      postReview(values);
    }
  }

  async function postReview(values) {
    setLoading(true);

    try {
      const response = await axios.post('/review', {
        idMovie: movieId,
        star: values.rating,
        content: values.content,
      });

      console.log('Post review response', response);
    } catch (error) {
      console.log('Post review error', error);
      notifyError(error);
    } finally {
      setLoading(false);
      refresh();
    }
  }

  async function editReview(values) {
    setLoading(true);

    try {
      const response = await axios.put(`/review/${myReview.id}`, {
        star: values.rating,
        content: values.content,
      });

      console.log('Edit review response', response);
    } catch (error) {
      console.log('Edit review error', error);
      notifyError(error);
    } finally {
      setLoading(false);
      refresh();
    }
  }

  if (!user) {
    return <div>Hãy đăng nhập để đánh giá</div>;
  }

  return (
    <div>
      <h2>Đánh giá của bạn ({myReview ? 'Đã duyệt' : 'Chưa duyệt'})</h2>

      <div className="flex flex-col">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            rating: myReview?.star,
            content: myReview?.content,
          }}
        >
          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: 'Hãy chấm điểm',
              },
            ]}
            className="mb-2"
          >
            <Rate
              count={10}
              character={({ index, value }) =>
                index < value ? <FaStar /> : <FaRegStar />
              }
            />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: 'Hãy nhập nội dung đánh giá',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {myReview ? 'Sửa' : 'Đăng'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
