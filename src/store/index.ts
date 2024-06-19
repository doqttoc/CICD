// store.js
import { createStore } from 'redux';

// 定义 reducer
const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

// 创建 Redux store
const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()))


store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
// {value: 1}
store.dispatch({ type: 'INCREMENT' })
// {value: 2}
store.dispatch({ type: 'DECREMENT' })

export default store;