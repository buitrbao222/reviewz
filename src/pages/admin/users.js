import { Popconfirm, Switch, Tooltip } from 'antd';
import axios from 'axios';
import TableLayout from 'components/admin/TableLayout';
import { USER_ROLES } from 'configs/constants';
import { useEffect, useMemo, useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';
import isAdmin from 'utils/isAdmin';

export default function UsersPage() {
  const user = useUserStore(store => store.user);

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        filterSearch: true,
        filterMode: 'menu',
        onFilter: (value, record) => record.username.includes(value),
      },
      {
        title: 'Quyền quản trị',
        dataIndex: 'roles',
        render: (roles, record, index) => {
          if (record.id === user.id) {
            return (
              <Tooltip title="Bạn không thể tự chỉnh sửa quyền quản trị của chính mình">
                <Switch checked disabled />
              </Tooltip>
            );
          }

          const checked = isAdmin(record);

          return (
            <Popconfirm
              title={`Bạn có chắc là muốn ${
                checked
                  ? 'thu hồi quyền quản trị của tài khoản này?'
                  : 'cấp quyền quản trị cho tài khoản này?'
              }`}
              onConfirm={() => handleRoleSwitchConfirm(roles, record, index)}
              okText="Có"
              cancelText="Không"
            >
              <Switch checked={checked} />
            </Popconfirm>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    try {
      const response = await axios.get('/user');

      console.log('Get users response', response);

      setDataSource(response);
    } catch (error) {
      console.log('Get users error', error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleSwitchConfirm(roles, record, index) {
    setLoading(true);

    try {
      const response = await axios.put(`/user/${record.id}`, {
        role: isAdmin(record) ? USER_ROLES.USER : USER_ROLES.ADMIN,
      });

      console.log('Change role response', response);

      loadData();
    } catch (error) {
      console.log('Change role error', error);
      setLoading(false);
      notifyError(error);
    }
  }

  function handleAddClick() {}

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        onRefreshClick={loadData}
        onAddClick={handleAddClick}
        loading={loading}
        getRowKey={x => x.id}
      />
    </div>
  );
}
