import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export default function confirmModal(props) {
  const { onOk, title, danger = true } = props;

  Modal.confirm({
    title: title,
    icon: <QuestionCircleOutlined />,
    onOk: onOk,
    okText: 'Có',
    okType: 'primary',
    okButtonProps: {
      danger,
    },
    cancelText: 'Không',
  });
}
