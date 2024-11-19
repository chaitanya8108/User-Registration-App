import React, { useState } from "react";
import axios from "axios";
import "../styles/userList.css"; // Assuming you have some styles for the table

function UserList({ users, fetchUsers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers(); // Re-fetch the users after deletion
  };

  const handleEdit = (user) => {
    setCurrentUser(user); // Set the user to edit
    setIsEditing(true); // Show the edit form
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name: currentUser.name,
      email: currentUser.email,
      dob: currentUser.dob,
    };

    await axios.put(`http://localhost:5000/api/users/${currentUser._id}`, updatedUser);
    fetchUsers(); // Re-fetch the users after update
    setIsEditing(false); // Close the edit form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  return (
    <div id="userlist">
      {/* Only render the table if there are users */}
      {users && users.length > 0 ? (
        <>
          <h2>Registered Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>D.O.B</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td> {/* Formatting the date */}
                  <td>
                    <button onClick={() => handleEdit(user)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user._id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Form Modal */}
          {isEditing && (
            <div className="edit-modal">
              <div className="edit-modal-content">
                <h3>Edit User</h3>
                <form onSubmit={handleSave}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={currentUser.name}
                      onChange={handleInputChange}
                      style={{marginLeft: "1rem", width: "60%"}}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={currentUser.email}
                      onChange={handleInputChange}
                      style={{marginLeft: "1rem", width: "60%"}}
                    />
                  </label>
                  <label>
                    D.O.B:
                    <input
                      type="date"
                      name="dob"
                      value={currentUser.dob}
                      onChange={handleInputChange}
                      style={{marginLeft: "1rem", width: "50%"}}
                    />
                  </label>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No registered users found.</p> // Optionally render a message if no users are available
      )}
    </div>
  );
}

export default UserList;
