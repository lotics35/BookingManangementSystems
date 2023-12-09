import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/manageUsers.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Add this import

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserName, setEditingUserName] = useState('');
  const [editingUserEmail, setEditingUserEmail] = useState('');
  const [editingUserNum, setEditingUserNum] = useState('');
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [editUserModal, setEditUserModal] = useState(false);

  useEffect(() => {
    // Fetch existing users from the backend when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/user/users');
      const data = await response.json();

      // Ensure data.users is an array before updating state
      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error('Invalid user data:', data);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/user/users/${deletingUserId}`);
      console.log(response.data); // Log the server response

      // Handle successful deletion (e.g., show a success message, update the UI)
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setShowDeleteModal(false); // Close the confirmation modal
    }
  };

  const handleEditUser = async (user) => {
    try {
      // Extract userId from the user object
      const userId = user.id;
  
      const response = await fetch(`http://localhost:8081/api/user/edit/${userId}`);
      const data = await response.json();
  
      // Log the data to the console to inspect its structure
      console.log('User data for editing:', data);
  
      setEditingUserId(userId);
      setEditingUserName(data.name);
      setEditingUserEmail(data.email);
      setEditingUserNum(data.contactNumber);
  
      setEditUserModal(true);
    } catch (error) {
      console.error('Error fetching user data for edit:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDelete = (userId) => {
    setDeletingUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUserId(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingUserId(null);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUserData = {
        name: editingUserName,
        email: editingUserEmail,
        contactNumber: editingUserNum,
      };

      const response = await fetch(`http://localhost:8081/api/user/profile/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();
      // Check if the update was successful
      if (response.ok) {
        console.log(data.message); // Log success message
        fetchUsers(); // Update the user list
      } else {
        console.error('Failed to update user profile:', data.message);
        // Handle the error (e.g., show an error message to the user)
      }
      setEditUserModal(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <h3>Manage Users</h3>

      {/* Display a table of users */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Num</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                {/* Add actions buttons or links as needed */}
                <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={editUserModal} onHide={() => setEditUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label>{`Edit User with ID: ${editingUserId}`}</Form.Label>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={editingUserName} onChange={(e) => setEditingUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder="Enter email" value={editingUserEmail} onChange={(e) => setEditingUserEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type='tel' placeholder="Enter number" value={editingUserNum} onChange={(e) => setEditingUserNum(e.target.value)}/>
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the user with ID: {deletingUserId}?</p>
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

export default ManageUsers;