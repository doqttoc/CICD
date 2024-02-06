import { useSetState } from 'ahooks';
import React from 'react';

interface State {
  hello: string;
  count: number;
  [key: string]: any;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: '',
    count: 0,
  });

  return (
    <div>
      <h1>hey man come on  just practice everyday!</h1>
      <h2> Amazing ! what a great fuck product the askchatai is !! </h2>
      <h2>Danm it shit you fool sun of beach you mother fucker asshoe  </h2>
      <h2>Just add something new hhh.</h2>
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
    </div>
  );
};