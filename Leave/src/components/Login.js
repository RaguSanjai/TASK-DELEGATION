import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/register.css'; 
import axios from 'axios';
import { useAuth } from './Auth';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [userlist, setUserlist] = useState([]);
  const auth = useAuth();

  useEffect(() => {
      axios.get('http://localhost:3005/Signup')
          .then(res => setUserlist(res.data))
          .catch(err => {
              console.error('Error fetching user data:', err);
          });
  }, []);

  const handleLogin = (e) => {
      e.preventDefault();
      const user = userlist.find(a => a.name === name && a.pass === pass);
      if (user) {
        console.log(name)
          auth.login(name);
          if (user.name === 'admin' && user.pass === 'admin') {
              navigate('/admin');
          } else {
              navigate('/');
          }
      } else {
          alert("Invalid name or password");
      }
  }

  const handleLogout = () => {
      auth.logout();
      navigate('/');
  }
    return (
        <div className="register-parent">
            <h1 className="title-log-register" data-aos="fade-down">Login Here..!</h1>
            <div className="register-form-div" data-aos="flip-right">
                <form onSubmit={handleLogin} className="register-form">
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Username" id="username" />
                    <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="Password" id="password" />
                    <button type="submit" id="register-btn">Login</button>
                    <p className="register-message register-login">
                        <span className="logmes">Don't have an account? </span>
                        <span><NavLink className="logli" to="/register">Register now</NavLink></span>
                    </p>
                </form>
            </div>
        </div>
    );
}

