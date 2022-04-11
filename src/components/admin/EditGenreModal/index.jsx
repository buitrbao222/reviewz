import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

export default function EditGenreModal(props) {
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
      await axios.put(`/category/${selectedRow.id}`, {
        name: values.name.trim(),
      });

      message.success('Sửa thể loại thành công');

      form.resetFields();

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

  function handleCancel() {
    form.resetFields();
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      title="Sửa thể loại"
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
