import { Link, NavLink } from "react-router-dom";
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined,LoginOutlined,AliwangwangOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
const Header = () => {
    const [current, setCurrent] = useState('home');

    const {user} = useContext(AuthContext);
    console.log(">>> check data:", user);
    

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
        ...(!user.id ? [{
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: 'login',
          icon: <LoginOutlined />
        }] : [])
        ,
        ...(user.id ? [{
          label: `Wellcome ${user.fullName}`,
          key: 'setting',
          icon: <AliwangwangOutlined />,
          children: [
            {
              label: <Link to={"/logout"}>Đăng xuất</Link>, key: "logout"
            },
          ],
        }] : [])  
        ,

      ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header;