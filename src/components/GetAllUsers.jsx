import React, { useState, useEffect } from 'react';
import './GetAllUsers.css'; // You can style accordingly
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useMediaQuery } from 'react-responsive';
import db from '../config'; // Assuming you have db set up already
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function GetAllUsers() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'transactions'));
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching transactions');
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'transactions', id));
            setTransactions(transactions.filter(transaction => transaction.id !== id));
            setLoading(false)
            toast.success('Deleted successfully')
        } catch (error) {
            setLoading(false)
           toast.error('Error deleting transaction:', error);
            setError('Error deleting transaction');
        }
    };

    const handleEdit = (id, transaction) => {
        const formattedId = id.replace(/\s+/g, ''); // Remove all spaces
        navigate(`/update-users/${formattedId}`, { state: { transaction } });
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
        <div className={`transactions-list-container ${isMobile ? 'mobile' : 'desktop'}`}>
            <ToastContainer/>
            <h2 className='heading'>Select to update</h2>
            {loading ? (
                <img className='loading-circle' src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif" alt="loading" />
            ) : error ? (
                toast.error({error})
            ) : (
                <ul className="transactions-list">
                    {transactions.map(transaction => (
                        <li key={transaction.nickname} className="transaction-item">
                            <div className="transaction-info">
                                <p><strong>Nickname:</strong> {transaction.nickname}</p>
                                <p><strong>Total:</strong> {transaction.total}</p>
                                <p><strong>Paid:</strong> {transaction.paid}</p>
                                <p><strong>Left:</strong> {transaction.left}</p>
                                <p><strong>Date:</strong> {formatDate(transaction.date)}</p>
                                <p><strong>Comments:</strong> {transaction.comments}</p>
                            </div>
                            <div className="transaction-actions">
                                <button className="edit-button" onClick={() => handleEdit(transaction.nickname, transaction)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(transaction.nickname)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <br />
            <button onClick={() => {
                navigate('/dashboard')
            }} className={`styled-back-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`}>Back</button>
        </div>
    );
}
