import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Admin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatedReason, setUpdatedReason] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [newRequestName, setNewRequestName] = useState('');
  const [newRequestReason, setNewRequestReason] = useState('');
  const [newRequestStartDate, setNewRequestStartDate] = useState('');
  const [newRequestEndDate, setNewRequestEndDate] = useState('');

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios.get('http://localhost:3005/users/')
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3005/users/${id}`)
      .then(() => {
        fetchLeaveRequests();
      })
      .catch(error => {
        console.error('Error deleting leave request:', error);
      });
  };

  const handleUpdate = () => {
    if (selectedRequest) {
      axios.put(`http://localhost:3005/users/${selectedRequest.id}`, {
        reason: updatedReason,
        start_date: updatedStartDate,
        end_date: updatedEndDate
      })
        .then(() => {
          fetchLeaveRequests();
          setSelectedRequest(null);
          setUpdatedReason('');
          setUpdatedStartDate('');
          setUpdatedEndDate('');
        })
        .catch(error => {
          console.error('Error updating leave request:', error);
        });
    }
  };

  const handleAddRequest = () => {
    axios.post('http://localhost:3005/users/', {
      name: newRequestName,
      reason: newRequestReason,
      start_date: newRequestStartDate,
      end_date: newRequestEndDate
    })
    .then(() => {
      fetchLeaveRequests();
      setNewRequestName('');
      setNewRequestReason('');
      setNewRequestStartDate('');
      setNewRequestEndDate('');
    })
    .catch(error => {
      console.error('Error adding leave request:', error);
    });
  };

  return (
    <div>
      <h2>TASK LIST</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>TASK</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
              <td>
                <button onClick={() => setSelectedRequest(request)}>Edit</button>
                <button onClick={() => handleDelete(request.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <div>
          <h2>Edit Task list</h2>
          <p>Name: {selectedRequest.name}</p>
          <label htmlFor="start_date">Start Date:</label>
          <input type="date" id="start_date" value={updatedStartDate} onChange={(e) => setUpdatedStartDate(e.target.value)} required />

          <label htmlFor="end_date">End Date:</label>
          <input type="date" id="end_date" value={updatedEndDate} onChange={(e) => setUpdatedEndDate(e.target.value)} required />

          <label htmlFor="reason">Task Managing:</label>
          <textarea id="reason" value={updatedReason} onChange={(e) => setUpdatedReason(e.target.value)} rows="4" required></textarea>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <div>
        <h2>Add New Task</h2>
        <label htmlFor="newRequestName">Name:</label>
        <input type="text" id="newRequestName" value={newRequestName} onChange={(e) => setNewRequestName(e.target.value)} required />

        <label htmlFor="newRequestStartDate">Start Date:</label>
        <input type="date" id="newRequestStartDate" value={newRequestStartDate} onChange={(e) => setNewRequestStartDate(e.target.value)} required />

        <label htmlFor="newRequestEndDate">End Date:</label>
        <input type="date" id="newRequestEndDate" value={newRequestEndDate} onChange={(e) => setNewRequestEndDate(e.target.value)} required />

        <label htmlFor="newRequestReason">Task:</label>
        <textarea id="newRequestReason" value={newRequestReason} onChange={(e) => setNewRequestReason(e.target.value)} rows="4" required></textarea>
        <button onClick={handleAddRequest}>Add Task</button>
      </div>
    </div>
  );
};
