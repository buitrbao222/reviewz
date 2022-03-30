import {
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, Menu, Modal, Tabs } from 'antd';
import Image from 'components/common/Image';
import LoginForm from 'components/main/LoginForm';
import ProfileDrawer from 'components/main/ProfileDrawer';
import RegisterForm from 'components/main/RegisterForm';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useStore from 'store/store';

const { Header, Content, Footer } = Layout;

const { Search } = Input;

const { TabPane } = Tabs;

export default function MainLayout() {
  const navigate = useNavigate();

  const [modalTab, setModalTab] = useState();

  const user = useStore(store => store.user);

  const logout = useStore(store => store.logout);

  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);

  function handleLogoClick() {
    navigate('/');
  }

  function handleLoginClick() {
    setModalTab('login');
  }

  function handleTabChange(activeKey) {
    setModalTab(activeKey);
  }

  function handleModalCancel() {
    setModalTab(undefined);
  }

  function handleProfileDrawerClose() {
    setProfileDrawerVisible(false);
  }

  function handleMenuClick(e) {
    switch (e.key) {
      case 'profile':
        setProfileDrawerVisible(true);
        break;

      case 'admin':
        // Go to admin page
        break;

      case 'logout':
        logout();
        break;

      // no default
    }
  }

  return (
    <Layout>
      <Header className="flex items-center">
        <Button
          onClick={handleLogoClick}
          className="flex items-center h-full text-3xl text-white cursor-pointer font-courgette"
          type="link"
        >
          Reviewz
        </Button>

        <div className="flex items-center justify-end flex-1 gap-8">
          <Search
            className="flex-1 max-w-md ml-8"
            placeholder="Tìm kiếm phim..."
            enterButton
            size="large"
          />

          {user ? (
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
                    <Image
                      id={user.img}
                      alt="avatar"
                      className="object-cover w-full h-full"
                    />
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
          ) : (
            <>
              <Button ghost onClick={handleLoginClick} size="large">
                Đăng nhập
              </Button>

              <Modal
                visible={modalTab !== undefined}
                className="login-register-modal"
                footer={null}
                onCancel={handleModalCancel}
              >
                <Tabs activeKey={modalTab} onChange={handleTabChange}>
                  <TabPane tab="Đăng nhập" key="login">
                    <LoginForm setModalTab={setModalTab} />
                  </TabPane>

                  <TabPane tab="Đăng ký" key="register">
                    <RegisterForm setModalTab={setModalTab} />
                  </TabPane>
                </Tabs>
              </Modal>
            </>
          )}
        </div>
      </Header>

      <Content className="px-[50px]">
        <Outlet />
      </Content>

      <Footer className="text-center">Reviewz ©2022</Footer>
    </Layout>
  );
}
