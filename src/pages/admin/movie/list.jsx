import axios from 'axios';
import TableLayout from 'components/admin/TableLayout';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import notifyError from 'utils/notifyError';

export default function AdminMovieListPage() {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState();

  const columns = useMemo(
    () => [
      {
        title: 'Tên phim',
        dataIndex: 'nameEn',
      },
      {
        title: 'Lượt đánh giá',
        dataIndex: 'rated',
      },
      {
        title: 'Điểm',
        dataIndex: 'starAvg',
        render: (starAvg, row, index) => starAvg || undefined,
      },
      {
        title: 'Ngày công chiếu',
        dataIndex: 'releaseDate',
        render: (releaseDate, row, index) =>
          moment(releaseDate).format('DD/MM/YYYY'),
      },
    ],
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    try {
      const response = await axios.get('movie/filter');

      setDataSource(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        onRefetch={loadData}
        loading={loading}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        rowKey="id"
      />
    </div>
  );
}
