import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
//import {useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';

const initialState = {
  name: "",
  email: "",
  contact: "",
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;

  const navigate = useNavigate(); // Using useHistory hook correctly

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        setState({ ...response.data[0] });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const addUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/user", data);
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide a value for each input field");
    } else {
      if (!id) {
        await addUser(state);
      } else {
        await updateUser(state, id);
      }
      // setTimeout(() => history.push("/"), 500);
      navigate('/');
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ 
      ...state, 
      [name]: value,
    });
  };

  

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id="name"
          name="name"
          placeholder='Enter Name ...'
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id="email"
          name="email"
          placeholder='Enter Email ...'
          onChange={handleInputChange}
          value={email}
        />
        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          id="contact"
          name="contact"
          placeholder='Enter Contact ...'
          onChange={handleInputChange}
          value={contact}
        />
        <input type='submit' value={id ? "Update" : "Add"} />
      </form>
    </div>
  )
}

export default AddEdit;
