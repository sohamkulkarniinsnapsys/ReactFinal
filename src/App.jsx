import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser()
      .then((userData) => {
        if (!mounted) return;

        if (userData) {
          dispatch(login(userData));
          // Redirect to dashboard or home after successful login
          navigate("/dashboard"); 
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
        dispatch(logout());
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [dispatch, navigate]);

  if (loading) return null;

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
