import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export const usernameFormRules = [
  {
    pattern: /^\D.*$/,
    message: 'Tên đăng nhập không được bắt đầu bằng số',
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    message: 'Tên đăng nhập chỉ được chứa chữ cái và chữ số',
  },
  {
    min: 5,
    message: 'Tên đăng nhập tối thiểu 5 kí tự',
  },
];

export const passwordFormRules = [
  {
    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
    message:
      'Mật khẩu phải có ít nhất 1 chữ cái, 1 chữ số và không có kí tự đặc biệt',
  },
  { min: 6, message: 'Mật khẩu tối thiểu 6 kí tự' },
];

export default function RegisterForm(props) {
  const { setModalTab } = props;

  const setUser = useUserStore(store => store.setUser);

  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  async function handleFinish(values) {
    const { username, password } = values;

    setLoading(true);

    try {
      const response = await axios.post('/user/register', {
        username,
        password,
      });

      message.success('Đăng ký thành công!');

      setLoading(false);

      setUser(response);
    } catch (error) {
      setLoading(false);

      if (error.message === 'User existed') {
        form.setFields([
          {
            name: 'username',
            errors: ['Tên đăng nhập này đã tồn tại'],
          },
        ]);
      } else {
        notifyError(error);
      }
    }
  }

  function handleLoginClick() {
    setModalTab('login');
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
        validateFirst
        rules={[
          {
            required: true,
            message: 'Hãy điền tên đăng nhập',
          },
          ...usernameFormRules,
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
          ...passwordFormRules,
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
        <Button type="primary" htmlType="submit" loading={loading}>
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
