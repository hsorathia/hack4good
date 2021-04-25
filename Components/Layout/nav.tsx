import React from 'react';
import { Breadcrumb } from 'antd';

export default function NavBar(props: any) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/test">test</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
