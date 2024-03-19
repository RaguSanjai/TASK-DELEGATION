import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

export const Mangetask = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
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
          
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
