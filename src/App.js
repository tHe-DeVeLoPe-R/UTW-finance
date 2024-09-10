import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AddVendor from './components/AddVendor';
import GetAllUsers from './components/GetAllUsers';
import GetAllVendors from './components/GetAllVendors';
import UpdateVendor from './components/UpdateVendor';
import UpdateUser from './components/UpdateUser';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/add-vendor" element={<AddVendor />} />
        <Route path="/update-transactions" element={<GetAllUsers />} />
        <Route path="/update-vendors" element={<GetAllVendors />} />
        <Route path="/update-users/:id" element={<UpdateUser />} />
        <Route path="/update-vendors/:id" element={<UpdateVendor />} />
      </Routes>
    </div>
  );
}

export default App;
