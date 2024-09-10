import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../config'; // Assuming Firebase db is configured
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateUser.css'
import { useMediaQuery } from 'react-responsive';

export default function UpdateUser() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const location = useLocation(); // Get the transaction data passed via navigate
    const navigate = useNavigate();

    const [transactionData, setTransactionData] = useState(location.state.transaction); // Pre-fill with transction data
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransactionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const transactionDocRef = doc(db, 'transactions', location.state.transaction.nickname);
        setLoading(true);

        try {
            await updateDoc(transactionDocRef, transactionData);
            toast.success('transaction updated successfully!');
            setLoading(false);
            navigate('/update-transactions'); // Redirect after success
        } catch (error) {
            setLoading(false);
            toast.error('Error updating transaction');
            console.error('Error updating transaction:', error);
        }
    };

    const formatDate = (date) => {
        if (!(date instanceof Date)) {
            date = new Date(date); // Convert if not already a Date object
        }
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <div className="update-form-container">
            <ToastContainer />
            <h2>Update transaction</h2>
            <form>
                
                <div className="form-group">
                    <label>Total</label>
                    <input
                        type="number"
                        name="total"
                        value={transactionData.total}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Paid</label>
                    <input
                        type="number"
                        name="paid"
                        value={transactionData.paid}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Left</label>
                    <input
                        type="number"
                        name="left"
                        value={transactionData.left}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Comments</label>
                    <input
                        type="text"
                        name="comments"
                        value={transactionData.comments}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formatDate(transactionData.date)}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleUpdate}>
                    Update transaction
                </button>

                {loading ? <img
                    className="loading-circle"
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif"
                    alt="loading"
                /> : ''}
            </form>
            <button onClick={() => {
                navigate('/update-transactions')
            }} className={`styled-back-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`}>Back</button>
        </div>
    );
}
