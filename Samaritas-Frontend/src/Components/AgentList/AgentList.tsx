import React, { useState, useMemo } from 'react';
import { Table, Input, Row, Col, Button, Select, DatePicker, Avatar, Modal, Empty, Badge, Divider } from 'antd';
import { UserOutlined, MessageOutlined, IdcardTwoTone, CloseOutlined, SendOutlined, FilterOutlined } from '@ant-design/icons';
import { AgentData } from '../../Mock/AgentData';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import './AgentList.css';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Option } = Select;

function RefugeeList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [agentStatusFilter, setAgentStatusFilter] = useState<'assigned' | 'unassigned' | null>(null);
    const [chatMessages, setChatMessages] = useState<{ message: string; sentByUser: boolean }[]>(
        [
            { message: "Hello!", sentByUser: true },
            { message: "Hi! How are you?", sentByUser: false },
            { message: "I'm doing great, thanks!", sentByUser: true },
            { message: "Glad to hear! Do you need any help?", sentByUser: false },
            { message: "Yes, I have a question about my case status.", sentByUser: true }
        ]
    );
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [modal1Open, setModal1Open] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [tableDetails, setTableDetails]= useState(false)

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            setChatMessages([...chatMessages, { message: currentMessage, sentByUser: true }]);
            setCurrentMessage('');
        }
    };

    const openChatModal = (user: any) => {
        setSelectedUser(user);
        setModal1Open(true);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedAgent(null);
        setDateRange(null);
        setGenderFilter(null);
        setAgentStatusFilter(null);
    };

    const genderList = useMemo(() => [...new Set(AgentData.map(refugee => refugee.gender))], []);
    const locationList = useMemo(
      () => [...new Set(AgentData.map((refugee) => refugee.currentLocation))],
      []
    );
    const filteredData = useMemo(() => {
      console.log('Filtering data...');
      setLoading(true);
      const data = AgentData.filter(refugee => {
          const fullName = `${refugee.firstName} ${refugee.lastName}`.toLowerCase();
          const isNameMatch = fullName.includes(searchQuery.toLowerCase()) ||
              refugee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              refugee.phone.toString().includes(searchQuery);
  
          const isDateInRange = dateRange
              ? dayjs(refugee.joinedDate).isBetween(dateRange[0], dateRange[1], null, '[]') 
              : true;
  
          const isGenderMatch = genderFilter ? refugee.gender === genderFilter : true;
          const isLocationMatch = selectedLocation ? refugee.currentLocation === selectedLocation : true;
  
          return isNameMatch && isDateInRange && isGenderMatch && isLocationMatch;
      });
  console.log(data,"79");
  if(data.length === 0){
setTableDetails(true)
  }
  
      setTimeout(() => setLoading(false), 1000);
  
      return data;
  }, [searchQuery, selectedAgent, dateRange, genderFilter, selectedLocation]);
  

    

    const columns = [
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        render: (text: string) => <Avatar src={text} alt="profile image" />,
      },
      {
        title: "Name",
        key: "name",
        render: (text: any, record: any) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Location",
        dataIndex: "currentLocation",
        key: "currentLocation",
      },
     
      {
        title: "Date of Birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
      },
      {
        title: "Language",
        dataIndex: "language",
        key: "language",
      },
      {
        title: "Joined Date",
        dataIndex: "joinedDate",
        key: "joinedDate",
      },
      {
        title: "Actions",
        key: "actions",
        render: (text: any, record: any) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/home/agent/${record.id}`}>
              <IdcardTwoTone
                style={{ fontSize: "20px", marginLeft: "14px" }}
                twoToneColor="#DF7A00"
              />
            </Link>
            {/* <Button
                          icon={<MessageOutlined style={{ color: '#DF7A00' }} />}
                          onClick={() => openChatModal(record)}
                      /> */}
          </div>
        ),
      },
    ];

    return (
        <div style={{ margin: '1%', filter: modal1Open ? 'blur(1px)' : 'none', transition: 'filter 0.3s ease' }}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col xs={24} sm={12}>
                    <h2 className='h2Class'>Agent List</h2>
                </Col>
            </Row>
            <div style={{ padding: '10px', background: 'ghostwhite', position: 'relative', height: '100%' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Input
                            placeholder="Search by name, email, phone"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Find Location"
              value={selectedLocation}
              onChange={setSelectedLocation}
              style={{ width: "100%" }}
              allowClear
            >
              {locationList.map((location) => (
                <Option key={location} value={location}>
                  {location}
                </Option>
              ))}
            </Select>
          </Col>

                    <Col xs={24} sm={12} md={8}>
                        <RangePicker
                            value={dateRange}
                            onChange={(dates) => setDateRange(dates)}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={4}>
                        <Select
                            placeholder="Gender"
                            value={genderFilter}
                            onChange={setGenderFilter}
                            style={{ width: '100%' }}
                            allowClear
                        >
                            {genderList.map(gender => (
                                <Option key={gender} value={gender}>
                                    {gender}
                                </Option>
                            ))}
                        </Select>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Agent Status"
                            value={agentStatusFilter}
                            onChange={setAgentStatusFilter}
                            style={{ width: '100%' }}
                            allowClear
                        >
                            <Option value="assigned">Assigned</Option>
                            <Option value="unassigned">Unassigned</Option>
                        </Select>
                    </Col>
                </Row>
                <Button
                    icon={<FilterOutlined />}
                    onClick={handleClearFilters}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: 'auto',
                    }}
                >
                    Clear Filters
                </Button>
            </div>

            <Divider />
            {!tableDetails &&<Table
                columns={columns}
                dataSource={filteredData}
                rowKey={record => record.id}
                pagination={{ pageSize: 10 }}
                locale= {{emptyText: <Empty description="No Agent Found" /> }}
                loading={loading}
            />}

            <Modal
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
                footer={null}
                width={350}
                style={{ top: 40, right: 0, height: '90vh', position: 'fixed', marginRight: '20px' }}
                bodyStyle={{ padding: '0', display: 'flex', flexDirection: 'column', height: '90vh' }}
                closable={false}
                mask={false}
            >
                <div style={{ padding: '10px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#555', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={selectedUser?.imageUrl} icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                            <span style={{ color: 'white' }}>
                                {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : 'User'}
                            </span>
                        </div>
                        <CloseOutlined onClick={() => setModal1Open(false)} style={{ cursor: 'pointer', color: 'white' }} />
                    </div>
                </div>

                <div style={{ flexGrow: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
                    {chatMessages.length > 0 ? (
                        chatMessages.map((messageObj, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: '10px',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    maxWidth: '80%',
                                    alignSelf: messageObj.sentByUser ? 'flex-end' : 'flex-start',
                                    backgroundColor: messageObj.sentByUser ? '#DF7A00' : '#555',
                                    color: 'white',
                                }}
                            >
                                {messageObj.message}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet. Start the conversation!</p>
                    )}
                </div>

                <div style={{ padding: '10px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff', zIndex: 1, background: "lightgray" }}>
                    <div style={{ display: 'flex' }}>
                        <Input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        />
                        <Button icon={<SendOutlined />} onClick={handleSendMessage} style={{ color: "#DF7A00" }} />
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default RefugeeList;


