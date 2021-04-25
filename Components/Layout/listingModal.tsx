import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/ListingModal.module.css';
import { Row, Col, Button, Modal, Carousel, Tag } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

export default function ListingModal(props) {
  const [data, setData] = useState({
    itemName: 'test',
    image: [''],
    itemDescription: 'test',
    zipCode: 'test',
    condition: 'test',
    email: 'test',
    phone: 'test',
    claimed: 'test',
  });

  const handleCancel = () => {
    props.setVisible(false);
  };

  const carouselImages = data.image.map((img, itr) => {
    return <img key={itr} className={styles.ListingImage} src={img} />;
  });

  useEffect(() => {
    const { currentData } = props;
    setData(currentData);
  }, [props, props.currentData]);

  return (
    <div className={styles.container}>
      <Modal
        className={styles.ListingModal}
        visible={props.visible}
        title={data.itemName}
        width={1000}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.ListingImageContainer}>
          <Carousel autoplay>{carouselImages}</Carousel>
        </div>
        <div span={12} className={styles.ListingZip}>
          <h3>Zip Code:</h3>
          <p>{data.zipCode}</p>
        </div>
        <div span={12} className={styles.ListingCondition}>
          <h3>Condition:</h3>
          <p>{data.condition}</p>
        </div>
        <div className={styles.ListingDescription}>
          <h3>Description:</h3>
          <p>{data.itemDescription}</p>
        </div>
        <Tag className={styles.ContactTag} color="geekblue">
          <MailOutlined /> {data.email}
        </Tag>
        <Tag className={styles.ContactTag} color="geekblue">
          <PhoneOutlined /> {data.phone}
        </Tag>
        <br />
      </Modal>
    </div>
  );
}
