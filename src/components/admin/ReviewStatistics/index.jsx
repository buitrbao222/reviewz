import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

const { RangePicker } = DatePicker;

const dateRangePresets = {
  'Tháng hiện tại': [moment().startOf('month'), moment().endOf('month')],
  'Năm hiện tại': [moment().startOf('year'), moment().endOf('year')],
  '6 tháng vừa qua': [moment().subtract(6, 'months'), moment()],
  '1 năm vừa qua': [moment().subtract(1, 'year'), moment()],
};

export default function ReviewStatistics() {
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState();

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {}, [reviews]);

  async function loadReviews() {
    setLoading(true);

    try {
      const response = await axios.get('review');
      setReviews(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="ant-modal-header">
        <div className="ant-modal-title">
          <div className="flex items-center text-lg">
            Đánh giá
            <div className="ml-3">
              {loading ? (
                <LoadingOutlined />
              ) : (
                <ReloadOutlined
                  className="transition ease-in-out hover:text-primary"
                  onClick={loadReviews}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="font-medium">Tổng lượt đánh giá:</div>
          <div>{reviews?.length}</div>
        </div>

        <div>
          <div className="font-medium">Lượt đánh giá theo thời gian:</div>
          <RangePicker
            defaultValue={dateRangePresets['Tháng hiện tại']}
            format="DD/MM/YYYY"
            className="mt-2"
            ranges={dateRangePresets}
          />
        </div>
      </div>
    </div>
  );
}
