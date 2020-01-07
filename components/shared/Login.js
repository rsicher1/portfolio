import React from 'react';

import { useAuth0 } from '../../oauth0/react-oauth0-spa';

const Login = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <span
      className="nav-link port-navbar-link clickable"
      onClick={() => loginWithPopup({})}
    >
      Login
    </span>
  );
};

export default Login;
