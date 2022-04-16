import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import TableLayout from 'components/admin/TableLayout';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notifyError from 'utils/notifyError';

export default function AdminMovieListPage() {
  const navigate = useNavigate();

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

  async function handleCreate() {
    navigate('/admin/movie/create');
  }

  async function handleDelete() {
    setLoading(true);

    try {
      await axios.delete(`movie/${selectedRow.id}`);
      loadData();
    } catch (error) {
      notifyError(error);
      setLoading(false);
    }
  }

  function handleEdit() {
    navigate(`/admin/movie/edit/${selectedRow.id}`);
  }

  function handleViewDetails() {
    window.open(`${window.location.origin}/movie/${selectedRow.id}`);
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        onRefetch={loadData}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
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
    </div>
  );
}
