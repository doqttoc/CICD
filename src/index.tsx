import React from "react";


import App from "./App";

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



root.render(
    <StrictMode>
        <HashRouter>
            <App />

        </HashRouter>
    </StrictMode>,
);
// ReactDOM.render(
//     <div>
//         <React.StrictMode>
//             <HashRouter>
//                 <App></App>
//             </HashRouter>
//         </React.StrictMode>

//     </div>, document.getElementById('root'));