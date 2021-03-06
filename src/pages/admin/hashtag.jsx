import axios from 'axios';
import CreateHashtagModal from 'components/admin/CreateHashtagModal';
import EditHashtagModal from 'components/admin/EditHashtagModal';
import TableLayout from 'components/admin/TableLayout';
import useHashtags from 'hooks/useHashtags';
import { useState } from 'react';
import notifyError from 'utils/notifyError';

const columns = [
  {
    title: 'Hashtag',
    dataIndex: 'name',
  },
];

export default function AdminHashtagPage() {
  const { data: dataSource, loading, loadData } = useHashtags();

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState();

  const [selectedRow, setSelectedRow] = useState();

  function handleCreate() {
    setCreateModalVisible(true);
  }

  async function handleDelete() {
    try {
      await axios.delete(`tag/${selectedRow.id}`);
      loadData();
    } catch (error) {
      if (error.message === `tag've been used`) {
        notifyError('Không thể xóa vì hashtag này đang được sử dụng.');
      } else {
        notifyError(error);
      }
    }
  }

  function handleEdit() {
    setEditModalVisible(true);
  }

  function handleEditFinish() {
    loadData();
    setSelectedRow(undefined);
    setEditModalVisible(false);
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onRefetch={loadData}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        rowKey="id"
      />

      <CreateHashtagModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        onFinish={loadData}
      />

      <EditHashtagModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        onFinish={handleEditFinish}
        selectedRow={selectedRow}
      />
    </div>
  );
}
