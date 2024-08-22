import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'

// import { CartProvider } from './Pages/Contex/Cartcontex'

// import { CartProvider } from './Componenets/Contex/Cartcontex.jsx'

import {ToastContainer} from 'react-toastify'
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import Admin from './Components/ADMIN/Admin';

    


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
    <BrowserRouter>
    {/* <CartProvider> */}
    <ToastContainer/>
    {/* <Popup trigger={<button> Trigger</button>} position="right center"> */}
       
        {/* <Admin/> */}
        <App />
        {/* </Popup> */}

    {/* </CartProvider> */}

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
