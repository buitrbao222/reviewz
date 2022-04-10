import axios from 'axios';
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

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadGenres() {
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

  return (
    <TableLayout
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onRefreshClick={loadGenres}
    />
  );
}
