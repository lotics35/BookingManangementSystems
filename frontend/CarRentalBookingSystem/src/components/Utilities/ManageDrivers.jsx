import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/manageUsers.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Add this import

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch existing drivers from the backend when the component mounts
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/driver/all');
      const data = await response.json();

      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error.message);
    }
  };

  return (
    <div>
      <h3>Manage Drivers</h3>

      {/* Display drivers in a table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>License Number</th>
            <th>License Expiry Date</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Nationality</th>
            <th>License Issue Date</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.DriverID}>
              <td>{driver.DriverID}</td>
              <td>{driver.FullName}</td>
              <td>{driver.EmailAddress}</td>
              <td>{driver.ContactNumber}</td>
              <td>{driver.LicenseNumber}</td>
              <td>{driver.LicenseExpiryDate}</td>
              <td>{driver.Address}</td>
              <td>{driver.DateOfBirth}</td>
              <td>{driver.Nationality}</td>
              <td>{driver.LicenseIssueDate}</td>
              <td>{driver.ActiveStatus === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  );
};

export default ManageDrivers;
