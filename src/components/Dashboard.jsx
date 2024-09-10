import React from 'react'
import './Dashboard.css'
import plane from '../images/plane.jpeg'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const isMobile = useMediaQuery({query: '(max-width: 600px)'});
    const navigate = useNavigate();
  return (
    <div className='dashboard'>
        <img className='headimage' src={plane} alt="" />
        <h1 className='dashboard-heading'>Manage here</h1>
     <button onClick={()=>{navigate('/add-transaction')}} className={`styled-transaction-button ${isMobile?'btn-mobile':'btn-desktop'}`}>Add new client</button>

     <button onClick={()=>{navigate('/add-vendor')}} className={`styled-transaction-button ${isMobile?'btn-mobile':'btn-desktop'}`}>Add new vendor</button>

     <button onClick={()=>{navigate('/update-transactions')}} className={`styled-find-button ${isMobile?'btn-mobile':'btn-desktop'}`}>List all clients</button>
     <button onClick={()=>{navigate('/update-vendors')}} className={`styled-find-button ${isMobile?'btn-mobile':'btn-desktop'}`}>List all vendors</button>
     <button onClick={()=>{navigate('/')}} className={`logout-button ${isMobile?'btn-mobile':'btn-desktop'}`}>Logout</button>
     <br />
    </div>
  )
}
