import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();

  function handleSearch(value) {
    if (value) {
      navigate(`/search/?keyword=${value}`);
    } else {
      navigate('/search');
    }
  }

  return (
    <Input.Search
      className="flex-1 max-w-md ml-8"
      placeholder="Tìm kiếm phim..."
      enterButton
      size="large"
      onSearch={handleSearch}
    />
  );
}
