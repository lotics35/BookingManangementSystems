import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch existing payments from the backend when the component mounts
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/payment/all');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error.message);
    }
  };

  return (
    <div>
      <h3>Manage Payments</h3>

      {/* Display payments in a table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>User ID</th>
            {/* Add more fields as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.bookingId}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.status}</td>
              <td>{payment.userId}</td>
              {/* Add more fields as needed */}
              <td>
                <Button variant="warning" onClick={() => handleEditPayment(payment)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeletePayment(payment.paymentId)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="7"></td>
            <td>
              <Button variant="success" onClick={{/*handleCreateBooking*/}}>Create</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ManagePayments;
