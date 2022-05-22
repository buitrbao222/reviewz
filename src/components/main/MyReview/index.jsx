import { Button, Form, Input, message, Rate, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import useUserStore from 'store/userStore';
import confirmModal from 'utils/confirmModal';
import notifyError from 'utils/notifyError';

const { Option } = Select;

const { useForm } = Form;

export default function MyReview(props) {
  const { myReview, setMyReview, movieId, hashtags } = props;

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
      const response = await axios.post('review', {
        idMovie: movieId,
        star: values.rating,
        content: values.content,
        tags: values.hashtags,
      });

      message.success('Bài đánh giá của bạn đang chờ duyệt');

      setFormMode('read');

      setMyReview(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  async function editReview(values) {
    setLoading(true);

    try {
      const response = await axios.put(`review/${myReview.id}`, {
        star: values.rating,
        content: values.content,
        tags: values.hashtags,
      });

      message.success('Bài đánh giá của bạn đang chờ duyệt');

      setMyReview(response);

      setFormMode('read');

      form.setFieldsValue({
        rating: response.star,
        content: response.content,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview() {
    try {
      const response = await axios.delete(`review/${myReview.id}`);

      message.success('Bài đánh giá của bạn đã được xóa');

      setMyReview(undefined);

      form.resetFields();

      setFormMode('post');

      return Promise.resolve(response);
    } catch (error) {
      notifyError(error);
      return Promise.reject(error);
    }
  }

  function confirmDeleteReview() {
    confirmModal({
      title: 'Bạn có chắc là muốn xóa đánh giá này?',
      onOk: deleteReview,
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
            hashtags: myReview?.tags,
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
          >
            <Rate
              count={10}
              character={({ index, value }) =>
                index < value ? <FaStar /> : <FaRegStar />
              }
              disabled={loading || formMode === 'read'}
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
            className="mt-2"
          >
            <Input.TextArea
              placeholder="Nội dung đánh giá..."
              disabled={loading || formMode === 'read'}
              className="read-only"
              autoSize
            />
          </Form.Item>

          <Form.Item name="hashtags" className="mt-2">
            <Select
              mode="multiple"
              showSearch
              allowClear
              placeholder={'Thêm hashtag cho đánh giá...'}
              disabled={formMode === 'read'}
              className="read-only"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {hashtags.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
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
