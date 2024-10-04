import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UserManagementDetails } from '../../Mock/UserManagement';
import { InfoCircleOutlined } from '@ant-design/icons';
import './UserManagement.css';

interface User {
  id: number;
  name: string;
}


// interface UserManagementState {
//   admins: User[];
//   agents: User[];
//   refugees: User[];
// }

const UserManagement: React.FC = () => {

  const [admins, setAdmins] = useState<User[]>(UserManagementDetails.admins);
  const [agents, setAgents] = useState<User[]>(UserManagementDetails.agents);
  const [refugees, setRefugees] = useState<User[]>(UserManagementDetails.refugees);


  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; 
    const { source, destination } = result;
    const sourceList = getListById(source.droppableId);
    const destinationList = getListById(destination.droppableId);
    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);
    updateListById(source.droppableId, sourceList);
    updateListById(destination.droppableId, destinationList);
  };

  const getListById = (id: string): User[] => {
    switch (id) {
      case 'admins':
        return admins;
      case 'agents':
        return agents;
      case 'refugees':
        return refugees;
      default:
        return [];
    }
  };

  const updateListById = (id: string, newList: User[]) => {
    switch (id) {
      case 'admins':
        setAdmins(newList);
        break;
      case 'agents':
        setAgents(newList);
        break;
      case 'refugees':
        setRefugees(newList);
        break;
      default:
        break;
    }
  };

  const renderTable = (title: string, items: User[], droppableId: string) => (
    <Droppable droppableId={droppableId}>
      {(provided:any) => (
        <div
          className="table-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="table-header">{title}</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${droppableId}-${item.id}`}
                  index={index}
                >
                  {(provided:any) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
          <h2 className='Heading'>User Management</h2>
          <h4 className='Label' > <InfoCircleOutlined className='infoClass' />Drag And Drop the records to switch from one table to other.</h4>
      <div className="user-management">
        {renderTable('Admins', admins, 'admins')}
        {renderTable('Agents', agents, 'agents')}
        {renderTable('Refugees', refugees, 'refugees')}
      </div>
    </DragDropContext>
  );
};

export default UserManagement;
