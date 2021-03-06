import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { passwordFormRules } from 'components/main/MainLayout/RegisterForm';
import { useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export default function ChangePassword() {
  const user = useUserStore(store => store.user);

  const setUser = useUserStore(store => store.setUser);

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  function toggleModal() {
    setVisible(true);
  }

  function handleModalCancel() {
    setVisible(false);
    form.resetFields();
  }

  async function handleFormFinish(values) {
    const { oldPassword, newPassword } = values;

    setLoading(true);

    try {
      const response = await axios.put(`user/password/${user.id}`, {
        oldPassword,
        newPassword,
      });

      setLoading(false);

      handleModalCancel();

      setUser({
        ...user,
        ...response,
      });
    } catch (error) {
      setLoading(false);

      if (error.message === 'Invalid field: password') {
        form.setFields([
          {
            name: 'oldPassword',
            errors: ['Sai mật khẩu'],
          },
        ]);
      } else {
        notifyError(error);
      }
    }
  }

  function newPasswordValidator(form) {
    return {
      validator: (_, value) =>
        form.getFieldValue('oldPassword') !== value
          ? Promise.resolve()
          : Promise.reject('Mật khẩu mới phải khác mật khẩu cũ'),
    };
  }

  function confirmNewPasswordValidator(form) {
    return {
      validator: (_, value) =>
        form.getFieldValue('newPassword') === value
          ? Promise.resolve()
          : Promise.reject('Xác nhận mật khẩu mới không đúng'),
    };
  }

  return (
    <>
      <Button onClick={toggleModal}>Đổi mật khẩu</Button>

      <Modal
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
        title="Đổi mật khẩu"
      >
        <Form
          onFinish={handleFormFinish}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Hãy điền mật khẩu cũ',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            dependencies={['oldPassword']}
            validateFirst
            rules={[
              {
                required: true,
                message: 'Hãy điền mật khẩu mới',
              },
              newPasswordValidator,
              ...passwordFormRules,
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            validateFirst
            rules={[
              {
                required: true,
                message: 'Hãy xác nhận mật khẩu mới',
              },
              confirmNewPasswordValidator,
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
