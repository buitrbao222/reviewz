import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import RequestDetailsModal from 'components/admin/RequestDetailsModal';
import TableLayout from 'components/admin/TableLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

const columns = [
  {
    title: 'Người tạo',
    dataIndex: ['user', 'username'],
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    render: (date, row, index) => moment(date).format('DD/MM/YYYY'),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'resolved',
    render: (resolved, row, index) =>
      resolved ? 'Đã giải quyết' : 'Chưa giải quyết',
  },
];

export default function AdminRequestPage() {
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
      const response = await axios.get('request');
      setDataSource(response);
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

      <RequestDetailsModal
        visible={detailsModalVisible}
        setVisible={setDetailsModalVisible}
        selectedRow={selectedRow}
        refetch={loadData}
      />
    </div>
  );
}
