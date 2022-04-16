import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Radio, Table } from 'antd';
import { useMemo } from 'react';
import confirmDeleteModal from 'utils/confirmDeleteModal';

export default function TableLayout(props) {
  const {
    columns,
    dataSource,
    onRefetch,
    onCreate,
    onDelete,
    onEdit,
    loading,
    selectedRow,
    setSelectedRow,
    rowKey,
    selectable = true,
    customButtons,
  } = props;

  const selectedRowKeys = useMemo(
    () => (selectedRow ? [getRowKey(selectedRow)] : []),
    [selectedRow]
  );

  function getRowKey(row) {
    if (typeof rowKey === 'string') {
      return row[rowKey];
    }

    return rowKey(row);
  }

  function renderRadioCell(checked, record) {
    return (
      <Radio
        checked={checked}
        onClick={() => {
          if (checked) {
            setSelectedRow(undefined);
          } else {
            setSelectedRow(record);
          }
        }}
      />
    );
  }

  function handleDeleteClick() {
    confirmDeleteModal({
      title: 'Bạn có chắc là muốn xóa?',
      onOk: onDelete,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button icon={<ReloadOutlined />} onClick={onRefetch}>
          Tải lại
        </Button>

        {onCreate && (
          <Button icon={<PlusOutlined />} onClick={onCreate}>
            Thêm
          </Button>
        )}

        {onDelete && (
          <Button
            icon={<DeleteOutlined />}
            disabled={!selectedRow}
            onClick={handleDeleteClick}
          >
            Xóa
          </Button>
        )}

        {onEdit && (
          <Button
            icon={<EditOutlined />}
            onClick={onEdit}
            disabled={!selectedRow}
          >
            Sửa
          </Button>
        )}

        {customButtons?.(selectedRow)}
      </div>

      <Table
        rowKey={rowKey}
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
