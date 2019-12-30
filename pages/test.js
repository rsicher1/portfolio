import React from 'react';
import axios from 'axios';
import Link from 'next/link';

import BaseLayout from '../components/layouts/BaseLayout';

const Test = props => {
  const { testId } = props;
  return (
    <BaseLayout title="Portfolio">
      <h1>I am test page</h1>
      <p>Test id: {testId}</p>
    </BaseLayout>
  );
};

Test.getInitialProps = async ({ query }) => {
  const testId = query.id;
  return { testId };
};

export default Test;
