import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';
import { Line } from '@ant-design/plots';

export default function ReviewStatistics() {
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState();

  const [fromDate, setFromDate] = useState(moment().startOf('month'));

  const [toDate, setToDate] = useState(moment().endOf('month'));

  const [dateRangeError, setDateRangeError] = useState();

  const [lineChartData, setLineChartData] = useState();

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    if (fromDate.isAfter(toDate)) {
      setDateRangeError(true);
      return;
    }

    setDateRangeError(false);

    if (!reviews) {
      return;
    }

    calculateLineChartData();
  }, [reviews, fromDate, toDate]);

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

  function handleFromDateChange(date) {
    setFromDate(date);
  }

  function handleToDateChange(date) {
    setToDate(date);
  }

  function calculateLineChartData() {
    // Filter reviews in date range
    const filtered = reviews
      .filter(x => moment(x.createdAt).isBetween(fromDate, toDate))
      .map(x => x.createdAt)
      .sort((a, z) => a - z);

    const daysDiff = toDate.diff(fromDate, 'days') + 1;

    // Default step size is 1 day
    let stepSize = 1;
    if (daysDiff > 365) {
      stepSize = 365;
    } else if (daysDiff > 30) {
      stepSize = 30;
    } else if (daysDiff > 7) {
      stepSize = 7;
    }

    // Number of steps in date range
    const steps = Math.ceil(daysDiff / stepSize);

    let lineChartData = {};

    for (let i = 0; i < steps; i++) {
      const label = moment(fromDate)
        .add(i * stepSize, 'days')
        .format('DD/MM/YYYY');
      lineChartData[label] = 0;
    }

    console.log(lineChartData);
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
          <div className="font-medium">
            Lượt đánh giá theo khoảng thời gian (tối thiểu 30 ngày):
          </div>
          <div className="flex items-center gap-3 mt-2">
            Từ ngày
            <DatePicker
              value={fromDate}
              onChange={handleFromDateChange}
              allowClear={false}
              format="DD/MM/YYYY"
              status={dateRangeError && 'error'}
            />
            đến ngày
            <DatePicker
              value={toDate}
              onChange={handleToDateChange}
              allowClear={false}
              format="DD/MM/YYYY"
              status={dateRangeError && 'error'}
            />
          </div>

          {dateRangeError && (
            <Alert
              type="error"
              message="Ngày bắt đầu phải nằm trước ngày kết thúc"
              className="my-3"
              showIcon
            />
          )}

          {/* <Line data={lineChartData} padding="auto" xField="" /> */}
        </div>
      </div>
    </div>
  );
}
