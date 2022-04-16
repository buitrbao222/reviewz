import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

export default function CreateGenreModal(props) {
  const { visible, setVisible, onFinish } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function createGenre(values) {
    setLoading(true);

    try {
      await axios.post('category', {
        name: values.name.trim(),
      });

      message.success('Thêm thể loại thành công');

      form.resetFields();

      setVisible(false);

      onFinish();
    } catch (error) {
      if (error.message === 'Category existed') {
        form.setFields([
          {
            name: 'name',
            errors: ['Thể loại này đã tồn tại'],
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
      title="Thêm thể loại"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Tên thể loại"
          rules={[{ required: true, message: 'Hãy điền tên thể loại' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
