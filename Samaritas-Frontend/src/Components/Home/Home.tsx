import React, { useEffect, useState } from 'react';
import {
  UserSwitchOutlined,
  MenuOutlined,
  UserOutlined,
  SolutionOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import appLogo from '../../assets/Samaritas-logo.png';
import { jwtDecode } from 'jwt-decode';
const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const user: any = localStorage.getItem('authToken');
    if (!user) {
      navigate('/');
    } else {
      const parsedUser = JSON.parse(user);
      const decodedToken: any = jwtDecode(user);
      console.log(decodedToken, '36');
      setRole(decodedToken.role);
      setUsername(decodedToken.firstName+' '+decodedToken.lastName);
    }
  }, [navigate]);

  const agentItems = [
    { key: '1', icon: <UserOutlined />, label: 'Client Catalog', path: '/home/refugee-list' },
    { key: '4', icon: <MessageOutlined />, label: 'Broadcast Service', path: '/home/broadcast' },
  ];

  const adminItems = [
    { key: '1', icon: <UserOutlined />, label: 'Client Catalog', path: '/home/refugee-list' },
    { key: '2', icon: <SolutionOutlined />, label: 'Case Agent List', path: '/home/caseAgent-list' },
    { key: '3', icon: <UserSwitchOutlined />, label: 'User Management', path: '/home/user-management' },
  ];

  const handleMenuClick = (e: any) => {
    const selectedItem =
      agentItems.find(item => item.key === e.key) ||
      adminItems.find(item => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const getSelectedKey = () => {
    const items = role === 'Case Agent' ? agentItems : adminItems;
    const currentItem = items.find(item => item.path === location.pathname);
    return currentItem ? currentItem.key : '1';
  };
  

  const items = [
    {
      label: 'Logout',
      key: '0',
      onClick: () => {
        localStorage.removeItem('user');
        navigate('/');
      },
      style: { background: '#DF7A00', color: '#fff' },
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            background: 'white',
            borderBottomRightRadius: '16px',
            borderBottomLeftRadius: '16px',
           
          }}
        >
          <img
            src={appLogo}
            alt="Refugee"
            style={{ maxWidth: '180px', height: 'auto', marginLeft: '1%', animation: 'spin 2s ease forwards' , }}
          />
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#3C2D79',
              marginLeft: '1%',
              background: 'transparent',
              transform: collapsed ? 'rotate(90deg)' : 'rotate(360deg)',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{ marginLeft: 'auto', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#3C2D79', marginRight: '8px', animation: 'fadeInUp 2s ease' }}>
              {username}&nbsp;({role})
            </span>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar
              src={role === 'Admin'?'https://talk.miraclesoft.com/avatar/skola2':'https://talk.miraclesoft.com/avatar/snistala'}
                size="large"
                icon={<UserOutlined />}
                style={{ animation: 'spin 2s' }}
              />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider
            style={{
              marginTop: '5px',
              borderBottomRightRadius: '60px',
              borderTopRightRadius: '60px',
              background: 'white',
              animation: 'slideInSidebar 2s ease forwards',
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <Menu
              mode="inline"
              selectedKeys={[getSelectedKey()]}
              items={role === 'Case Agent' ? agentItems : adminItems}
              onClick={handleMenuClick}
              style={{
                background: 'transparent',marginTop:'20px'
              }}
            />
          </Sider>
              
          <Content
            style={{
              margin: '5px 5px',
              padding: '0px 0px 24px 6px',
              minHeight: 280,
              background: 'white',
              borderBottomLeftRadius:'60px',
              borderTopLeftRadius:'60px'
             
            }}
          >
             
            <div style={{ height: '85vh', overflowY: 'scroll',borderRadius:'60px',marginTop:'10px'}} className="custom-scrollbar">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;