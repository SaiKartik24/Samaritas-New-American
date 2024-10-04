import React,{useEffect, useState} from 'react'
import {
    Input,
    Button,
    Modal,
    Tag,
    message,
    Select,
    Checkbox
  } from "antd";

export default function BroadcastMessageModal(props:any) {
    const [refugeelist, setrefugeeList]= useState(props.refugeelist)
    const [selectedRefugees, setSelectedRefugees] = useState<any[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  console.log(refugeelist,"13");
  const isAllSelected = selectedRefugees.length === refugeelist.length;
  const handleBroadcastMessage = () => {
    message.success("Message sent successfully!");
    console.log("Selected Refugees:", selectedRefugees);
    console.log("Broadcast Message:", broadcastMessage);
    props.setOpenMessageModal(false);
  };
  const handleTypeBroadcastMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBroadcastMessage(e.target.value);
  };

  // Handle selection of refugees
  const handleSelectChange = (value: any) => {
    setSelectedRefugees(value);
  };
  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      // If checked, select all refugee IDs
      setSelectedRefugees(refugeelist.map((refugee: any) => refugee.id));
    } else {
      // If unchecked, clear the selection
      setSelectedRefugees([]);
    }
  };

  return (
    <div>
      <Modal
        title= <b>Broadcast Message</b>
        open={props.refugeelist}
        onCancel={() => props.setOpenMessageModal(false)}
        footer={[
          <Button key="send" type="primary" onClick={handleBroadcastMessage}>
            Send
          </Button>,
          <Button key="cancel" onClick={() => props.setOpenMessageModal(false)}>
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
          <div style={{ marginBottom: "10px" }}>
          <Checkbox
            checked={isAllSelected}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
          >
            Select All
          </Checkbox>
        </div>
        <Select
          mode="multiple"
          placeholder="Select refugees"
          style={{ width: "100%", marginBottom: "15px" }}
          onChange={handleSelectChange}
          value={selectedRefugees}
          optionLabelProp="label"
        >
          {refugeelist.map((refugee: any) => (
            <Select.Option key={refugee.id} value={refugee.id} label={`${refugee.firstName} ${refugee.lastName}`}>
              <Checkbox  style={{ marginRight: "8px" }} />
              {refugee.firstName} {refugee.lastName}
            </Select.Option>
          ))}
        </Select>

        <Input.TextArea
          rows={4}
          placeholder="Type your broadcast message here..."
          onChange={handleTypeBroadcastMessage}
        />
      </Modal>
    </div>
  )
}
