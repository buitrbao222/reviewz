import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import {
  FaCommentMedical,
  FaComments,
  FaFilm,
  FaTag,
  FaTheaterMasks,
  FaUserAlt,
  FaUserTie,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const { SubMenu } = Menu;

export default function AdminSider(props) {
  const { collapsed } = props;

  const location = useLocation();

  const selectedKeys = useMemo(
    () => location.pathname.replace('/admin/', '').split('/'),
    [location]
  );

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
        defaultOpenKeys={selectedKeys}
        selectedKeys={selectedKeys}
        className="in-admin"
      >
        {/* <Menu.Item key="/admin/dashboard" icon={<FaTag />}>
          <Link to="/admin/dashboard">Thống kê</Link>
        </Menu.Item> */}

        <Menu.Item key="users" icon={<FaUserAlt />}>
          <Link to="/admin/users">Người dùng</Link>
        </Menu.Item>

        <Menu.Item key="genres" icon={<FaTag />}>
          <Link to="/admin/genres">Thể loại</Link>
        </Menu.Item>

        <SubMenu key="movie" icon={<FaFilm />} title="Phim">
          <Menu.Item key="list">
            <Link to="/admin/movie/list">Danh sách phim</Link>
          </Menu.Item>

          <Menu.Item key="create">
            <Link to="/admin/movie/create">Thêm phim</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="reviews" icon={<FaComments />}>
          <Link to="/admin/reviews">Đánh giá</Link>
        </Menu.Item>

        <Menu.Item key="directors" icon={<FaUserTie />}>
          <Link to="/admin/directors">Đạo diễn</Link>
        </Menu.Item>

        <Menu.Item key="actors" icon={<FaTheaterMasks />}>
          <Link to="/admin/actors">Diễn viên</Link>
        </Menu.Item>

        <Menu.Item key="requests" icon={<FaCommentMedical />}>
          <Link to="/admin/requests">Yêu cầu</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
