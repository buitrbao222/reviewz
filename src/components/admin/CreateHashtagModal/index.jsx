import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

export default function CreateHashtagModal(props) {
  const { visible, setVisible, onFinish } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function createGenre(values) {
    setLoading(true);

    try {
      await axios.post('tag', {
        name: values.name.trim(),
      });

      message.success('Thêm hashtag thành công');

      form.resetFields();

      setVisible(false);

      onFinish();
    } catch (error) {
      if (error.message === 'Tag existed') {
        form.setFields([
          {
            name: 'name',
            errors: ['Hashtag này đã tồn tại'],
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
      title="Thêm hashtag"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Tên hashtag"
          rules={[{ required: true, message: 'Hãy điền tên hashtag' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
