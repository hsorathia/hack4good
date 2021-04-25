import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, Form, Input, Layout } from 'antd';
import { register } from './api/user';
import styles from '../styles/Home.module.css';
const { Content } = Layout;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegistrationForm() {
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState({
    email: '',
    nickname: '',
    password: '',
    phoneNumber: '',
  });

  const onFinish = (values: any) => {
    setLoading(true);
    const { email, nickname, password, phone } = values;
    setFormState({ email, nickname, password, phoneNumber: phone });
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = '';
      const data = await register(formState, res);
      if (data) {
        setLoading(false);
        router.push('/login');
      }
      return data;
    };
    if (formState.email !== '') {
      getData();
    }
  }, [formState]);

  return (
    <Layout
      style={{
        margin: '24px 0',
      }}
      className={styles.container}
    >
      <Head>
        <title>Free Market - Register</title>
      </Head>
      <Content style={{ padding: '0 50px', minHeight: 280 }} className={styles.container}>
        <Card style={{ width: '480px', boxShadow: '8px 8px 12px rgba(186, 186, 186, 0.698' }} title="Registration Form">
          <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid email!',
                },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="What do you want others to call you?"
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button loading={loading} type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
