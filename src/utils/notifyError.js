import { notification } from 'antd';

export default function notifyError(error) {
  notification.error({
    message: 'Đã có lỗi xảy ra',
    description: error.message,
  });
}
