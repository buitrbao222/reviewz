import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Upload,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

const { Option } = Select;

function posterFileValidator(form) {
  return {
    validator() {
      if (form.getFieldValue('posterPreviewUrl')) {
        return Promise.resolve();
      }

      return Promise.reject('Hãy chọn poster');
    },
  };
}

function posterPreviewShouldUpdate(prevValues, curValues) {
  return prevValues.posterPreviewUrl !== curValues.posterPreviewUrl;
}

function PosterPreview(form) {
  const posterPreviewUrl = form.getFieldValue('posterPreviewUrl');

  if (!posterPreviewUrl) {
    return null;
  }

  return (
    <img src={posterPreviewUrl} alt="" className="max-w-full mb-6 -mt-3" />
  );
}

export default function MovieForm(props) {
  const { form, onFinish, loading, submitLabel } = props;

  const [loadingGenres, setLoadingGenres] = useState(true);

  const [loadingActors, setLoadingActors] = useState(true);

  const [loadingDirectors, setLoadingDirectors] = useState(true);

  const [genres, setGenres] = useState([]);

  const [actors, setActors] = useState([]);

  const [directors, setDirectors] = useState([]);

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
    const { file, fileList } = event;

    // If file is an image, load preview url and set new file as new value
    // Else show error modal and keep last file as value
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function () {
        form.setFieldsValue({
          posterPreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);

      return file;
    } else {
      Modal.error({
        title: 'Chỉ chấp nhận file ảnh',
      });

      return fileList.at(-2)?.originFileObj;
    }
  }

  function getValueProps(value) {
    return value;
  }

  return (
    <div className="p-4 bg-white">
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
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
          format="DD/MM/YYYY"
          rules={[{ required: true, message: 'Hãy chọn ngày công chiếu' }]}
        >
          <DatePicker allowClear placeholder="" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Sơ lược"
          rules={[{ required: true, message: 'Hãy nhập sơ lược' }]}
        >
          <Input.TextArea allowClear autoSize />
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
          rules={[posterFileValidator]}
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

        <Form.Item noStyle shouldUpdate={posterPreviewShouldUpdate}>
          {form => (
            <Form.Item name="posterPreviewUrl">
              <PosterPreview {...form} />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            {submitLabel}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
