import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState(null);
  const [editingDriverName, setEditingDriverName] = useState('');
  const [editingDriverEmail, setEditingDriverEmail] = useState('');
  const [deletingDriverId, setDeletingDriverId] = useState(null);

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

  const handleEditDriver = async (driver) => {
    try {
      const driverId = driver.DriverID;

      const response = await fetch(`http://localhost:8081/api/driver/edit/${driverId}`);
      const data = await response.json();

      // Log the data to the console to inspect its structure
      console.log('Driver data for editing:', data);

      setEditingDriverId(driverId);
      setEditingDriverName(data.FullName);
      setEditingDriverEmail(data.EmailAddress);

      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching driver data for edit:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDeleteDriver = (driverId) => {
    setDeletingDriverId(driverId);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingDriverId(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingDriverId(null);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedDriverData = {
        FullName: editingDriverName,
        EmailAddress: editingDriverEmail,
      };

      const response = await fetch(`http://localhost:8081/api/driver/update/${editingDriverId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDriverData),
      });

      const data = await response.json();

      // Check if the update was successful
      if (response.ok) {
        console.log(data.message); // Log success message
        fetchDrivers(); // Update the driver list
      } else {
        console.error('Failed to update driver profile:', data.message);
        // Handle the error (e.g., show an error message to the user)
      }

      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating driver profile:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/driver/delete/${deletingDriverId}`);
      console.log(response.data); // Log the server response

      // Handle successful deletion (e.g., show a success message, update the UI)
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error.message);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setShowDeleteModal(false); // Close the confirmation modal
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
                <Button variant="warning" onClick={() => handleEditDriver(driver)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteDriver(driver.DriverID)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="11"></td>
            <td>
              <Button variant="success" onClick={{/*handleCreateUser*/}}>Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>{`Edit Driver with ID: ${editingDriverId}`}</Form.Label>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={editingDriverName} onChange={(e) => setEditingDriverName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder="Enter email" value={editingDriverEmail} onChange={(e) => setEditingDriverEmail(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the driver with ID: {deletingDriverId}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDrivers;
