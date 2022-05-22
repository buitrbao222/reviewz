import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

export default function EditHashtagModal(props) {
  const { visible, setVisible, selectedRow, onFinish } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue({
        name: selectedRow.name,
      });
    }
  }, [selectedRow]);

  async function handleOk() {
    let values;
    try {
      values = await form.validateFields();
    } catch (error) {
      return;
    }

    setLoading(true);

    try {
      await axios.put(`tag/${selectedRow.id}`, {
        name: values.name.trim(),
      });

      message.success('Sửa hashtag thành công');

      form.resetFields();

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

  function handleCancel() {
    form.resetFields();
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      title="Sửa hashtag"
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
