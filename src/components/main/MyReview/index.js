import { Button, Form, Input, Rate } from 'antd';
import useUserStore from 'store/userStore';

const { useForm } = Form;

export default function MyReview() {
  const user = useUserStore(store => store.user);

  const [form] = useForm();

  function onFinish(values) {
    console.log('Success:', values);
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  if (!user) {
    return <div>Hãy đăng nhập để đánh giá</div>;
  }

  return (
    <div>
      <h2>Đánh giá của bạn</h2>

      <div className="flex flex-col">
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: 'Hãy chấm điểm',
              },
            ]}
          >
            <Rate count={10} />
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
            <Button type="primary" htmlType="submit">
              Đăng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
