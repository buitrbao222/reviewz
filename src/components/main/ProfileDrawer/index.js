import { UserOutlined } from '@ant-design/icons';
import { Divider, Drawer } from 'antd';
import Image from 'components/common/Image';
import ChangeAvatar from 'components/main/ProfileDrawer/ChangeAvatar';
import ChangePassword from 'components/main/ProfileDrawer/ChangePassword';
import ChangeUsername from 'components/main/ProfileDrawer/ChangeUsername';
import useUserStore from 'store/userStore';

export default function ProfileDrawer(props) {
  const { visible, onClose } = props;

  const user = useUserStore(store => store.user);
  return (
    <Drawer title="Thông tin cá nhân" onClose={onClose} visible={visible}>
      <div className="flex flex-col">
        <div className="mb-2 text-2xl text-center">{user.name}</div>

        {user.img ? (
          <Image id={user.img} alt="avatar" className="w-full aspect-square" />
        ) : (
          <div className="flex items-center justify-center w-full bg-dark aspect-square">
            <UserOutlined className="leading-none text-white w-[70%] h-[70%] svg-full" />
          </div>
        )}
      </div>

      <Divider />

      <div className="flex flex-col gap-4">
        <ChangeUsername />

        <ChangePassword />

        <ChangeAvatar />
      </div>
    </Drawer>
  );
}
