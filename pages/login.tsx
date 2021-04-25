import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Form, Input, Button, Checkbox, Space, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './api/user';

export default function LoginForm() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res = await login(values);
    if (res) {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Free Market - Login</title>
      </Head>
      <Card style={{ boxShadow: '8px 8px 12px rgba(186, 186, 186, 0.698' }} title="Login Form">
        <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {" Don't have an account?"}
            <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
