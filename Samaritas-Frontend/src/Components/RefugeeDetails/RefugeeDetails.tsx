import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Timeline, Divider, Typography, Row, Col, Tag, Button, Input, Modal } from 'antd';
import { UserOutlined, PlusOutlined, DeleteOutlined, MessageOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import './RefugeeDetails.css';
import { RefugeeData } from '../../Mock/RefugeeData';

const { Title, Paragraph } = Typography;

function RefugeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const refugeeId = id ?? '';

    const [modal1Open, setModal1Open] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
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
    const [role, setRole] = useState<string | null>(null); // Set initial role


    const refugee = RefugeeData.find((item) => item.id.toString() === refugeeId);
    const currentAgent = refugee?.caseAgentHistory.find(agent => !agent.removedDate);

    useEffect(() => {
        const user = localStorage.getItem('user');
        
        if (user) { // Only proceed if user data exists
          try {
            const parsedUser = JSON.parse(user);
            
            // Check if parsedUser and its nested properties exist
            if (parsedUser && parsedUser.user && parsedUser.user.role) {
              console.log(parsedUser.user.role);
              setRole(parsedUser.user.role);
            }
          } catch (error) {
            console.error('Failed to parse user from localStorage', error);
          }
        }
      }, []);


    if (!refugee) {
        return <div>Refugee not found</div>;
    }

    const openChatModal = (user: any) => {
        setSelectedUser(user);
        console.log(user)
        setModal1Open(true);
    };

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            setChatMessages([...chatMessages, { message: currentMessage, sentByUser: true }]);
            setCurrentMessage('');
        }
    };

      

    return (
        <div className="details-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: modal1Open ? 'blur(1px)' : 'none', transition: 'filter 0.3s ease' }}>
            <Row style={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                {/* <Col flex="none">
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        style={{ marginRight: '10px' }}
                    >
                        Back
                    </Button>
                </Col> */}
                <Col flex="auto" style={{ textAlign: 'center' }}>
                    <h2 style={{
                        margin: '0', fontWeight: 400, fontSize: '30px', color: 'white',
                        background: '#3C2D79',
                        borderRadius: '5px', width: ' 30%',
                        textAlign: 'start',
                        paddingLeft: '20px'
                    }}>Details</h2>
                </Col>
            </Row>
            <Row gutter={16} style={{ width: '100%' }}>
                <Col span={12}>
                    <Card className="details-card" style={{ padding: '20px' }}>
                        <Row gutter={16}>
                            <Col span={24} md={8} className="avatar-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={refugee.imageUrl} size={120} icon={<UserOutlined />} />
                            </Col>
                            <Col span={24} md={16}>
                                <Title level={3} style={{ textAlign: 'center' }}>{refugee.firstName} {refugee.lastName}</Title>
                                <Paragraph>
                                    <Tag color="#DF7A00">Email</Tag> {refugee.email}
                                </Paragraph>
                                <Paragraph>
                                    <Tag color="#DF7A00">Phone</Tag> {refugee.phone}
                                </Paragraph>
                                <Paragraph>
                                    <Tag color="#DF7A00">Date of Birth</Tag> {refugee.dateOfBirth}
                                </Paragraph>
                                <Paragraph>
                                    <Tag color="#DF7A00">Country of Origin</Tag> {refugee.countryOfOrigin}
                                </Paragraph>
                                <Paragraph>
                                    <Tag color="#DF7A00">Current Location</Tag> {refugee.currentLocation}
                                </Paragraph>
                                <Paragraph>
                                    <Tag color="#DF7A00">Language</Tag> {refugee.language}
                                </Paragraph>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="agent-card" style={{ padding: '20px' }}>
                        <Title level={4}>Agent Details</Title>
                        {currentAgent && currentAgent.agentName && currentAgent.agentName !== 'Unassigned' ? (
                            <>
                                <Paragraph style={{ marginBottom: '50px' }}>
                                    <Tag color="#DF7A00">Current Agent</Tag>
                                    {currentAgent.agentName}
                                </Paragraph>
                                <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '8px', background: '#3C2D79' }}>
                                    Re-Assign Agent
                                </Button>
                                <Button type="primary" icon={<DeleteOutlined />} danger>Remove Agent</Button>
                            </>
                        ) : (
                            <>
                                <Paragraph style={{ marginBottom: '50px' }}>No agent assigned yet.</Paragraph>
                                <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '8px', background: '#3C2D79' }}>
                                    Assign Agent
                                </Button>
                            </>
                        )}
                    </Card>



                </Col>
            </Row>
            <Divider />
            <Card className="history-card" style={{ width: '100%', padding: '20px' }}>
                <Title level={4}>Case Agent History</Title>
                <Timeline mode="left">
                    {refugee.caseAgentHistory
                        .filter((entry) => entry.removedDate) // Exclude the current agent from the history
                        .sort((a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime()) // Fix date sorting
                        .map((entry, index) => (
                            <Timeline.Item color="#DF7A00" key={index}>
                                <div className="timeline-content">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "ghostwhite" }}>
                                        <Title level={5} style={{ margin: 0 }}>{entry.agentName}</Title>
                                        <MessageOutlined
                                            style={{ fontSize: '20px', color: '#DF7A00', cursor: 'pointer', marginLeft: "0%" }}
                                            onClick={() => openChatModal(entry)}
                                        />
                                    </div>
                                    <Paragraph>
                                        Assigned on {entry.assignedDate}
                                        {entry.removedDate && `, Removed on ${entry.removedDate}`}
                                    </Paragraph>
                                </div>
                            </Timeline.Item>
                        ))}
                </Timeline>
            </Card>


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
                                {selectedUser ? `${selectedUser.agentName}` : 'User'}
                            </span>
                        </div>
                        <CloseOutlined onClick={() => setModal1Open(false)} style={{ cursor: 'pointer', color: 'white' }} />
                    </div>
                </div>

                <div style={{ flexGrow: 1, padding: '10px', overflowY: 'auto', backgroundColor: 'gainsboro', display: 'flex', flexDirection: 'column' }}>
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

                {/* {
                    role === 'admin' ?
                        (
                            null
                        ) :
                        (
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

                        )
                } */}
            </Modal>


        </div>
    );
}

export default RefugeeDetails;
