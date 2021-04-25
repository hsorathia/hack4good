import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import { getUser } from '../../pages/api/user';

export default function NavBar(props: any): any {
  const router = useRouter();

  const [loginState, setLoginState] = useState(false);

  function handleLogout() {
    const router = useRouter();
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwt-expire');
    router.push('/');
    window.location.reload(false);
  }

  useEffect(() => {
    const user = getUser();
    if (user) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [loginState]);

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
        {!loginState ? (
          <>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <a href="/register">Register</a>
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              <a href="/login">Login</a>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="3" style={{ float: 'right' }}>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}
