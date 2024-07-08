import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Homes.css";
import axios from "axios";
import { toast } from 'react-toastify';

const Homes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        toast.success(response.data);
        getUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                {/* View Button */}
                <Link to={`/view/${item.id}`}>
                  <button className='btn btn-view'>View</button>
                </Link>
                {/* Edit Button */}
                <Link to={`/update/${item.id}`}>
                  <button className='btn btn-edit'>Edit</button>
                </Link>
                {/* Delete Button */}
                <button className='btn btn-delete' onClick={() => onDeleteUser(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Homes;
