// src/components/AuthLayout.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * AuthLayout (aka Protected)
 * - authentication = true  => route requires login
 * - authentication = false => route is public (guest-only)
 */
export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[AuthLayout] authStatus:", authStatus, "authentication:", authentication);
    // Wait until authStatus is known (null => not yet checked)
    if (authStatus === null) return;

    if (authentication && !authStatus) {
      // protected route but user not logged in
      navigate('/login', { replace: true });
    } else if (!authentication && authStatus) {
      // public route but user is logged in
      navigate('/', { replace: true });
    }

    setLoading(false);
  }, [authStatus, authentication, navigate]);

  if (loading) return <h1>Loading...</h1>;
  return <>{children}</>;
}
