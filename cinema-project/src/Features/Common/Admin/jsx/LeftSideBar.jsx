import React, { useState } from "react";
import {
  PlayCircleOutlined,
  MailOutlined,
  AreaChartOutlined,
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
  { path: "/dashboard/manage/showtimes", name: "QL suất chiếu" },
  { path: "/dashboard/manage/statistics/film", name: "Thống kê phim" },
  { path: "/dashboard/manage/statistics/customer", name: "Thống kê thành viên" },
  { path: "/dashboard/manage/statistics/filmtype", name: "Thống kê thể loại phim" },
  { path: "/dashboard/manage/statistics/showtime", name: "Thống kê suất chiếu" },
];


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
    icon: <PlayCircleOutlined />,
    label: "QL phim",
  },
  {
    key: "QL suất chiếu",
    icon: <ContainerOutlined />,
    label: "QL suất chiếu",
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
  },
  {
    key: 'Thống kê',
    label: 'Thống kê',
    icon: <AreaChartOutlined />,
    children: [
      { key: 'Thống kê phim', label: 'Thống kê phim' },
      { key: 'Thống kê thành viên', label: 'Thống kê thành viên' },
      { key: 'Thống kê thể loại phim', label: 'Thống kê thể loại phim' },
    ],
  }
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
