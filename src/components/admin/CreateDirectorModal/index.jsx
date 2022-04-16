import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

export default function CreateDirectorModal(props) {
  const { visible, setVisible, onFinish } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function createGenre(values) {
    setLoading(true);

    try {
      await axios.post('director', {
        name: values.name.trim(),
      });

      message.success('Thêm đạo diễn thành công');

      form.resetFields();

      setVisible(false);

      onFinish();
    } catch (error) {
      if (error.message === 'Category existed') {
        form.setFields([
          {
            name: 'name',
            errors: ['Đạo diễn này đã tồn tại'],
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
      title="Thêm đạo diễn"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Tên đạo diễn"
          rules={[{ required: true, message: 'Hãy điền tên đạo diễn' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
