import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox, Space, Card, Dropdown, Menu } from 'antd';
import styles from '../styles/CreateListing.module.css';
import { UserOutlined, LockOutlined, MinusCircleOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { createListing } from './api/post';
import { getUser } from './api/user';

export default function Create() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [condition, setCondition] = React.useState('New');
  const user = getUser();

  const onFinish = (values: any) => {
    setLoading(true);
    if (values.images) {
      values.images.unshift(values.image);
    } else {
      values.images = [].push(values.image);
    }
    const currentDate = new Date().toLocaleDateString();
    const data = {
      itemName: values.name,
      itemDescription: values.description,
      zipCode: values.zip,
      condition: condition,
      phone: user.phone,
      email: user.email,
      date: currentDate,
      claimed: false,
      image: values.images,
    };
    createListing(data);
    setLoading(true);
    router.push('/');
  };

  function dropdownMenu() {
    const menuItems = ['New', 'Good', 'Used', 'Old'];
    return (
      <Menu>
        {menuItems.map((item, itr) => {
          if (item !== condition) {
            return (
              <Menu.Item
                key={itr}
                onClick={() => {
                  setCondition(item);
                }}
              >
                {item}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <div className={styles.CreateListing}>
      <Head>
        <title>Free Market - Create Listing</title>
      </Head>
      <Card className={styles.CreateListingCard} style={{ width: '600px' }} title="Create Listing">
        <Form {...layout} name="login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your Item Name!' }]}>
            <Input placeholder="Item Name" />
          </Form.Item>
          <Form.Item name="zip" label="Zip Code" rules={[{ required: true, message: 'Please input your Zip Code!' }]}>
            <Input placeholder="Zip Code" />
          </Form.Item>
          <Form.Item name="condition" label="Condition">
            <Dropdown overlay={dropdownMenu}>
              <Button>
                {condition} <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input your Description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Item Description" />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please input an image url!' }]}>
            <Input placeholder="Image URL" />
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item {...formItemLayoutWithOutLabel} label={''} required={false} key={field.key}>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                    ) : null}
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input image URL or delete this field.',
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Image URL" style={{ width: '95%' }} />
                    </Form.Item>
                  </Form.Item>
                ))}
                <Form.Item className={styles.AddImageButton}>
                  <Button type="dashed" onClick={() => add()} style={{ width: '100%' }} icon={<PlusOutlined />}>
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
              <Button loading={loading} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
