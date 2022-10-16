import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Button, notification, Form, Typography, Space, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import BaseModel from "../../models/base.model";
import useFetchAndLoad from '../../hooks/useFetchAndLoad';
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";

interface DataType {
  key: string;
}
type DataIndex = keyof DataType;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  Type: 'number' | 'text' | 'image' | 'boolean' | 'phone';
  record: BaseModel;
  index: number;
  children: React.ReactNode;
}

const TypeCell: React.FC<EditableCellProps> = ({
  dataIndex,
  title,
  Type,
  record,
  index,
  children,
  ...restProps
}) => {
  let custom = null;
  switch (Type) {
    case 'image':
      custom = (<img width={100} height={100} src={children.toString().substring(1, children.toString().length - 1)} alt="" />)
      break;
    case 'boolean':
      console.log(children[1]);

      custom = children[1] === true ? 'Si' : 'No'
      break;
    default:
      custom = children
      break;
  }

  return (
    <td {...restProps}>
      {custom ? custom : children}
    </td>
  );
};

let searchInput = null;

export default function BaseTable<T extends BaseModel>({ originData, columns, service = null, loading = false, actions = {}, addTitle = "add", onChange = null }: { originData: T[], service: any, columns: any[], loading: boolean, actions?: any, addTitle?: string, onChange }) {

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [editingKey, setEditingKey] = useState(-1);
  const [ToDelete, setToDelete] = useState<Partial<T> & { _id: React.Key }>();
  const { callEndpoint } = useFetchAndLoad();

  const isEditing = (record: T) => record._id === editingKey;


  const edit = (record: Partial<T> & { _id: React.Key }) => {
    actions.edit(record._id);
  };

  const view = (record: Partial<T> & { _id: React.Key }) => {
    actions.view(record._id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  useEffect(() => {
    setData(originData);
  }, [originData])

  const handleAdd = () => {
    actions.add();
  };

  const handleDelete = async (key: React.Key) => {
    const result = await callEndpoint(service.remove(key))

    if (result.status === 200) {
      const newData = [...data];
      const index = newData.findIndex((item: T) => key === item._id);
      newData.splice(index, 1);
      setData(newData);
      setIsModalVisible(false);
      notification["success"]({
        message: `${addTitle.split(" ")[1]} deleted`,
        description: `${addTitle.split(" ")[1]} was successfully deleted.`,
      });
    }
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: 'rgba(0,0,0,.85)', width: 15, height: 15 }} />
    ),
    onFilter: (value, record) => {

      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const remove = (record: Partial<T> & { _id: React.Key }) => {
    setToDelete(record)
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);


  const operation = {
    title: 'Operation',
    dataIndex: 'operation',
    width: '20%',
    render: (_: any, record: T) => {
      return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography.Link onClick={() => view(record)}>
          View
        </Typography.Link>


        <Typography.Link onClick={() => edit(record)}>
          Edit
        </Typography.Link>


        {actions.remove !== false && <Typography.Link id="deleteBtn" onClick={() => remove(record)}>
          Delete
        </Typography.Link>}

        <Modal
          visible={isModalVisible}
          okButtonProps={{ id: "delete" }}
          title={`Sure to delete ${addTitle.split(" ")[1]}?`}
          onCancel={handleCancel}
          onOk={() => handleDelete(ToDelete._id)}
        >
        </Modal>

      </div>
    },
  }
  const mergedColumns = (Object.keys(actions).length > 0 ? [...columns, operation] : columns).map(col => {
    let object = {
      ...col,
      onCell: (record: T) => ({
        record,
        Type: col.type || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
    if (col.searchable) {
      Object.assign(object, { ...getColumnSearchProps(col.dataIndex) });
    }
    return object;
  });

  return (
    <>

      {Object.keys(actions).length > 0 && <Button id={addTitle.split(' ').join('-')} onClick={handleAdd} type="primary" style={{ marginBottom: 16, display: 'flex' }}>
        {addTitle}
      </Button>}
      <Form form={form} component={false}>
        <Table
          loading={loading}
          onChange={onChange}
          components={{
            body: {
              cell: TypeCell,
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
}
