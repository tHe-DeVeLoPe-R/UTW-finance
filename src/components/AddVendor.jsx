import React, { useState } from 'react'
import './AddVendor.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddVendor() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [comments, setComments] = useState('');
    const [date, setDate] = useState('');
    const [nickname, setNickname] = useState('');
    const [paid, setPaid] = useState('');
    const [total, setTotal] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

     
    const addClientTransaction = async (e) => {
        setLoading(true);
        e.preventDefault();
        const clientData = {
            comments,
            date: new Date(date), // Date in the correct format
            left: Number(total - paid),
            nickname: nickname.toLowerCase().trim(),
            paid: Number(paid), // Convert to a number
            total: Number(total) // Convert to a number
        };
        try {
            //checking existance
            const docRef = doc(db, 'vendors', nickname);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // If the document with the nickname already exists, show an error
                setLoading(false);
                setError('This vendor is already in the list.');
            } else {
                
                // Add a document with the ID as 'nickname' to the 'transactions' collection
                await setDoc(doc(db, 'vendors', nickname), clientData);
                setLoading(false);
                toast.success("Vendor added successfully!");
            }

        } catch (error) {
            setLoading(false);
            setError('Error adding vendor:', error);
        }

    }

    return (

        <div className="form-container">
            <ToastContainer/>
            <h2>Vendor Data Entry Form</h2>
            <form onSubmit={addClientTransaction}>
                <div className="form-group">

                    <div className="form-group">
                        <label htmlFor="nickname">Nickname:</label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Enter your nickname"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Enter date"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="total">Total:</label>
                        <input
                            type="number"
                            id="total"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            placeholder="Enter total amount"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="paid">Paid:</label>
                        <input
                            type="number"
                            id="paid"
                            value={paid}
                            onChange={(e) => setPaid(e.target.value)}
                            placeholder="Enter amount paid"
                            required
                        />
                    </div>

                    <div className="form-group">
                    <label htmlFor="comments">Comments:</label>
                    <input
                        type="text"
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Enter your comment"
                        required
                    />
                    </div>

                    
                </div>
                <button type="submit" className="submit-button">Add vendor</button> <br />
                {loading ? <img className='loading-circle' src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif" alt="loading" /> : ''}

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <br /> <br />
            <button onClick={() => {
                navigate('/dashboard')
            }} className={`styled-back-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`}>Back</button>
        </div>
    )
}
