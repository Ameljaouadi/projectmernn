// Navbar.js

import React, { useState } from "react";
import "./navbar.css";
import { CloseOutlined, BellOutlined } from '@ant-design/icons';
import { useLocation,useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarExpanded, onSidebarToggle, userName }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(true);
  const location = useLocation();
  const storedUserName = window.localStorage.getItem("userName");
  console.log("Stored UserName:", storedUserName);

  // Where you render the Navbar component, make sure to pass the userName prop
<Navbar userName={storedUserName} />


  
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <nav className={`nav ${isMenuVisible ? "nav__visible" : ""} ${isSidebarExpanded ? 
         "nav__expanded" : ""}`}>
      <div className="nav__brand">
        <CloseOutlined
          style={{ fontSize: '1.5rem', color: 'white', cursor: 'pointer' }}
          onClick={toggleMenu}
        />
      </div>
      <div className="nav__icons">
        <BellOutlined style={{ fontSize: '1.5rem', color: 'white', marginRight: '1rem' }} />
        {isLoggedIn && (
          <div className="nav__item">
            <p className="nav__username">
                {storedUserName}
              </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

/*import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  

  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj"
      ></Image>
      <Typography.Title>Aamir's Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;*/
