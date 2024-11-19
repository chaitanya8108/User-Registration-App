import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./styles/App.css"

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="App">
      <div className="container">
        <UserForm fetchUsers={fetchUsers} />
      </div>
      
      <div>
        <UserList users={users} fetchUsers={fetchUsers} />
      </div>
    </div>
  );
}

export default App;
