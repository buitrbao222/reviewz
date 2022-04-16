import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

export default function CreateActorModal(props) {
  const { visible, setVisible, onFinish } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function createGenre(values) {
    setLoading(true);

    try {
      await axios.post('actor', {
        name: values.name.trim(),
      });

      message.success('Thêm diễn viên thành công');

      form.resetFields();

      setVisible(false);

      onFinish();
    } catch (error) {
      if (error.message === 'Actor existed') {
        form.setFields([
          {
            name: 'name',
            errors: ['Diễn viên này đã tồn tại'],
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
    form.validateFields().then(createGenre);
  }

  function handleCancel() {
    setVisible(false);
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title="Thêm diễn viên"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Tên diễn viên"
          rules={[{ required: true, message: 'Hãy điền tên diễn viên' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
