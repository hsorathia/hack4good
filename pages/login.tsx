import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Button } from 'antd';

export default function Home() {
  const [count, setCount] = React.useState(0);
  // React.useEffect(() => {});
  return (
    <div className={styles.container}>
      <Head>
        <title>Items</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Button onClick={() => setCount((prevCount: any) => prevCount + 1)}>Click Me!</Button>
      <div>{count}</div>
    </div>
  );
}
