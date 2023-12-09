import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Fetch existing vehicles from the backend when the component mounts
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/vehicle/all');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error.message);
    }
  };

  const handleCreateVehicle = () => {
    // Implement your create logic here
    // For example, you can show a modal for creating a new vehicle
    setShowCreateModal(true);
  };

  return (
    <div>
      <h3>Manage Vehicles</h3>

      {/* Display vehicles in a table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Model Year</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Capacity</th>
            <th>Plate Number</th>
            <th>Rate</th>
            {/* Add more fields as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.Vehicle_id}>
              <td>{vehicle.Vehicle_id}</td>
              <td>{vehicle.Vehicle_name}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.Vehicle_model_year}</td>
              <td>{vehicle.Vehicle_brand}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.capacity}</td>
              <td>{vehicle.plate_number}</td>
              <td>${vehicle.rate}</td>
              {/* Add more fields as needed */}
              <td>
                <Button variant="warning" onClick={() => handleEditVehicle(vehicle)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteVehicle(vehicle.Vehicle_id)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
          <td colSpan="9"></td>
            <td>
              <Button variant="success" onClick={handleCreateVehicle}>Create</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Create Modal (Add this section) */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form fields for creating a new vehicle */}
          <Form>
            {/* ... */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveCreateVehicle()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageVehicles;
