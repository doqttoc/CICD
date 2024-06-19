


// App.js
import React from 'react';
import { connect } from 'react-redux';

const TestRedux = ({ count, increment, decrement }) => {
    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.count
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);