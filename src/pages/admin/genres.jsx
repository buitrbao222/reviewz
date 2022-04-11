import axios from 'axios';
import CreateGenreModal from 'components/admin/CreateGenreModal';
import EditGenreModal from 'components/admin/EditGenreModal';
import TableLayout from 'components/admin/TableLayout';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

const columns = [
  {
    title: 'Thể loại',
    dataIndex: 'name',
  },
];

export default function GenresPage() {
  const [dataSource, setDataSource] = useState();

  const [loading, setLoading] = useState(true);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState();

  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    try {
      const response = await axios.get('/category');
      setDataSource(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setCreateModalVisible(true);
  }

  async function handleDelete() {
    try {
      await axios.delete(`/category/${selectedRow.id}`);
      loadData();
    } catch (error) {
      if (error.message === `category've been used`) {
        notifyError('Không thể xóa vì thể loại này đang được sử dụng.');
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

      <CreateGenreModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        onFinish={loadData}
      />

      <EditGenreModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        onFinish={handleEditFinish}
        selectedRow={selectedRow}
      />
    </div>
  );
}
