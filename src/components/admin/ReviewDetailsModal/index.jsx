import { Button, Modal } from 'antd';
import axios from 'axios';
import ReviewItem from 'components/main/OtherReviews/ReviewItem';
import confirmModal from 'utils/confirmModal';
import notifyError from 'utils/notifyError';

export default function ReviewDetailsModal(props) {
  const { visible, setVisible, selectedRow, refetch } = props;

  function handleCancel() {
    setVisible(false);
  }

  function handleApprove() {
    confirmModal({
      title: 'Bạn có chắc là muốn duyệt đánh giá này?',
      danger: false,
      onOk: async function () {
        try {
          await axios.post(`review/verify/${selectedRow.id}`);
          setVisible(false);
          refetch();
        } catch (error) {
          notifyError(error);
        }
      },
    });
  }

  function handleDelete() {
    confirmModal({
      title: 'Bạn có chắc là muốn xóa đánh giá này?',
      onOk: async function () {
        try {
          await axios.delete(`review/${selectedRow.id}`);
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
      title="Chi tiết đánh giá"
      onCancel={handleCancel}
      footer={[
        !selectedRow?.verified && (
          <Button type="primary" key="approve" onClick={handleApprove}>
            Duyệt
          </Button>
        ),
        <Button type="primary" danger key="delete" onClick={handleDelete}>
          Xóa
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          OK
        </Button>,
      ]}
    >
      <ReviewItem review={selectedRow} hasPadding={false} hasShadow={false} />
    </Modal>
  );
}
