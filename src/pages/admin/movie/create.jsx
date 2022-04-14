import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Upload,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notifyError from 'utils/notifyError';

const { Option } = Select;

export default function AdminMovieCreatePage() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [loadingGenres, setLoadingGenres] = useState(true);

  const [loadingActors, setLoadingActors] = useState(true);

  const [loadingDirectors, setLoadingDirectors] = useState(true);

  const [genres, setGenres] = useState([]);

  const [actors, setActors] = useState([]);

  const [directors, setDirectors] = useState([]);

  const [posterPreview, setPosterPreview] = useState();

  // Load genres, actors, and directors on mount for filter selects
  useEffect(() => {
    getGenres();
    getActors();
    getDirectors();
  }, []);

  async function getGenres() {
    try {
      const response = await axios.get('category');

      setGenres(response);
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
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingDirectors(false);
    }
  }

  function getValueFromEvent(event) {
    const { file } = event;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function () {
        setPosterPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPosterPreview(undefined);
    }

    return file;
  }

  function getValueProps(value) {
    return value;
  }

  function onlyAcceptImage(rule, file) {
    if (file.type.startsWith('image/')) {
      return Promise.resolve();
    }

    return Promise.reject('Chỉ chấp nhận file ảnh');
  }

  async function handleFinish(values) {
    console.log(values);

    const {
      name,
      summary,
      releaseDate,
      genres,
      actors,
      directors,
      posterFile,
    } = values;

    let posterId;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', posterFile);

    try {
      posterId = await axios.post('image', formData);
    } catch (error) {
      notifyError(error);
      setLoading(false);
      return;
    }

    try {
      await axios.post('movie', {
        nameEn: name,
        nameVn: '',
        summary,
        releaseDate: releaseDate.valueOf(),
        categories: genres,
        actors,
        directors,
        img: posterId,
      });

      Modal.success({
        title: 'Thêm phim thành công',
        onOk: function () {
          navigate('/admin/movie/list');
        },
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white">
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label="Tên phim"
          rules={[{ required: true, message: 'Hãy nhập tên phim' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="releaseDate"
          label="Ngày công chiếu"
          rules={[{ required: true, message: 'Hãy chọn ngày công chiếu' }]}
        >
          <DatePicker allowClear placeholder="" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Sơ lược"
          rules={[{ required: true, message: 'Hãy nhập sơ lược' }]}
        >
          <Input.TextArea allowClear />
        </Form.Item>

        <Form.Item
          name="genres"
          label="Thể loại"
          rules={[{ required: true, message: 'Hãy chọn ít nhất 1 thể loại' }]}
        >
          <Select
            mode="multiple"
            showSearch
            allowClear
            notFoundContent={loadingGenres ? <Spin size="small" /> : null}
            placeholder={loadingGenres ? 'Đang tải...' : ''}
            disabled={loadingGenres}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {genres.map(x => (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="actors"
          label="Diễn viên"
          rules={[{ required: true, message: 'Hãy chọn ít nhất 1 diễn viên' }]}
        >
          <Select
            mode="multiple"
            showSearch
            allowClear
            notFoundContent={loadingActors ? <Spin size="small" /> : null}
            placeholder={loadingActors ? 'Đang tải...' : ''}
            disabled={loadingActors}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {actors.map(x => (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="directors"
          label="Đạo diễn"
          rules={[{ required: true, message: 'Hãy chọn ít nhất 1 đạo diễn' }]}
        >
          <Select
            mode="multiple"
            showSearch
            allowClear
            notFoundContent={loadingDirectors ? <Spin size="small" /> : null}
            placeholder={loadingDirectors ? 'Đang tải...' : ''}
            disabled={loadingDirectors}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {directors.map(x => (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="posterFile"
          label="Poster"
          getValueFromEvent={getValueFromEvent}
          getValueProps={getValueProps}
          rules={[
            {
              required: true,
              message: 'Hãy chọn poster',
            },
            { validator: onlyAcceptImage },
          ]}
          validateFirst
        >
          <Upload
            beforeUpload={() => false}
            accept="image/*"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} className="poster-upload-button">
              Chọn file
            </Button>
          </Upload>
        </Form.Item>

        {posterPreview && (
          <img
            src={posterPreview}
            alt="poster"
            className="max-w-full mb-6 -mt-3"
          />
        )}

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            disabled={loading}
          >
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
