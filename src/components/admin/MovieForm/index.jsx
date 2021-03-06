import { RollbackOutlined, UploadOutlined } from '@ant-design/icons';
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
import { useNavigate } from 'react-router-dom';
import notifyError from 'utils/notifyError';

const { Option } = Select;

function PosterPreview(form) {
  const posterPreviewUrl = form.getFieldValue('posterPreviewUrl');

  if (!posterPreviewUrl) {
    return null;
  }

  return (
    <Form.Item name="posterPreviewUrl">
      <img src={posterPreviewUrl} alt="" className="max-w-full -mt-3" />
    </Form.Item>
  );
}

export default function MovieForm(props) {
  const {
    form,
    onFinish,
    loading,
    submitLabel,
    loadingFormData = false,
    title,
  } = props;

  const navigate = useNavigate();

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
        title: 'Ch??? ch???p nh???n file ???nh',
      });

      return fileList.at(-2)?.originFileObj;
    }
  }

  function getValueProps(value) {
    return value;
  }

  function handleBack() {
    navigate('/admin/movie');
  }

  function posterFileValidator(form) {
    return {
      validator() {
        if (form.getFieldValue('posterPreviewUrl')) {
          return Promise.resolve();
        }

        return Promise.reject('H??y ch???n poster');
      },
    };
  }

  function posterPreviewShouldUpdate(prevValues, curValues) {
    return prevValues.posterPreviewUrl !== curValues.posterPreviewUrl;
  }

  return (
    <div>
      <Button icon={<RollbackOutlined />} onClick={handleBack} className="mb-4">
        Tr??? v??? danh s??ch
      </Button>

      <div className="bg-white">
        <div className="ant-modal-header">
          <div className="ant-modal-title">{title}</div>
        </div>

        <Spin wrapperClassName="ant-modal-body" spinning={loadingFormData}>
          <Form
            form={form}
            requiredMark={false}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="T??n phim"
              rules={[{ required: true, message: 'H??y nh???p t??n phim' }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="releaseDate"
              label="Ng??y c??ng chi???u"
              format="DD/MM/YYYY"
              rules={[{ required: true, message: 'H??y ch???n ng??y c??ng chi???u' }]}
            >
              <DatePicker allowClear placeholder="" />
            </Form.Item>

            <Form.Item
              name="summary"
              label="S?? l?????c"
              rules={[{ required: true, message: 'H??y nh???p s?? l?????c' }]}
            >
              <Input.TextArea allowClear autoSize />
            </Form.Item>

            <Form.Item
              name="genres"
              label="Th??? lo???i"
              rules={[
                { required: true, message: 'H??y ch???n ??t nh???t 1 th??? lo???i' },
              ]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                notFoundContent={loadingGenres ? <Spin size="small" /> : null}
                placeholder={loadingGenres ? '??ang t???i...' : ''}
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
              label="Di???n vi??n"
              rules={[
                { required: true, message: 'H??y ch???n ??t nh???t 1 di???n vi??n' },
              ]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                notFoundContent={loadingActors ? <Spin size="small" /> : null}
                placeholder={loadingActors ? '??ang t???i...' : ''}
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
              label="?????o di???n"
              rules={[
                { required: true, message: 'H??y ch???n ??t nh???t 1 ?????o di???n' },
              ]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                notFoundContent={
                  loadingDirectors ? <Spin size="small" /> : null
                }
                placeholder={loadingDirectors ? '??ang t???i...' : ''}
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
                <Button
                  icon={<UploadOutlined />}
                  className="poster-upload-button"
                >
                  Ch???n file
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item noStyle shouldUpdate={posterPreviewShouldUpdate}>
              {form => <PosterPreview {...form} />}
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" loading={loading}>
                {submitLabel}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
}
