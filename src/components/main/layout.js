import { Button, Input, Layout, Modal, Tabs } from 'antd';
import LoginForm from 'components/main/LoginForm';
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
      <Header className="flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex items-center h-full text-3xl text-white cursor-pointer font-courgette"
        >
          Reviewz
        </div>

        <div className="flex gap-4">
          <Search className="max-w-xs ml-8" placeholder="Tìm kiếm phim..." />

          {user ? (
            <div>user</div>
          ) : (
            <>
              <Button ghost onClick={handleLoginClick}>
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
