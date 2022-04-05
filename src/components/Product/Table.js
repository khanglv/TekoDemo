import { useEffect, useState } from "react";
import { Table, Input, Select, Popconfirm, Form, Typography, Tooltip } from 'antd';

const { Option } = Select;
const originData = [];

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'select' ? 
    <Select value={record.color} style={{ width: '100%' }} allowClear>
        {
            restProps.dataselect.map((item)=>{
                return <Option style={{color: `${item.name}`}} key={item.id} value={item.id}>
                    <Tooltip title={item.name} placement="left">
                        {item.name}
                    </Tooltip>
                </Option>
            })
        }
    </Select>
    : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: inputType === 'select' ? false : true,
                            message: `Please Input ${title}!`,
                        },
                        { type: inputType === 'select' ? 'number' : 'string', max: dataIndex === 'name' ? 50 : (dataIndex === 'sku' ? 20 : null)}
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TableReUp = (props) => {
    const {
        products = [],
        colors = [],
        updateNewData = ()=>{}
    } = props;

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    useEffect(()=>{
        setData(products);
    }, [products])

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            sku: '',
            color: null,
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
                if(JSON.stringify(newData[index]) !== JSON.stringify(products[index])){
                    updateNewData(newData[index], 'push')
                }else{
                    updateNewData(newData[index], 'pop')
                }
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Error Description',
            dataIndex: 'errorDescription',
        },
        {
            title: 'Product Image',
            dataIndex: 'image',
            align: 'center',
            render: (url, record)=>{
                return url && <img width={100} alt="" src={url}/>
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            editable: true,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            editable: true,
            render: (id, record)=>{
                let color = '';
                if(id && colors){
                    color = colors.find(item => item.id === id)?.name;
                }
                return  color && <span style={{color: id === 1 ? 'black' : color}}>{color}</span>
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'color' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                dataselect: col.dataIndex === 'color' ? colors : undefined
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowKey="id"
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default TableReUp;