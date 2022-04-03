import { Layout } from 'antd';
import AdminSider from 'components/admin/AdminLayout/AdminSider';
import ReviewzFooter from 'components/common/ReviewzFooter';
import User from 'components/common/User';
import { useState } from 'react';
import { FaIndent, FaOutdent } from 'react-icons/fa';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

export default function AdminLayout() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const CollapseButton = collapsed ? FaIndent : FaOutdent;

  function toggleCollapse() {
    setCollapsed(x => !x);
  }

  if (location.pathname.endsWith('admin')) {
    return <Navigate to="/admin/user" />;
  }

  return (
    <Layout>
      <AdminSider collapsed={collapsed} />

      <Layout>
        <Header className="flex items-center justify-between px-4 bg-white">
          <CollapseButton
            className="text-lg transition-all duration-300 cursor-pointer text-dark hover:text-primary-hover"
            onClick={toggleCollapse}
          />

          <User />
        </Header>

        <Content className="m-4">
          <Outlet />
        </Content>

        <ReviewzFooter />
      </Layout>
    </Layout>
  );
}
