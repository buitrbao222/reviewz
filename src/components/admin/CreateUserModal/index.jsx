import { Form, Input, message, Modal, Switch } from 'antd';
import axios from 'axios';
import { passwordFormRules } from 'components/main/MainLayout/RegisterForm';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

export default function CreateUserModal(props) {
  const { visible, setVisible, refetch } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function createUser(values) {
    setLoading(true);

    try {
      await axios.post('/user', {
        username: values.username,
        password: values.password,
        isAdmin: values.isAdmin,
      });

      message.success('Thêm người dùng thành công');

      form.resetFields();

      setVisible(false);

      refetch();
    } catch (error) {
      if (error.message === 'User existed') {
        form.setFields([
          {
            name: 'username',
            errors: ['Người dùng này đã tồn tại'],
          },
        ]);
      } else {
        notifyError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleOk() {
    form.validateFields().then(createUser);
  }

  function handleCancel() {
    form.resetFields();
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      title="Thêm người dùng"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: 'Hãy điền tên đăng nhập' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Hãy điền mật khẩu' },
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

        <Form.Item
          valuePropName="checked"
          name="isAdmin"
          label="Quyền quản trị"
        >
          <Switch size="default" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
