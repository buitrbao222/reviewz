import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import Image from 'components/common/Image';

export default function Avatar(props) {
  const { imgId, className, ...rest } = props;

  return (
    <Button
      {...rest}
      size="large"
      className={clsx(
        'flex items-center justify-center w-10 h-10 p-0',
        className
      )}
      type="ghost"
    >
      {imgId ? (
        <Image id={imgId} alt="avatar" className="w-full h-full" />
      ) : (
        <UserOutlined className="text-2xl leading-none" />
      )}
    </Button>
  );
}
