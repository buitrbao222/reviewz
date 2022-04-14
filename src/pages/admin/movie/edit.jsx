import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AdminMovieEditPage() {
  const navigate = useNavigate();

  function handleBack() {
    navigate('/admin/movie/list');
  }

  return (
    <div>
      <Button icon={<RollbackOutlined />} onClick={handleBack}>
        Trở về danh sách
      </Button>
    </div>
  );
}
