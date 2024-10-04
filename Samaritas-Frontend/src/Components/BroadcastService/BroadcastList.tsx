import React, { useEffect, useState } from 'react';
import { Table, Tag, FloatButton, Col } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import BroadcastMessageModal from './BroadcastMessageModal';
import {MessageOutlined  } from '@ant-design/icons';

const BroadcastList = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const broadcastlist = [
    {
      messageId: 1001,
      messageContent: "Hello Welcome!.",
      senderId: [5, 3, 2],
      timeStamp: 'Tue Sep 17 2024 23:41:13',
    },
    {
      messageId: 1002,
      messageContent: "Assemble at Bentovelli by 10AM",
      senderId: [4, 3, 2],
      timeStamp: 'Tue Sep 16 2024 09:10:13',
    },
    {
      messageId: 1003,
      messageContent: "Data will be shown",
      senderId: [4, 3, 2],
      timeStamp: 'Tue Sep 13 2024 02:41:13',
    },
  ];

  useEffect(() => {
    const button = document.querySelector('.ant-float-btn-primary .ant-float-btn-body') as HTMLElement;
    if (button) {
      button.style.backgroundColor = '#3C2D79';
    }
    setTimeout(() => setLoading(false), 1000);
  }, [openMessageModal]);

  // Sample refugee list
  const refugeelist = [
    { id: 1, firstName: "Refugee", lastName: "1" },
    { id: 2, firstName: "Refugee", lastName: "2" },
    { id: 3, firstName: "Refugee", lastName: "3" },
    { id: 4, firstName: "Refugee", lastName: "4" },
    { id: 5, firstName: "Refugee", lastName: "5" },
  ];

  // Function to get refugee names based on senderId array
  const getRefugeeNames = (senderIds: any) => {
    return senderIds
      .map((id: any) => {
        const refugee = refugeelist.find((r) => r.id === id);
        return refugee ? `${refugee.firstName} ${refugee.lastName}` : 'Unknown';
      });
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'Message ID',
      dataIndex: 'messageId',
      key: 'messageId',
    },
    {
      title: 'Message Content',
      dataIndex: 'messageContent',
      key: 'messageContent',
    },
    {
      title: 'Sender Names',
      key: 'senderNames',
      render: (_: any, record: any) => (
        <div>
          {getRefugeeNames(record.senderId).map((name: any, index: any) => (
            <Tag
              key={index}
              style={{
                margin: '3px',
                color: '#fff',
                background: '#555',
                borderColor: '#DF7A00',
              }}
            >
              {name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
    },
  ];

  return (
    <div
      style={{
        padding: '20px',
        filter: openMessageModal ? 'blur(1px)' : 'none',
      }}
    >
      <Col xs={24} sm={12}>
        <h2 className="h2Class">Broadcast List</h2>
      </Col>
      <Table
        dataSource={broadcastlist}
        columns={columns}
        rowKey="messageId"
        pagination={false}
        loading={loading}
      />

      {!openMessageModal && (
        <FloatButton
        icon={<MessageOutlined />}
          type="primary"
          style={{
            margin: '7vh',
            width: '7vh',
            height: '7vh',
            backgroundColor: '#3C2D79',
            border: '#3C2D79'
          }}
          onClick={() => setOpenMessageModal(true)}
        >
          
        </FloatButton>
      )}

      {openMessageModal && (
        <BroadcastMessageModal
          refugeelist={refugeelist}
          setOpenMessageModal={setOpenMessageModal}
        />
      )}
    </div>
  );
};

export default BroadcastList;
