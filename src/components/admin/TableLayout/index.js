import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import { useState } from 'react';

export default function TableLayout(props) {
  const {
    columns,
    dataSource,
    onRefreshClick,
    onAddClick,
    onDeleteConfirm,
    onEditClick,
    loading,
    getRowKey = row => row.id,
    extraButtons = [],
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const deleteDisabled = selectedRowKeys.length === 0;

  const editDisabled = selectedRowKeys.length !== 1;

  function handleDeleteConfirm() {
    onDeleteConfirm(selectedRowKeys, selectedRows);
  }

  function handleSelectChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button icon={<ReloadOutlined />} onClick={onRefreshClick}>
          Tải lại
        </Button>

        {onAddClick && (
          <Button icon={<PlusOutlined />} onClick={onAddClick}>
            Thêm
          </Button>
        )}

        {onDeleteConfirm && (
          <Popconfirm
            title="Bạn có chắc là muốn xóa?"
            okText="Có"
            cancelText="Không"
            onConfirm={handleDeleteConfirm}
            disabled={deleteDisabled}
          >
            <Button icon={<DeleteOutlined />} disabled={deleteDisabled}>
              Xóa
            </Button>
          </Popconfirm>
        )}

        {onEditClick && (
          <Button onClick={onEditClick} disabled={editDisabled}>
            Sửa
          </Button>
        )}

        {extraButtons}
      </div>

      <Table
        rowKey={getRowKey}
        loading={loading}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectChange,
          selectedRowKeys,
        }}
        pagination={false}
      />
    </div>
  );
}
