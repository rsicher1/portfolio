import React from 'react';

import { useAuth0 } from '../../oauth0/react-oauth0-spa';

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <span
      className="nav-link port-navbar-link clickable"
      onClick={() =>
        logout({
          returnTo: window.location.href,
        })
      }
    >
      Logout
    </span>
  );
};

export default Logout;
