import { Button, Col, Divider, Form, Input, Row, Select, Spin } from 'antd';
import axios from 'axios';
import MovieCard from 'components/main/MovieCard';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import notifyError from 'utils/notifyError';

const { Option } = Select;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const genre = searchParams.get('genre');
  const actor = searchParams.get('actor');
  const director = searchParams.get('director');
  const year = searchParams.get('year');
  const sort = searchParams.get('sort');
  const highestStar = searchParams.get('highestStar');
  const mostRated = searchParams.get('mostRated');

  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getMovies();
  }, [keyword, genre, actor, director, year, highestStar, mostRated]);

  async function getMovies() {
    console.log('Search params:', searchParams);

    setLoading(true);

    const params = {
      keyword,
      genre,
      actor,
      director,
      year,
    };

    params[sort] = true;

    try {
      const response = await axios.get('/movie/filter', {
        params,
      });

      setMovies(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  function onFinish(values) {
    console.log(values);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spin size="large" className="scale-[3]" />
      </div>
    );
  }

  return (
    <div className="py-[50px] text-dark">
      <h1 className="text-4xl">Tìm kiếm</h1>

      <div className="mt-4">
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="filter-grid">
            <Form.Item name="keyword" label="Từ khóa">
              <Input />
            </Form.Item>

            <Form.Item name="genre" label="Thể loại">
              <Select />
            </Form.Item>

            <Form.Item name="actor" label="Diễn viên">
              <Select />
            </Form.Item>

            <Form.Item name="director" label="Đạo diễn">
              <Select />
            </Form.Item>

            <Form.Item name="year" label="Năm">
              <Select />
            </Form.Item>

            <Form.Item name="sort" label="Sắp xếp theo">
              <Select defaultValue={sort || ''}>
                <Option value="">Ngày ra mắt</Option>
                <Option value="highestStar">Điểm</Option>
                <Option value="mostRated">Lượt đánh giá</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Lọc phim
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <Divider />

      <div className="search-grid">
        {movies.map(x => (
          <MovieCard movie={x} />
        ))}
      </div>
    </div>
  );
}
