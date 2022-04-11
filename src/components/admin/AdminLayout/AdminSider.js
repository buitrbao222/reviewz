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

        <Menu.Item key="/admin/users" icon={<FaUserAlt />}>
          <Link to="/admin/user">Người dùng</Link>
        </Menu.Item>

        <Menu.Item key="/admin/genres" icon={<FaTag />}>
          <Link to="/admin/genres">Thể loại</Link>
        </Menu.Item>

        <Menu.Item key="/admin/movies" icon={<FaFilm />}>
          <Link to="/admin/movies">Phim</Link>
        </Menu.Item>

        <Menu.Item key="/admin/reviews" icon={<FaComments />}>
          <Link to="/admin/reviews">Đánh giá</Link>
        </Menu.Item>

        <Menu.Item key="/admin/directors" icon={<FaUserTie />}>
          <Link to="/admin/directors">Đạo diễn</Link>
        </Menu.Item>

        <Menu.Item key="/admin/actors" icon={<FaTheaterMasks />}>
          <Link to="/admin/actors">Diễn viên</Link>
        </Menu.Item>

        <Menu.Item key="/admin/requests" icon={<FaCommentMedical />}>
          <Link to="/admin/requests">Yêu cầu</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
