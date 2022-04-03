import { notification } from 'antd';

export default function errorNotification(error) {
  notification.error({
    message: 'Đã có lỗi xảy ra',
    description: error.message,
  });
}
