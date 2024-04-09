import { useDebounce, useSetState } from 'ahooks';
import { Divider } from 'antd';
import React, { useState } from 'react';

interface State {
  hello: string;
  count: number;
  [key: string]: any;
}

export default () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });
  const [state, setState] = useSetState<State>({
    hello: '',
    count: 0,
    user: []

  });


  return (
    <div>
      <Divider></Divider>
      <h2> Amazing ! what a great fuck product the askchatai is !! </h2>
      <h1>007007</h1>
      <h1>do it do it omg  must practice everyday</h1>
      <h2>so what's wrong with the githubwebhook now  whats the problem??</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ hello: 'world' })}>
          set hello
        </button>
        <button type="button" onClick={() => setState({ foo: 'bar' })} style={{ margin: '0 8px' }}>
          set foo
        </button>
        <button type="button" onClick={() => setState((prev) => ({ count: prev.count + 1 }))}>
          count + 1
        </button>
        <button type="button" onClick={() => setState((prev) => ({ count: prev.count - 1 }))}>
          count --
        </button>
        <button type="button">
          aaaa bbbb
        </button>
        <button type="button">
          ccc dddd
        </button>
      </p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
      <div style={{height:"300px"}}>11</div>
      <div style={{height:"300px"}}>11</div>
      <div style={{height:"300px"}}>11</div>
    </div>
  );
};