import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Input,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Avatar,
  Modal,
  Empty,
  Badge,
  Divider,
  Checkbox,
  message,
  Menu, Dropdown,Tag
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  IdcardTwoTone,
  CloseOutlined,
  SendOutlined,
  FilterOutlined,
  DownOutlined
} from "@ant-design/icons";
import { RefugeeData } from "../../Mock/RefugeeData";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "./RefugeeList.css";
import isBetween from "dayjs/plugin/isBetween";



dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Option } = Select;

function RefugeeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [agentStatusFilter, setAgentStatusFilter] = useState<
    "assigned" | "unassigned" | null
  >(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [chatMessages, setChatMessages] = useState<
    { message: string; sentByUser: boolean }[]
  >([
    { message: "Hello!", sentByUser: true },
    { message: "Hi! How are you?", sentByUser: false },
    { message: "I'm doing great, thanks!", sentByUser: true },
    { message: "Glad to hear! Do you need any help?", sentByUser: false },
    {
      message: "Yes, I have a question about my case status.",
      sentByUser: true,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastViewModalOpen, setBroadcastViewModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [broadcastMesssage, setBroadcastMessage] = useState("");
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

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { message: currentMessage, sentByUser: true },
      ]);
      setCurrentMessage("");
    }
  };

  const handleTypeBroadcastMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBroadcastMessage(e.target.value);
  };

  const handleBroadcastMessage = () => {
    console.log(broadcastMesssage, "67", selectedRowKeys);
    let obj = 
      {
        messageId:1001,
        messageContent:broadcastMesssage,
        senderId:selectedRowKeys
      }
    
    console.log(obj,"113");
    message.success("Sent Successfully");
    setBroadcastModalOpen(false);
  };

  const openChatModal = (user: any) => {
    setSelectedUser(user);
    setModal1Open(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedAgent(null);
    setDateRange(null);
    setGenderFilter(null);
    setAgentStatusFilter(null);
  };

  const agentList = useMemo(
    () => [
      ...new Set(
        RefugeeData.flatMap((refugee) =>
          refugee.caseAgentHistory.map((agent) => agent.agentName)
        )
      ),
    ],
    []
  );

  const genderList = useMemo(
    () => [...new Set(RefugeeData.map((refugee) => refugee.gender))],
    []
  );

  const filteredData = useMemo(() => {
    console.log("Filtering data...");
    setLoading(true);
    const data = RefugeeData.filter((refugee) => {
      const fullName = `${refugee.firstName} ${refugee.lastName}`.toLowerCase();
      const isNameMatch =
        fullName.includes(searchQuery.toLowerCase()) ||
        refugee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refugee.phone.toString().includes(searchQuery);

      const lastAgent =
        refugee.caseAgentHistory.length > 0
          ? refugee.caseAgentHistory[refugee.caseAgentHistory.length - 1]
          : null;

      const isAgentMatch = selectedAgent
        ? lastAgent && lastAgent.agentName === selectedAgent
        : true;

      const isJoinedDateInRange = dateRange
        ? dayjs(refugee.joinedDate).isBetween(
            dateRange[0],
            dateRange[1],
            null,
            "[]"
          )
        : true;

      const isGenderMatch = genderFilter
        ? refugee.gender === genderFilter
        : true;

      const isStatusMatch =
        agentStatusFilter === "assigned"
          ? lastAgent && lastAgent.agentName
          : agentStatusFilter === "unassigned"
          ? !lastAgent || !lastAgent.agentName
          : true;

      return (
        isNameMatch &&
        isAgentMatch &&
        isJoinedDateInRange &&
        isGenderMatch &&
        isStatusMatch
      );
    });

    setTimeout(() => setLoading(false), 1000);

    return data;
  }, [searchQuery, selectedAgent, dateRange, genderFilter, agentStatusFilter]);

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string, record: any) => (
        <Avatar src={record.imageUrl} icon={<UserOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (text: string, record: any) =>
        `${record.firstName} ${record.lastName}`,
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
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "dob",
    },
    {
      title: "Assigned Agent",
      key: "assignedAgent",
      render: (text: string, record: any) => {
        const assignedAgent =
          record.caseAgentHistory[record.caseAgentHistory.length - 1];
        return !assignedAgent ||
          !assignedAgent.agentName ||
          assignedAgent.agentName === "Unassigned"
          ? "NA"
          : assignedAgent.agentName;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (text: string, record: any) => {
        const assignedAgent =
          record.caseAgentHistory[record.caseAgentHistory.length - 1];
        return assignedAgent && assignedAgent.agentName ? (
          <Badge status="success" text="Assigned" />
        ) : (
          <Badge status="default" text="Unassigned" />
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to={`/home/refugee/${record.id}`}
            style={{ marginRight: "10px" }}
          >
            <IdcardTwoTone
              style={{ fontSize: "20px" }}
              twoToneColor="#DF7A00"
            />
          </Link>
          <MessageOutlined
            style={{ fontSize: "20px", color: "#DF7A00", cursor: "pointer" }}
            onClick={() => openChatModal(record)}
          />
        </div>
      ),
    },
  ];

  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      setBroadcastModalOpen(true)
    } else if (e.key === "2") {
      setBroadcastViewModalOpen(true)
      openChatModal(true)
    if(broadcastViewModalOpen){
    }
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
    <span>Add Conversation</span>
    </Menu.Item>
    <Menu.Item key="2">
      <span>View Conversation</span>
    </Menu.Item>
  </Menu>
  );

  return (
    <div
      style={{
        margin: "1%",
        filter: modal1Open || broadcastModalOpen ? "blur(1px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >

<div className="home-container">
      <h1 className="animated-header">Client Catalog</h1>
      <p className="animated-text" style={{color:'var(--ds-gray-900)'}}>You can check the list of clients in the below table, use filters for easy sorting.</p>
      <div className="" />
      </div>
      
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        {/* <Col xs={24} sm={12}>
          <h2 className="h2RefClass">Refugee List</h2>
        </Col> */}
      </Row>
      <div
        style={{
          padding: "10px",
          background: "#B3A0FF1A",
          position: "relative",
          height: "100%",
          borderRadius: '10px'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search by name, email, phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>

          {role === "agent" ? null : (
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Select an agent"
                value={selectedAgent}
                onChange={setSelectedAgent}
                style={{ width: "100%" }}
                allowClear
              >
                {agentList.map((agent) => (
                  <Option key={agent} value={agent}>
                    {agent}
                  </Option>
                ))}
              </Select>
            </Col>
          )}

          <Col xs={24} sm={12} md={8}>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              style={{ width: "100%" }}
            />
          </Col>

          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Gender"
              value={genderFilter}
              onChange={setGenderFilter}
              style={{ width: "100%" }}
              allowClear
            >
              {genderList.map((gender) => (
                <Option key={gender} value={gender}>
                  {gender}
                </Option>
              ))}
            </Select>
          </Col>

          {role === "agent" ? null : (
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Agent Status"
                value={agentStatusFilter}
                onChange={setAgentStatusFilter}
                style={{ width: "100%" }}
                allowClear
              >
                <Option value="assigned">Assigned</Option>
                <Option value="unassigned">Unassigned</Option>
              </Select>
            </Col>
          )}
        </Row>
        <Button
          icon={<FilterOutlined />}
          onClick={handleClearFilters}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "auto",
          }}
        >
          Clear Filters
        </Button>
      </div>

      <Divider />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: <Empty description="No refugees found" /> }}
        loading={loading}
      />

      <Modal
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
        width={350}
        style={{
          top: 40,
          right: 0,
          height: "90vh",
          position: "fixed",
          marginRight: "20px",
        }}
        bodyStyle={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
        closable={false}
        mask={false}
      >
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #f0f0f0",
            backgroundColor: "#555",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={selectedUser?.imageUrl}
                icon={<UserOutlined />}
                style={{ marginRight: "8px" }}
              />
              <span style={{ color: "white" }}>
                {selectedUser
                  ? `${selectedUser.firstName?selectedUser.firstName: 'BroadCast'} ${selectedUser.lastName? selectedUser.lastName: 'Messages'}`
                  : "User"}
              </span>
            </div>
            <CloseOutlined
              onClick={() => setModal1Open(false)}
              style={{ cursor: "pointer", color: "white" }}
            />
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            padding: "10px",
            overflowY: "auto",
            backgroundColor: "gainsboro",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {chatMessages.length > 0 ? (
            chatMessages.map((messageObj, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  alignSelf: messageObj.sentByUser ? "flex-end" : "flex-start",
                  backgroundColor: messageObj.sentByUser ? "#DF7A00" : "#555",
                  color: "white",
                }}
              >
                {messageObj.message}
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
              background: "#555",
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

      <Modal
        title="Broadcast Message"
        open={broadcastModalOpen}
        onCancel={() => setBroadcastModalOpen(false)}
        footer={[
          <Button key="send" type="primary" onClick={handleBroadcastMessage}>
            Send
          </Button>,
          <Button key="cancel" onClick={() => setBroadcastModalOpen(false)}>
            Cancel
          </Button>,
        ]}
        className="broadcast"
        style={{
          top: " 250px",
          right: "364px",
          marginBottom: "15px",
          position: "fixed",
          marginRight: "20px",
          border: "1px solid gainsboro",
          borderRadius: "5px",
          padding: "3px",
          background: "gainsboro",
        }}
        bodyStyle={{ padding: "0", display: "flex", flexDirection: "column" }}
        closable={false}
        mask={false}
      >
        <div style={{ display: 'flex', gap: '8px', padding: '8px' }}>To:
    <Tag color="#555">Santosh</Tag>
    <Tag color="#555">John</Tag>
    <Tag color="#555">Vinod</Tag>
    <Tag color="#555">Sai Kartik</Tag>
  </div>
        <Input.TextArea
          rows={4}
          placeholder="Type your broadcast message here..."
          onChange={handleTypeBroadcastMessage}
        />
      </Modal>

      {/* <Modal
                title="Broadcast Message"
                open={broadcastModalOpen}
                onCancel={() => setBroadcastModalOpen(false)}
                footer={[
                    <Button key="send" type="primary" onClick={handleBroadcastMessage}>
                        Send
                    </Button>,
                    <Button key="cancel" onClick={() => setBroadcastModalOpen(false)}>
                        Cancel
                    </Button>,
                ]}
                className='broadcast'
                style={{ top:' 250px',
                    right: '364px', marginBottom: '15px', position: 'fixed', marginRight: '20px', border: '1px solid gainsboro',
                    borderRadius: '5px',
                    padding: '3px',background: 'gainsboro'}}
                bodyStyle={{ padding: '0', display: 'flex', flexDirection: 'column' }}
                closable={false}
                mask={false}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Type your broadcast message here..."
                />
            </Modal> */}
    </div>
  );
}

export default RefugeeList;
