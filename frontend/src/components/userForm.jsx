import React, { useState } from "react";
import axios from "axios";
import "../styles/userForm.css"

function UserForm({ fetchUsers }) {
  const [user, setUser] = useState({ name: "", email: "", dob: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users", user);
    setUser({ name: "", email: "", dob: "" });
    fetchUsers();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="date"
        name="dob"
        value={user.dob}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
