import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Rate } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export default function MyReview(props) {
  const { myReview, setMyReview, movieId } = props;

  const user = useUserStore(store => store.user);

  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  // There are 3 form modes: 'post', 'read', 'edit'
  // 'post': user can post a new review
  // 'read': user can only read
  // 'edit': user can edit review
  const [formMode, setFormMode] = useState(myReview ? 'read' : 'post');

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

      message.success('Bài đánh giá của bạn đang chờ duyệt');

      setMyReview(response);
    } catch (error) {
      console.log('Post review error', error);
      notifyError(error);
    } finally {
      setLoading(false);
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

      message.success('Bài đánh giá của bạn đang chờ duyệt');

      setMyReview(response);

      setFormMode('read');

      form.setFieldsValue({
        rating: response.star,
        content: response.content,
      });
    } catch (error) {
      console.log('Edit review error', error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview() {
    try {
      const response = await axios.delete(`/review/${myReview.id}`);

      console.log('Delete review response', response);

      message.success('Bài đánh giá của bạn đã được xóa');

      setMyReview(undefined);

      form.resetFields();

      return Promise.resolve(response);
    } catch (error) {
      console.log('Delete review error', error);
      notifyError(error);
      return Promise.reject(error);
    }
  }

  function confirmDeleteReview() {
    Modal.confirm({
      title: 'Bạn có chắc là muốn xóa bài đánh giá này?',
      icon: <QuestionCircleOutlined />,
      onOk: deleteReview,
      okText: 'Có',
      okType: 'primary',
      okButtonProps: {
        danger: true,
      },
      cancelText: 'Không',
    });
  }

  function handleEditClick() {
    setFormMode('edit');
  }

  function handleEditCancelClick() {
    setFormMode('read');
    form.setFieldsValue({
      rating: myReview.star,
      content: myReview.content,
    });
  }

  if (!user) {
    return <div>Hãy đăng nhập để đánh giá</div>;
  }

  return (
    <div>
      <h2>
        Đánh giá của bạn{' '}
        {myReview && (myReview.verified ? '(Đã duyệt)' : '(Chờ duyệt)')}
      </h2>

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
              disabled={formMode === 'read'}
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
            <Input.TextArea
              placeholder="Nội dung đánh giá..."
              disabled={formMode === 'read'}
              className="read-only"
              autoSize
            />
          </Form.Item>

          <Form.Item>
            {formMode === 'post' && (
              <Button type="primary" htmlType="submit" loading={loading}>
                Đăng
              </Button>
            )}

            {formMode === 'read' && (
              <>
                <Button type="primary" onClick={handleEditClick}>
                  Sửa
                </Button>

                <Button
                  type="primary"
                  danger
                  onClick={confirmDeleteReview}
                  className="ml-4"
                >
                  Xóa
                </Button>
              </>
            )}

            {formMode === 'edit' && (
              <>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Lưu
                </Button>

                <Button
                  type="primary"
                  danger
                  onClick={handleEditCancelClick}
                  disabled={loading}
                  className="ml-4"
                >
                  Hủy
                </Button>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
