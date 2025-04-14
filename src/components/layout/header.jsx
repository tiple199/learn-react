import { Link, NavLink } from "react-router-dom";
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from "react";
const Header = () => {
    const [current, setCurrent] = useState('home');
    const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
    const items = [
        {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/users"}>Users</Link>,
          key: 'users',
          icon: <UsergroupAddOutlined />
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'books',
          icon: <AuditOutlined />
         
        },
        {
          label: 'Cài đặt',
          key: 'setting',
          icon: <SettingOutlined />,
          children: [
            {
              label: <Link to={"/login"}>Đăng nhập</Link>, key: "login"
            },
            {
              label: <Link to={"/register"}>Đăng Ký</Link>, key: "register"
            },
          ],
        }
      ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header;