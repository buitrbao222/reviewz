import { Button, Divider, Form, Input, Select, Spin } from 'antd';
import axios from 'axios';
import MovieCard from 'components/main/MovieCard';
import { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import notifyError from 'utils/notifyError';
import removeFalsyValues from 'utils/removeFalsyValues';

const { Option } = Select;

const currentYear = new Date().getFullYear();
const years = [...Array(currentYear - 1900)].map(
  (_, index) => currentYear - index - 1
);

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const genre = searchParams.get('genre') || '';
  const actor = searchParams.get('actor') || '';
  const director = searchParams.get('director') || '';
  const year = searchParams.get('year') || '';
  const sort = searchParams.get('sort') || '';

  const [loadingMovies, setLoadingMovies] = useState(true);

  const [loadingGenres, setLoadingGenres] = useState(true);

  const [loadingActors, setLoadingActors] = useState(true);

  const [loadingDirectors, setLoadingDirectors] = useState(true);

  const [movies, setMovies] = useState([]);

  const [genres, setGenres] = useState([]);

  const [actors, setActors] = useState([]);

  const [directors, setDirectors] = useState([]);

  const [form] = Form.useForm();

  // Load genres, actors, and directors on mount for filter selects
  useEffect(() => {
    getGenres();
    getActors();
    getDirectors();
  }, []);

  // Filter movies when url search params change
  useEffect(() => {
    getMovies();
    form.setFieldsValue({
      keyword,
      year,
      sort,
    });
  }, [keyword, genre, actor, director, year, sort]);

  async function getGenres() {
    try {
      const response = await axios.get('category');

      setGenres(response);

      form.setFieldsValue({
        genre,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingGenres(false);
    }
  }

  async function getActors() {
    try {
      const response = await axios.get('actor');

      setActors(response);

      form.setFieldsValue({
        actor,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingActors(false);
    }
  }

  async function getDirectors() {
    try {
      const response = await axios.get('director');

      setDirectors(response);

      form.setFieldsValue({
        director,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingDirectors(false);
    }
  }

  async function getMovies() {
    setLoadingMovies(true);

    const params = {
      keyword,
      genre,
      actor,
      director,
      year,
    };

    // sort === 'highestStar' => params.highestStar = true
    // sort === 'mostRated' => params.mostRated = true
    if (sort) {
      params[sort] = true;
    }

    removeFalsyValues(params);

    try {
      const response = await axios.get('movie/filter', {
        params,
      });

      setMovies(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingMovies(false);
    }
  }

  // Set url search params on filter submit
  function onFinish(values) {
    removeFalsyValues(values);
    let newSearchParams = createSearchParams(values);
    setSearchParams(newSearchParams);
  }

  return (
    <div className="flex flex-col flex-1 py-6 text-dark">
      <h1 className="m-0 text-4xl">Tìm kiếm</h1>

      <Divider />

      <div>
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            keyword,
            year,
            sort,
            genre: undefined,
            actor: undefined,
            director: undefined,
          }}
        >
          <div className="filter-grid">
            <Form.Item name="keyword" label="Từ khóa">
              <Input allowClear />
            </Form.Item>

            <Form.Item name="genre" label="Thể loại">
              <Select
                showSearch
                notFoundContent={loadingGenres ? <Spin size="small" /> : null}
                placeholder="Đang tải..."
                disabled={loadingGenres}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="">Tất cả</Option>

                {genres.map(x => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="actor" label="Diễn viên">
              <Select
                notFoundContent={loadingActors ? <Spin size="small" /> : null}
                placeholder="Đang tải..."
                disabled={loadingActors}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="">Tất cả</Option>

                {actors.map(x => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="director" label="Đạo diễn">
              <Select
                showSearch
                notFoundContent={
                  loadingDirectors ? <Spin size="small" /> : null
                }
                placeholder="Đang tải..."
                disabled={loadingDirectors}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="">Tất cả</Option>

                {directors.map(x => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="year" label="Năm">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <Option value="">Tất cả</Option>

                {years.map(x => (
                  <Option key={x} value={x}>
                    {x}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="sort" label="Sắp xếp theo">
              <Select>
                <Option value="">Ngày ra mắt</Option>
                <Option value="highestStar">Điểm</Option>
                <Option value="mostRated">Lượt đánh giá</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                disabled={loadingGenres || loadingActors || loadingDirectors}
                loading={
                  loadingMovies ||
                  loadingGenres ||
                  loadingActors ||
                  loadingDirectors
                }
              >
                Lọc phim
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <Divider />

      {loadingMovies ? (
        <div className="flex items-center justify-center flex-1">
          <Spin size="large" className="scale-[3]" />
        </div>
      ) : (
        <div className="search-grid">
          {movies.map(x => (
            <MovieCard key={x.id} movie={x} />
          ))}
        </div>
      )}
    </div>
  );
}
