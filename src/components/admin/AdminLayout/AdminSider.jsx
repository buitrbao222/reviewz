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
  FaChartLine,
  FaHashtag,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

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
        <Menu.Item key="dashboard" icon={<FaChartLine />}>
          <Link to="/admin/dashboard">Thống kê</Link>
        </Menu.Item>

        <Menu.Item key="user" icon={<FaUserAlt />}>
          <Link to="/admin/user">Người dùng</Link>
        </Menu.Item>

        <Menu.Item key="genre" icon={<FaTag />}>
          <Link to="/admin/genre">Thể loại</Link>
        </Menu.Item>

        <Menu.Item key="movie" icon={<FaFilm />}>
          <Link to="/admin/movie">Phim</Link>
        </Menu.Item>

        <Menu.Item key="hashtag" icon={<FaHashtag />}>
          <Link to="/admin/hashtag">Hashtag</Link>
        </Menu.Item>

        <Menu.Item key="review" icon={<FaComments />}>
          <Link to="/admin/review">Đánh giá</Link>
        </Menu.Item>

        <Menu.Item key="director" icon={<FaUserTie />}>
          <Link to="/admin/director">Đạo diễn</Link>
        </Menu.Item>

        <Menu.Item key="actor" icon={<FaTheaterMasks />}>
          <Link to="/admin/actor">Diễn viên</Link>
        </Menu.Item>

        <Menu.Item key="request" icon={<FaCommentMedical />}>
          <Link to="/admin/request">Yêu cầu</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
