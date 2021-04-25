import NavBar from 'Components/Layout/nav';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Button } from 'antd';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Items</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button>hi</Button>
    </div>
  );
}
