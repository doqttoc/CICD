import { useBoolean, useMount } from 'ahooks';
import { Button, message } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useBoolean(false);

  return (
    <>
      <Button type="primary" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </Button>
      {state && <MyComponent />}

      <p>
        <Link to="/child1">child1</Link>

      </p>
      <p>
        <Link to="/child2">child2</Link>

      </p>
      <p>
        <Link to="/child3">child3</Link>

      </p>
      <div>
      <Outlet></Outlet>
      </div>
    </>
  );
};