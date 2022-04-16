import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

export default function EditActorModal(props) {
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
      await axios.put(`actor/${selectedRow.id}`, {
        name: values.name.trim(),
      });

      message.success('Sửa diễn viên thành công');

      form.resetFields();

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

  function handleCancel() {
    form.resetFields();
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      title="Sửa diễn viên"
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
