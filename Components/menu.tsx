import { Menu, Layout, Typography, Radio, DatePicker, Input, Button } from 'antd';
import React, { useEffect } from 'react';
const { Sider } = Layout;
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Title } = Typography;
export default function DashboardMenu(props) {
  const { filterExpression } = props;
  const [itemName, setItemName] = React.useState('');
  const [zipCode, setZipCode] = React.useState('00000');
  const [date, setDate] = React.useState('');
  const [datePeriod, setDatePeriod] = React.useState(1);
  const [condition, setCondition] = React.useState(0);

  const handleSubmit = (e) => {
    filterExpression({ itemName, zipCode, date, datePeriod, condition });
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <Sider style={{ background: '#fff' }} width={200}>
      <div className="logo" />

      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
        <Menu.ItemGroup key="name" title="Item Name">
          <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Input placeholder="Search Query Here" onChange={(e) => setItemName(e.target.value)} />
          </div>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="zipCode" title="Zip Code">
          <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Input placeholder="Zip Code" onChange={(e) => setZipCode(e.target.value)} />
          </div>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="date" title="Date Posted">
          <div style={{ paddingLeft: '15px' }}>
            <Radio.Group onChange={(e) => setDatePeriod(e.target.value)} value={datePeriod}>
              <Radio style={radioStyle} value={1}>
                Before
              </Radio>
              <Radio style={radioStyle} value={2}>
                After
              </Radio>
            </Radio.Group>
            <DatePicker onChange={(e) => setDate(e.toJSON())} />
          </div>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="condition" title="Item Condition">
          <div style={{ paddingLeft: '15px' }}>
            <Radio.Group onChange={(e) => setCondition(e.target.value)} value={condition}>
              <Radio style={radioStyle} value={1}>
                New
              </Radio>
              <Radio style={radioStyle} value={2}>
                Good
              </Radio>
              <Radio style={radioStyle} value={3}>
                Used
              </Radio>
              <Radio style={radioStyle} value={4}>
                Old
              </Radio>
            </Radio.Group>
          </div>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="submit" title="Ready to Submit?">
          <div style={{ paddingLeft: '15px' }}>
            <Button onClick={handleSubmit}>Filter!</Button>
          </div>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
}
