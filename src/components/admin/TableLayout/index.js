import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Radio, Table } from 'antd';
import { useState } from 'react';
import confirmDeleteModal from 'utils/confirmDeleteModal';

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
    selectable = true,
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const deleteDisabled = selectedRowKeys.length === 0;

  const editDisabled = selectedRowKeys.length === 0;

  function renderRadioCell(checked, record) {
    return (
      <Radio
        checked={checked}
        onClick={() => {
          if (checked) {
            setSelectedRows([]);
            setSelectedRowKeys([]);
          } else {
            setSelectedRows([record]);
            setSelectedRowKeys([getRowKey(record)]);
          }
        }}
      />
    );
  }

  function handleDeleteClick() {
    confirmDeleteModal({
      title: 'Bạn có chắc là muốn xóa?',
      onOk: async function () {
        await onDeleteConfirm(selectedRowKeys, selectedRows);
      },
    });
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
          <Button
            icon={<DeleteOutlined />}
            disabled={deleteDisabled}
            onClick={handleDeleteClick}
          >
            Xóa
          </Button>
        )}

        {onEditClick && (
          <Button onClick={onEditClick} disabled={editDisabled}>
            Sửa
          </Button>
        )}
      </div>

      <Table
        rowKey={getRowKey}
        loading={loading}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowSelection={
          selectable
            ? {
                type: 'radio',
                selectedRowKeys,
                renderCell: renderRadioCell,
              }
            : undefined
        }
        pagination={false}
      />
    </div>
  );
}
