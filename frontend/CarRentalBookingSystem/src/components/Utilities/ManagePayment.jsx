import React, { useState, useEffect } from 'react';

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
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>User ID</th>
            {/* Add more fields as needed */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
