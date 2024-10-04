import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  Divider,
  Typography,
  Row,
  Col,
  Tag,
  Table,
  Button,
  Input,
  Modal
} from "antd";
import { UserOutlined, MessageOutlined, IdcardTwoTone, CloseOutlined, SendOutlined,FilterOutlined } from '@ant-design/icons';
import "./AgentDetails.css";
import { AgentData } from "../../Mock/AgentData";

const { Title, Paragraph } = Typography;

function RefugeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refugeeId = id ?? "";
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      // Only proceed if user data exists
      try {
        const parsedUser = JSON.parse(user);

        // Check if parsedUser and its nested properties exist
        if (parsedUser && parsedUser.user && parsedUser.user.role) {
          console.log(parsedUser.user.role);
          setRole(parsedUser.user.role);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);
  const refugee = AgentData.find((item) => item.id.toString() === refugeeId);

  if (!refugee) {
    return <div>Refugee not found</div>;
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string) => <Avatar src={text} alt="profile image" />,
    },
    {
      title: 'Name',
      key: 'name',
      render: (text: any, record: any) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button style={{marginLeft: '14px'}}
            icon={<MessageOutlined style={{ color: '#DF7A00', }} />}
            onClick={() => openChatModal(record)}
          />
        </div>
      ),
    },
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
        setChatMessages([...chatMessages, currentMessage]);
        setCurrentMessage('');
    }
};
  const openChatModal = (user: any) => {
    setSelectedUser(user);
    setModal1Open(true);
};

  return (
    <div className="agent-details-container" style={{ display: "flex", flexDirection: "column", alignItems: "center",filter: modal1Open ? 'blur(1px)' : 'none', transition: 'filter 0.3s ease'  }}>
      <Row style={{ width: "100%", marginBottom: "16px" }}>
        <Col span={24}>
          <Card className="agent-details-card" style={{ padding: "20px" }}>
            <Row gutter={16}>
              <Col span={24} md={8} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                  src={refugee.imageUrl}
                  size={120}
                  icon={<UserOutlined />}
                  
                />
                  <Title level={4} style={{ marginBottom: '-1vh', marginTop:'0vh', color: "#555",fontSize: '15px' }}>
                  Agent
                </Title>
                <Title level={4} style={{ margin: 0, textAlign: "center", color: "#3C2D79" }}>
                  {refugee.firstName} {refugee.lastName}
                </Title>
              </Col>
              <Col span={24} md={16}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={12}>
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
                      <Tag color="#DF7A00">Joined Date</Tag> {refugee.joinedDate}
                    </Paragraph>
                  </Col>
                  <Col span={24} md={12}>
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
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div style={{ width: "100%" }}>
      <Title level={4} style={{ marginTop: '-7vh', color: "#555",fontSize: '3vh' }}>
                 Assigned Refugees
                </Title>
        <Table
          columns={columns}
          dataSource={refugee?.assignedRefugees}
          rowKey="email" // Assuming email is unique, you can use another unique field
          pagination={{ pageSize: 5 }} // Control pagination here
        />
      </div>
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

                <div style={{ flexGrow: 1, padding: '10px', overflowY: 'auto', backgroundColor: 'gainsboro' }}>
                    {chatMessages.length > 0 ? (
                        chatMessages.map((message, index) => (
                            <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#555', color: 'white', borderRadius: '10px', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                {message}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet. Start the conversation!</p>
                    )}
                </div>

                {role === "admin" ? null : (
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "#fff",
              zIndex: 1,
              background: "lightgray",
            }}
          >
            <div style={{ display: "flex" }}>
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ flexGrow: 1, marginRight: "8px" }}
              />
              <Button
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                style={{ color: "#DF7A00" }}
              />
            </div>
          </div>
        )}
            </Modal>
    </div>
  );
}

export default RefugeeDetails;
