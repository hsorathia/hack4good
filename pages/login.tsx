import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Form, Input, Button, Checkbox, Space, Card, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './api/user';
import styles from '../styles/Home.module.css';
const { Content } = Layout;

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await login(values);
    if (res) {
      setLoading(false);
      router.push('/');
    }
  };

  return (
    <Layout
      style={{
        margin: '24px 0',
      }}
      className={styles.container}
    >
      <Head>
        <title>Free Market - Login</title>
      </Head>
      <Content style={{ padding: '0 50px', minHeight: 280 }} className={styles.container}>
        <Card title="Login Form" style={{ boxShadow: '8px 8px 12px rgba(186, 186, 186, 0.698)' }}>
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
              <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {" Don't have an account?"}
              <a href="/register">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
