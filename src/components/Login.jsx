import React, { useState } from 'react';
import './Login.css';
import { useMediaQuery } from 'react-responsive';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../config.js';
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [password, setPassword] = useState(''); // State for password
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
       

        try {
            // Query Firestore to check if a document with the given password exists
            const q = query(
                collection(db, 'users'),
                
                where('pin', '==', password.trim()) // Ensure this matches your data structure
            );
            const querySnapshot = await getDocs(q);
            setLoading(false);

            if (!querySnapshot.empty) {
                navigate('/dashboard')
                setIsLoggedIn(true);
                setError('');
            } else {
                
                setIsLoggedIn(false);
                setError('Invalid password');
            }
        } catch (error) {
            
            setError('Error checking credentials');
        }
    };

    return isMobile? (
       
        <div className={`login-main`}>
            
            <h1 className='heading'>Urwat il Wusqa Travels</h1> <br /><br />
            <form className='loginform' onSubmit={handleLogin}>
                <div className="input-container">
                    <input className=''
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter P.I.N" 
                        required
                    />
                </div>
                <button 
                    className={`styled-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`} 
                    type="submit"
                >
                    Login
                </button> <br />

                {loading? <img className='loading-circle' src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif" alt="loading" /> : ''}
           
           {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

          
        </div>
    ): (<div className='desktop'> 

        <h1 className='desktop-heading'>This app is build for mobile devices <br /> Desktop version will be launched soon</h1>
    </div>);
}
