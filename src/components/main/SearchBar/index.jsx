import { Input } from 'antd';

export default function SearchBar() {
  return (
    <Input.Search
      className="flex-1 max-w-md ml-8"
      placeholder="Tìm kiếm phim..."
      enterButton
      size="large"
    />
  );
}
