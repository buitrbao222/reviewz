import { Layout } from 'antd';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

export default function ReviewzFooter(props) {
  const { className } = props;

  const location = useLocation();

  const inAdmin = location.pathname.includes('admin');

  return (
    <Layout.Footer
      className={clsx(
        'text-center',
        inAdmin ? 'text-dark bg-white' : 'text-white bg-dark',
        className
      )}
    >
      Reviewz ©2022
    </Layout.Footer>
  );
}
