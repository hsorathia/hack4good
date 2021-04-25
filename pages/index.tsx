import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Listings.module.css';
import { Row, Col, Button, Card } from 'antd';
import ListingModal from '../Components/Layout/listingModal';
import { getListings } from './api/post';

export default function Listings() {
  const [listings, setListings] = useState([
    {
      itemName: '',
      itemDescription: '',
      zipCode: '',
      condition: '',
      phone: '',
      email: '',
      claimed: '',
      image: [''],
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [currentData, setCurrentData] = useState({
    itemName: '',
    image: [''],
    itemDescription: '',
    zipCode: '',
    condition: '',
    email: '',
    phone: '',
    claimed: '',
  });

  function handleViewListing(cardData) {
    setVisible(true);
    setCurrentData({
      itemName: cardData.itemName,
      image: cardData.image,
      itemDescription: cardData.itemDescription,
      zipCode: cardData.zipCode,
      condition: cardData.condition,
      email: cardData.email,
      phone: cardData.phone,
      claimed: cardData.email,
    });
  }

  const cards = listings.map((cardData, itr) => {
    const title = cardData.itemName.slice(0, 40) + (cardData.itemName.length > 40 ? '...' : '');
    const description = cardData.itemDescription.slice(0, 80) + (cardData.itemDescription.length > 80 ? '...' : '');
    return (
      <Col key={itr} className={styles.listingCol} xs={24} sm={24} md={12} lg={12} xl={8}>
        <Card className={styles.listingCard} hoverable cover={<img src={cardData.image[0]} />}>
          <h3>{title}</h3>
          <div className={styles.listingCardBody}>
            <h4>Description: </h4>
            <p className={styles.listingCardDescription}>{description}</p>
            <Row>
              <Col span={12}>
                <h4>Zip Code:</h4>
                <p>{cardData.zipCode}</p>
              </Col>
              <Col span={12}>
                <h4>Condition:</h4>
                <p>{cardData.condition}</p>
              </Col>
            </Row>
            <Button
              onClick={() => {
                handleViewListing(cardData);
              }}
            >
              View
            </Button>
          </div>
        </Card>
      </Col>
    );
  });

  useEffect(async () => {
    const list = await getListings();
    setListings(list.data);
  }, []);

  return (
    <div>
      <Head>
        <title>Free Market - Market</title>
      </Head>
      <div className={styles.container}>
        <Row className={styles.listingsRow}>{cards}</Row>
        <ListingModal visible={visible} setVisible={setVisible} currentData={currentData} />
      </div>
    </div>
  );
}
