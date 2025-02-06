import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const maps = [
  { path: "/dashboard/manage/employees", name: "QL nhân viên" },
  { path: "/dashboard/manage/customers", name: "QL khách hàng" },
  { path: "/dashboard/manage/films", name: "QL phim" },
  { path: "/dashboard/manage/tickets", name: "QL vé" },
  { path: "/dashboard/manage/cinemas", name: "QL rạp" },
  { path: "/dashboard/manage/cinema/create", name: "Tạo rạp chiếu" },
];

// const items = [
//   {
//     key: "1",
//     icon: <MailOutlined />,
//     label: "Quản lý Nhân viên",
//     children: [
//       { key: "11", label: "Danh sách Nhân viên" },
//       { key: "12", label: "Thêm Nhân viên" },
//     ],
//   },
//   {
//     key: "2",
//     icon: <AppstoreOutlined />,
//     label: "Quản lý Khách hàng",
//     children: [
//       { key: "21", label: "Danh sách Khách hàng" },
//       { key: "22", label: "Thêm Khách hàng" },
//       {
//         key: "23",
//         label: "Cài đặt",
//         children: [
//           { key: "231", label: "Quyền truy cập" },
//           { key: "232", label: "Báo cáo" },
//         ],
//       },
//     ],
//   },
//   {
//     key: "3",
//     icon: <SettingOutlined />,
//     label: "Cài đặt Hệ thống",
//     children: [
//       { key: "31", label: "Cấu hình chung" },
//       { key: "32", label: "Bảo mật" },
//     ],
//   },
// ];

const items = [
  {
    key: "QL nhân viên",
    icon: <PieChartOutlined />,
    label: "QL nhân viên",
  },
  {
    key: "QL khách hàng",
    icon: <DesktopOutlined />,
    label: "QL khách hàng",
  },
  {
    key: "QL phim",
    icon: <ContainerOutlined />,
    label: "QL phim",
  },
  {
    key: "QL vé",
    icon: <MailOutlined />,
    label: "QL vé",
  },
  {
    key: "QL rạp",
    label: "QL rạp",
    icon: <MailOutlined />,
    children: [
      { key: "Tạo rạp chiếu", label: "Tạo rạp chiếu" },
      { key: "Option 6", label: "Option 6" },
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

const LeftSideBar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const navigate = useNavigate();

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const handleClick = (e) => {
    const selectedPath = maps.find((item) => item.name === e.key)?.path;
    if (selectedPath) {
      navigate(selectedPath);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={handleClick}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default LeftSideBar;
