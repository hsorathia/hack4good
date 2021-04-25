import React from 'react';
import { Menu } from 'antd';

export default function NavBar(props: any): any {
  const [loginState, setLoginState] = React.useState('login');
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <a href="/">Market</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/create">Create Post</a>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: 'right' }}>
          {loginState === 'login' ? <a href="/login">Login</a> : <a href="/logout">Logout</a>}
        </Menu.Item>
      </Menu>
    </>
  );
}
