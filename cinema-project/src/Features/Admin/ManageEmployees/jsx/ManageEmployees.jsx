import React, { useState } from "react";
import { Space, Table, Tag, Input, Button } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import CreateEmployee from "./CreateEmployee";
const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const items = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  ];


const ManageEmployees = () => {
  const [currentPage, setCurrentPage] = useState(4);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(18);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const { updateItems } = useCommonFunctions();
  const data = updateItems(items, pageSize, currentPage, totalItems);

  const changePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  }

  const handleCreateEmployee = (values) => {
    console.log(values, "values");
  }


  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <div>
          <Search
            placeholder="input search..."
            allowClear
            onSearch={() => {}}
            style={{
              width: 200,
              marginRight: "10px",
            }}
          />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdPersonAdd fontSize={16} />
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateEmployee open={isOpenCreate} onClose={() => setIsOpenCreate(false)} onCreate={(values) => handleCreateEmployee(values)} />
    </section>
  );
};

export default ManageEmployees;
