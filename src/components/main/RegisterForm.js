import { Button, Form, Input } from 'antd';

const { useForm } = Form;

export default function RegisterForm(props) {
  const { setModalTab } = props;

  const [form] = useForm();

  function handleFinish(values) {
    const { username, password, confirmPassword } = values;

    // Call api
  }

  function handleLoginClick() {
    setModalTab('login');
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

      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        validateFirst
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Hãy điền lại mật khẩu',
          },
          {
            validator(_, value) {
              if (form.getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('Xác nhận mật khẩu không đúng');
            },
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>

      <Form.Item>
        Đã có tài khoản?{' '}
        <Button type="link" onClick={handleLoginClick} className="pl-0">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
