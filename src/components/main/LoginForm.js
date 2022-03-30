import { Button, Form, Input } from 'antd';

export default function LoginForm(props) {
  const { setModalTab } = props;

  function handleFinish(values) {
    const { username, password } = values;

    // Call api
  }

  function handleRegisterClick() {
    setModalTab('register');
  }

  return (
    <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[
          {
            required: true,
            message: 'Hãy điền tên đăng nhập',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Hãy điền mật khẩu',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <Form.Item>
        Chưa có tài khoản?{' '}
        <Button type="link" onClick={handleRegisterClick} className="pl-0">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}
