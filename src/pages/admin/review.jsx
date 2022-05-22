import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import ReviewDetailsModal from 'components/admin/ReviewDetailsModal';
import TableLayout from 'components/admin/TableLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

const columns = [
  {
    title: 'Người đánh giá',
    dataIndex: ['user', 'username'],
  },
  {
    title: 'Phim',
    dataIndex: ['movie', 'nameEn'],
  },
  {
    title: 'Điểm',
    dataIndex: 'star',
  },
  {
    title: 'Ngày đánh giá',
    dataIndex: 'createdAt',
    render: (createdAt, row, index) => moment(createdAt).format('DD/MM/YYYY'),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'verified',
    render: (verified, row, index) => (verified ? 'Đã duyệt' : 'Chưa duyệt'),
  },
];

export default function AdminReviewPage() {
  const [dataSource, setDataSource] = useState();

  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState();

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    try {
      const response = await axios.get('review');

      // Sort by:
      //   1. Not verified first
      //   2. Newest createdAt first
      const sorted = response.sort((a, b) => {
        if (a.verified !== b.verified) {
          return b.verified ? -1 : 1;
        }

        return b.createdAt - a.createdAt;
      });

      setDataSource(sorted);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleViewDetails() {
    setDetailsModalVisible(true);
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onRefetch={loadData}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        rowKey="id"
        customButtons={
          <Button
            icon={<EyeOutlined />}
            disabled={!selectedRow}
            onClick={handleViewDetails}
          >
            Xem chi tiết
          </Button>
        }
      />

      <ReviewDetailsModal
        visible={detailsModalVisible}
        setVisible={setDetailsModalVisible}
        selectedRow={selectedRow}
        refetch={loadData}
      />
    </div>
  );
}
