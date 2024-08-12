import React from "react";

import { Provider } from 'react-redux';
import App from "./App";
import store from "./store";

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



root.render(
    <Provider store={store}>
        <StrictMode>
            <HashRouter>
                <App />

            </HashRouter>
        </StrictMode>
    </Provider>
);
// ReactDOM.render(
//     <div>
//         <React.StrictMode>
//             <HashRouter>
//                 <App></App>
//             </HashRouter>
//         </React.StrictMode>

//     </div>, document.getElementById('root'));