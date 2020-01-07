import React from 'react';
import Link from 'next/link';

const CustomNavLink = props => {
  const { children, href, brand } = props;

  return (
    <Link href={href}>
      <a
        className={
          brand ? 'navbar-brand port-navbar-brand' : 'nav-link port-navbar-link'
        }
      >
        {children}
      </a>
    </Link>
  );
};

export default CustomNavLink;
