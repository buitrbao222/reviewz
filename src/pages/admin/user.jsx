import { Popconfirm, Switch, Tooltip } from 'antd';
import axios from 'axios';
import CreateUserModal from 'components/admin/CreateUserModal';
import TableLayout from 'components/admin/TableLayout';
import { USER_ROLES } from 'configs/constants';
import { useEffect, useMemo, useState } from 'react';
import useUserStore from 'store/userStore';
import isAdmin from 'utils/isAdmin';
import notifyError from 'utils/notifyError';

export default function AdminUserPage() {
  const user = useUserStore(store => store.user);

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(true);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState();

  const columns = useMemo(
    () => [
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
      },
      {
        title: 'Quyền quản trị',
        dataIndex: 'roles',
        render: (roles, row, index) => {
          if (row.id === user.id) {
            return (
              <Tooltip title="Bạn không thể chỉnh sửa quyền quản trị của chính mình">
                <Switch checked disabled />
              </Tooltip>
            );
          }

          const checked = isAdmin(row);

          return (
            <Popconfirm
              title={`Bạn có chắc là muốn ${
                checked
                  ? 'thu hồi quyền quản trị của tài khoản này?'
                  : 'cấp quyền quản trị cho tài khoản này?'
              }`}
              onConfirm={() => handleRoleSwitch(row)}
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
      setDataSource(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleSwitch(user) {
    setLoading(true);

    try {
      await axios.put(`/user/${user.id}`, {
        role: isAdmin(user) ? USER_ROLES.USER : USER_ROLES.ADMIN,
      });

      loadData();
    } catch (error) {
      setLoading(false);
      notifyError(error);
    }
  }

  function handleCreate() {
    setCreateModalVisible(true);
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        dataSource={dataSource}
        onRefetch={loadData}
        onCreate={handleCreate}
        loading={loading}
        selectable={false}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        rowKey="id"
      />

      <CreateUserModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        refetch={loadData}
      />
    </div>
  );
}
