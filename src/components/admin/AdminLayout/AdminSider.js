import { Layout, Menu } from 'antd';
import {
  FaTag,
  FaUserAlt,
  FaFilm,
  FaComments,
  FaUserTie,
  FaTheaterMasks,
  FaCommentMedical,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

export default function AdminSider(props) {
  const { collapsed } = props;

  const location = useLocation();

  return (
    <Sider
      className="sticky top-0 bottom-0 left-0 h-screen overflow-auto"
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <Link
        className="flex items-center justify-center h-16 text-3xl text-white cursor-pointer font-courgette"
        to="/"
      >
        {collapsed ? 'R' : 'Reviewz'}
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={['/admin/dashboard']}
        className="in-admin"
      >
        {/* <Menu.Item key="/admin/dashboard" icon={<FaTag />}>
          <Link to="/admin/dashboard">Thống kê</Link>
        </Menu.Item> */}

        <Menu.Item key="/admin/user" icon={<FaUserAlt />}>
          <Link to="/admin/user">Người dùng</Link>
        </Menu.Item>

        <Menu.Item key="/admin/category" icon={<FaTag />}>
          <Link to="/admin/category">Thể loại</Link>
        </Menu.Item>

        <Menu.Item key="/admin/movie" icon={<FaFilm />}>
          <Link to="/admin/movie">Phim</Link>
        </Menu.Item>

        <Menu.Item key="/admin/review" icon={<FaComments />}>
          <Link to="/admin/review">Đánh giá</Link>
        </Menu.Item>

        <Menu.Item key="/admin/director" icon={<FaUserTie />}>
          <Link to="/admin/director">Đạo diễn</Link>
        </Menu.Item>

        <Menu.Item key="/admin/actor" icon={<FaTheaterMasks />}>
          <Link to="/admin/actor">Diễn viên</Link>
        </Menu.Item>

        <Menu.Item key="/admin/request" icon={<FaCommentMedical />}>
          <Link to="/admin/request">Yêu cầu</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
