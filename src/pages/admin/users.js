import { Popconfirm, Switch, Tooltip } from 'antd';
import axios from 'axios';
import CreateUserModal from 'components/admin/CreateUserModal';
import TableLayout from 'components/admin/TableLayout';
import { USER_ROLES } from 'configs/constants';
import { useEffect, useMemo, useState } from 'react';
import useUserStore from 'store/userStore';
import isAdmin from 'utils/isAdmin';
import notifyError from 'utils/notifyError';

export default function UsersPage() {
  const user = useUserStore(store => store.user);

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const columns = useMemo(
    () => [
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
      },
      {
        title: 'Quyền quản trị',
        dataIndex: 'roles',
        render: (roles, record, index) => {
          if (record.id === user.id) {
            return (
              <Tooltip title="Bạn không thể chỉnh sửa quyền quản trị của chính mình">
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
              onConfirm={() => handleRoleSwitchConfirm(record)}
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
    getUsers();
  }, []);

  async function getUsers() {
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

  async function handleRoleSwitchConfirm(user) {
    setLoading(true);

    try {
      const response = await axios.put(`/user/${user.id}`, {
        role: isAdmin(user) ? USER_ROLES.USER : USER_ROLES.ADMIN,
      });

      console.log('Change role response', response);

      getUsers();
    } catch (error) {
      console.log('Change role error', error);
      setLoading(false);
      notifyError(error);
    }
  }

  function handleAddClick() {
    setCreateModalVisible(true);
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        onRefreshClick={getUsers}
        onAddClick={handleAddClick}
        loading={loading}
        selectable={false}
      />

      <CreateUserModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        refetch={getUsers}
      />
    </div>
  );
}
