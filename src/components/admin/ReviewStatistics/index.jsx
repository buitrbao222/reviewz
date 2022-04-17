import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, DatePicker } from 'antd';
import axios from 'axios';
import 'chart.js/auto';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import notifyError from 'utils/notifyError';

const initialLineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: function (context) {
          const count = context.raw.y;
          return `${count} lượt đánh giá`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
      beginAtZero: true,
    },
    x: {
      type: 'time',
      time: {
        displayFormats: {
          day: 'DD/MM/YY',
          week: 'DD/MM/YY',
          month: 'MM/YY',
          year: 'YYYY',
        },
        parser: 'DD/MM/YYYY',
        tooltipFormat: 'DD/MM/YYYY',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'nearest',
    axis: 'x',
  },
};

const datasetOptions = {
  borderColor: '#1890ff',
  pointBackgroundColor: '#1890ff',
  tension: 0.3,
};

export default function ReviewStatistics() {
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState();

  const [fromDate, setFromDate] = useState(moment().startOf('month'));

  const [toDate, setToDate] = useState(moment().endOf('month'));

  const [dateRangeError, setDateRangeError] = useState();

  const [lineChartData, setLineChartData] = useState([]);

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
    const daysDiff = toDate.diff(fromDate, 'days') + 1;

    let data = {};
    for (let i = 0; i < daysDiff; i++) {
      const day = moment(fromDate).add(i, 'days').format('DD/MM/YYYY');
      data[day] = 0;
    }

    reviews.forEach(review => {
      if (!moment(review).isBetween(fromDate, toDate)) {
        return;
      }

      const day = moment(review).format('DD/MM/YYYY');

      data[day]++;
    });

    data = Object.entries(data).map(([date, count]) => ({ x: date, y: count }));

    setLineChartData(data);
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

          <Line
            options={initialLineChartOptions}
            data={{
              datasets: [
                {
                  data: lineChartData,
                  ...datasetOptions,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
