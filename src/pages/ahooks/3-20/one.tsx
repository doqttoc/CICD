import { useMount, useBoolean } from 'ahooks';
import { message,Button } from 'antd';
import React from 'react';

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
    </>
  );
};