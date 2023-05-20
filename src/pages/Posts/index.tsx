import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  message,
  notification,
  Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { PostForm } from "./../../components/PostForm";

type DataType = any;

export const Posts = () => {
  const [posts, setPosts] = useState<DataType[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditing, currrentEditing] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [notifyApi, notifyContextHolder] = notification.useNotification();

  const columns: ColumnsType<DataType> = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{userId}</span>,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, row) => <Link to={`/posts/${row.id}`}>{title}</Link>,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (body) => <span>{body}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <span>
          <Button type="dashed" size="small" onClick={() => showModal(row)}>
            Edit <EditOutlined />
          </Button>

          <Popconfirm
            title="Ban co muon xoa bai viet nay"
            description={<span>{row.title}</span>}
            onCancel={() => onCancleDelete(row)}
            onConfirm={() => onConfirmDelete(row)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed" size="small" danger>
              Delete <DeleteOutlined />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const onCancleDelete = (row: any) => {};

  const onConfirmDelete = (row: any) => {
    const newPosts = posts.filter((p: any) => p.id !== row.id);
    setPosts(newPosts);
    messageApi.success("Da xoa ban ghi thanh cong");
    notifyApi.success({
      message: "Da xoa thanh cong",
      description: row.title,
    });
  };

  const fetchPosts = (page: number = 1, size: number = pageSize) => {
    // offset = ?, limit = pageSize
    const offset = Math.max(page - 1, 0) * pageSize;

    setLoading(true);

    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${pageSize}`
      )
      .then((response) => {
        setPosts(response.data);
        // set total
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const paging = (page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
    fetchPosts(page, size);
  };

  const showModal = (row: any) => {
    currrentEditing(row);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      {contextHolder}
      {notifyContextHolder}

      <Table
        columns={columns}
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={{
          current,
          pageSize,
          disabled: false,
          pageSizeOptions: [1, 2, 10, 15, 50],
          total: 100,
          onChange: paging,
        }}
      />

      <Modal
        title="Edit post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {currentEditing && <PostForm initialValues={currentEditing} />}
      </Modal>
    </div>
  );
};
