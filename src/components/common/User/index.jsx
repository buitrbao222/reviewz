import {
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Avatar from 'components/common/Avatar';
import ProfileDrawer from 'components/common/ProfileDrawer';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'store/userStore';

export default function User() {
  const navigate = useNavigate();

  const location = useLocation();

  const user = useUserStore(store => store.user);

  const logout = useUserStore(store => store.logout);

  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);

  const inAdmin = location.pathname.startsWith('/admin');

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

      case 'home':
        navigate('/');
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

            {inAdmin ? (
              <Menu.Item key="home">
                <HomeOutlined />
                Về trang chủ
              </Menu.Item>
            ) : (
              <Menu.Item key="admin">
                <SettingOutlined />
                Quản lý
              </Menu.Item>
            )}

            <Menu.Item key="logout">
              <LogoutOutlined />
              Đăng xuất
            </Menu.Item>
          </Menu>
        }
      >
        <Avatar imgId={user?.img} className={inAdmin && 'in-admin'} />
      </Dropdown>

      <ProfileDrawer
        visible={profileDrawerVisible}
        onClose={handleProfileDrawerClose}
      />
    </>
  );
}
