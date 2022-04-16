import { Button, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

const title = 'Hệ thống chưa có phim mà bạn muốn đánh giá?';

export default function RequestMovie() {
  const user = useUserStore(state => state.user);

  const [creatingRequest, setCreatingRequest] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  async function createRequest(values) {
    const { name, info } = values;

    setCreatingRequest(true);

    try {
      await axios.post('request', {
        movieName: name,
        info: info,
      });

      message.success('Yêu cầu của bạn đang được xử lý');

      setModalVisible(false);

      form.resetFields();
    } catch (error) {
      notifyError(error);
    } finally {
      setCreatingRequest(false);
    }
  }

  function handleOk() {
    form.validateFields().then(createRequest);
  }

  function handleCancel() {
    setModalVisible(false);

    // Reset errors
    form.setFields([
      {
        name: 'name',
        errors: [],
      },
      {
        name: 'info',
        errors: [],
      },
    ]);
  }

  function handleClick() {
    setModalVisible(true);
  }

  if (!user) {
    return (
      <div>
        <h2>{title}</h2>

        <div>Hãy đăng nhập để yêu cầu thêm phim mới</div>
      </div>
    );
  }

  return (
    <div>
      <h2>{title}</h2>

      <div>
        <Button onClick={handleClick}>Yêu cầu thêm phim mới</Button>
      </div>

      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        title="Yêu cầu thêm phim mới"
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        onOk={handleOk}
        confirmLoading={creatingRequest}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="name"
            label="Tên phim"
            rules={[{ required: true, message: 'Hãy điền tên phim' }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="info"
            label="Thông tin phim"
            rules={[{ required: true, message: 'Hãy điền thông tin phim' }]}
          >
            <Input.TextArea autoSize allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
