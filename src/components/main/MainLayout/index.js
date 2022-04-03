import { Button, Layout, Modal, Tabs } from 'antd';
import User from 'components/common/User';
import LoginForm from 'components/main/MainLayout/LoginForm';
import RegisterForm from 'components/main/MainLayout/RegisterForm';
import SearchBar from 'components/main/SearchBar';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/userStore';

const { Header, Content, Footer } = Layout;

const { TabPane } = Tabs;

export default function MainLayout() {
  const navigate = useNavigate();

  const [modalTab, setModalTab] = useState();

  const user = useUserStore(store => store.user);

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
          <SearchBar />

          {user ? (
            <User />
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
