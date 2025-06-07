import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const BASE_SERVER_URL = process.env.REACT_APP_API_BASE_URL
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_SERVER_URL}/api/auth/me`, {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, token]);

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p></p>
    </div>
  );
};

export default Profile;