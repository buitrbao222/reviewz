import { Button, Input, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const { Search } = Input;

export default function MainLayout() {
  const navigate = useNavigate();

  function goToHome() {
    navigate('/');
  }

  return (
    <Layout>
      <Header className="flex items-center justify-between">
        <div
          onClick={goToHome}
          className="flex items-center h-full text-3xl text-white cursor-pointer font-courgette"
        >
          Reviewz
        </div>

        <div className="flex">
          <Search className="max-w-xs ml-8" />

          <Button ghost className="w-24">
            Đăng ký
          </Button>

          <Button ghost>Đăng nhập</Button>
        </div>
      </Header>

      <Content className="px-[50px]">
        <Outlet />
      </Content>

      <Footer className="text-center">Reviewz ©2022</Footer>
    </Layout>
  );
}
