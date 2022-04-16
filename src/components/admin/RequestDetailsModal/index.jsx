import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import confirmModal from 'utils/confirmModal';
import notifyError from 'utils/notifyError';

export default function RequestDetailsModal(props) {
  const { visible, setVisible, selectedRow, refetch } = props;

  function handleCancel() {
    setVisible(false);
  }

  function handleApprove() {
    confirmModal({
      title: 'Đánh dấu yêu cầu này là đã giải quyết?',
      danger: false,
      onOk: async function () {
        try {
          await axios.post(`request/resolve/${selectedRow.id}`);
          setVisible(false);
          refetch();
        } catch (error) {
          notifyError(error);
        }
      },
    });
  }

  return (
    <Modal
      visible={visible}
      title="Chi tiết yêu cầu"
      onCancel={handleCancel}
      footer={[
        !selectedRow?.resolved && (
          <Button type="primary" key="approve" onClick={handleApprove}>
            Đã giải quyết
          </Button>
        ),
        <Button key="cancel" onClick={handleCancel}>
          OK
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Tên phim">
          <Input value={selectedRow?.movieName} />
        </Form.Item>

        <Form.Item label="Thông tin phim">
          <Input.TextArea value={selectedRow?.info} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
