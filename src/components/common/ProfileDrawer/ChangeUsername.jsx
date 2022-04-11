import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import useUserStore from 'store/userStore';
import { usernameFormRules } from 'components/main/MainLayout/RegisterForm';
import notifyError from 'utils/notifyError';

const { useForm } = Form;

export default function ChangeUsername(props) {
  const user = useUserStore(store => store.user);

  const setToken = useUserStore(store => store.setToken);

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const [form] = useForm();

  function toggleModal() {
    setVisible(x => !x);
  }

  function handleModalCancel() {
    setVisible(false);
    form.resetFields();
  }

  async function handleFormFinish(values) {
    const { username } = values;

    setLoading(true);

    try {
      const token = await axios.put(`/user/${user.id}`, {
        username,
      });

      setToken(token);

      handleModalCancel();
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={toggleModal}>Đổi tên đăng nhập</Button>

      <Modal
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
        title="Đổi tên đăng nhập"
      >
        <Form
          onFinish={handleFormFinish}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Tên đăng nhập mới"
            name="username"
            validateFirst
            rules={[
              {
                required: true,
                message: 'Hãy điền tên đăng nhập mới',
              },
              {
                validator: (_, value) =>
                  value !== user.name
                    ? Promise.resolve()
                    : Promise.reject(
                        'Tên đăng nhập mới phải khác tên đăng nhập cũ'
                      ),
              },
              ...usernameFormRules,
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Xác nhận tên đăng nhập mới"
            name="confirmUsername"
            dependencies={['username']}
            validateFirst
            rules={[
              {
                required: true,
                message: 'Hãy xác nhận tên đăng nhập mới',
              },
              {
                validator: (_, value) => {
                  if (form.getFieldValue('username') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Xác nhận tên đăng nhập không đúng');
                },
              },
            ]}
          >
            <Input />
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
