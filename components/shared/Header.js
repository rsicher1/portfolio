import React, { Fragment } from 'react';
import Link from 'next/link';
import { Link as NextRoutesLink } from '../../server/routes';

import '../../styles/main.scss';

const Header = props => {
  const { title } = props;
  return (
    <Fragment>
      <p>{title}</p>
      <p className="custom-class">Styled jsx p element</p>
      <p className="custom-class-from-file">Styled p element from file</p>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/blog">
        <a>Blog</a>
      </Link>

      <Link href="/portfolio">
        <a>Portfolio</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <Link href="/cv">
        <a>CV</a>
      </Link>

      <NextRoutesLink route="test" params={{ id: '2' }}>
        <a>Test id: 2</a>
      </NextRoutesLink>

      <NextRoutesLink route="/test/5">
        <a>Test id: 5</a>
      </NextRoutesLink>

      <style jsx>
        {`
          a {
            font-size: 20px;
          }

          .custom-class {
            color: red;
          }
        `}
      </style>
    </Fragment>
  );
};

export default Header;
