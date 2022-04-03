import {
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Image from 'components/common/Image';
import ProfileDrawer from 'components/common/ProfileDrawer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/userStore';

export default function User() {
  const navigate = useNavigate();

  const user = useUserStore(store => store.user);

  const logout = useUserStore(store => store.logout);

  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);

  function handleMenuClick(e) {
    switch (e.key) {
      case 'profile':
        setProfileDrawerVisible(true);
        break;

      case 'admin':
        navigate('/admin');
        break;

      case 'logout':
        logout();
        break;

      // no default
    }
  }

  function handleProfileDrawerClose() {
    setProfileDrawerVisible(false);
  }

  return (
    <>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile">
              <InfoCircleOutlined />
              Thông tin cá nhân
            </Menu.Item>

            <Menu.Item key="admin">
              <SettingOutlined />
              Quản lý
            </Menu.Item>

            <Menu.Item key="logout">
              <LogoutOutlined />
              Đăng xuất
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          size="large"
          className="flex items-center justify-center w-10 h-10 p-0"
          ghost
        >
          {user.img ? (
            <Image id={user.img} alt="avatar" className="w-full h-full" />
          ) : (
            <UserOutlined className="text-2xl leading-none" />
          )}
        </Button>
      </Dropdown>

      <ProfileDrawer
        visible={profileDrawerVisible}
        onClose={handleProfileDrawerClose}
      />
    </>
  );
}
