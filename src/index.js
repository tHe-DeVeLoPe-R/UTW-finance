import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AddVendor from './components/AddVendor';
import GetAllUsers from './components/GetAllUsers';
import GetAllVendors from './components/GetAllVendors';
import UpdateVendor from './components/UpdateVendor';
import UpdateUser from './components/UpdateUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
let routes  = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/dashboard',
    element: <Dashboard />
  },
  {
    path:'/add-transaction',
    element: <AddTransaction />
  },
  {
    path:'/add-vendor',
    element: <AddVendor />
  },
  {
    path:'/update-transactions',
    element: <GetAllUsers />
  },
  {
    path:'/update-vendors',
    element: <GetAllVendors />
  },
  {
    path:'/update-users/:id',
    element: <UpdateUser />
  },
  {
    path:'/update-vendors/:id',
    element: <UpdateVendor />
  },
])
root.render(
  <React.StrictMode>
    <RouterProvider  router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
