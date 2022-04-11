import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export default function LoginForm(props) {
  const { setModalTab } = props;

  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  const setToken = useUserStore(store => store.setToken);

  async function handleFinish(values) {
    const { username, password } = values;

    setLoading(true);

    try {
      const token = await axios.post('/user/login', {
        username,
        password,
      });

      message.success('Đăng nhập thành công!');

      setLoading(false);

      setModalTab(undefined);

      setToken(token);
    } catch (error) {
      setLoading(false);

      switch (error.message) {
        case 'User not found':
          form.setFields([
            {
              name: 'username',
              errors: ['Tài khoản này không tồn tại'],
            },
          ]);
          break;
        case 'Invalid field: password':
          form.setFields([
            {
              name: 'password',
              errors: ['Sai mật khẩu'],
            },
          ]);
          break;
        default:
          notifyError(error);
      }
    }
  }

  function handleRegisterClick() {
    setModalTab('register');
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleFinish}
      requiredMark={false}
      form={form}
    >
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
        <Button type="primary" htmlType="submit" loading={loading}>
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
