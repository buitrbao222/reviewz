import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export default function confirmDeleteModal(props) {
  const { onOk, title } = props;

  Modal.confirm({
    title: title,
    icon: <QuestionCircleOutlined />,
    onOk: onOk,
    okText: 'Có',
    okType: 'primary',
    okButtonProps: {
      danger: true,
    },
    cancelText: 'Không',
  });
}
