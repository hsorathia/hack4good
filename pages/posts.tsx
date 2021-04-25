import React, { useState, useEffect } from 'react';
import styles from '../styles/Posts.module.css';
import { Row, Col, Button, Card, Dropdown, Menu, Empty } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { getUserListings, updateClaim } from './api/post';
import { getUser } from './api/user';

export default function posts() {
  const [render, setRender] = useState(false);
  const [listings, setListings] = useState([
    {
      _id: '',
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

  function forceRender() {
    setRender(!render);
  }

  async function handleClaimed(id, claimed) {
    const res = await updateClaim({ postID: id, claim: !claimed });
    for (let i = 0; i < listings.length; i++) {
      if (listings[i]._id === id) {
        const tempListings = listings;
        tempListings[i].claimed = !claimed;
        setListings(tempListings);
        forceRender();
      }
    }
    console.log(listings);
  }

  function dropdownMenu(id, claimed) {
    return (
      <Menu
        onClick={() => {
          handleClaimed(id, claimed);
        }}
      >
        <Menu.Item key="1"> {!claimed ? 'Claimed' : 'Not Claimed'} </Menu.Item>
      </Menu>
    );
  }

  const cards = listings.map((cardData, itr) => {
    const title = cardData.itemName.slice(0, 40) + (cardData.itemName.length > 40 ? '...' : '');
    const description = cardData.itemDescription.slice(0, 80) + (cardData.itemDescription.length > 80 ? '...' : '');

    return (
      <Col key={itr} className={styles.listingCol} lg={12}>
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
            <Dropdown overlay={dropdownMenu(cardData._id, cardData.claimed)}>
              <Button>
                {cardData.claimed ? 'Claimed' : 'Not Claimed'} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Card>
      </Col>
    );
  });

  useEffect(async () => {
    const user = getUser();
    const list = await getUserListings({ email: user.email });
    console.log(list);
    setListings(list.data);
  }, []);

  return (
    <div>
      <Row className={styles.listingsRow}>{cards.length ? cards : <Empty />}</Row>
    </div>
  );
}
