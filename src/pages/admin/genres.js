import axios from 'axios';
import CreateGenreModal from 'components/admin/CreateGenreModal';
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

  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    getGenres();
  }, []);

  async function getGenres() {
    setLoading(true);

    try {
      const response = await axios.get('/category');
      console.log('Get genres response', response);
      setDataSource(response);
    } catch (error) {
      console.log('Get genres error', error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setCreateModalVisible(true);
  }

  async function deleteGenre(genreId) {
    setLoading(true);

    try {
      const response = await axios.delete(`/category/${genreId}`);

      console.log('Delete genre response', response);

      setLoading(false);

      getGenres();
    } catch (error) {
      console.log('Delete genre error', error);

      if (error.message === `category've been used`) {
        notifyError('Không thể xóa vì thể loại này đang được sử dụng.');
      } else {
        notifyError(error);
      }

      setLoading(false);
    }
  }

  function openEditModal() {}

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onRefreshClick={getGenres}
        onAddClick={openCreateModal}
        onDeleteConfirm={deleteGenre}
        onEditClick={openEditModal}
      />

      <CreateGenreModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        refetch={getGenres}
      />
    </div>
  );
}
