import React, { useState, useEffect } from 'react';
import './GetAllUsers.css'; // Use same or create GetAllVendors.css for specific styling
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useMediaQuery } from 'react-responsive';
import db from '../config'; // Assuming you have Firebase db configured
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function GetAllVendors() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'vendors'));
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setVendors(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching vendors');
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'vendors', id));
            setVendors(vendors.filter(vendor => vendor.id !== id));
            setLoading(false);
            toast.success('Vendor deleted successfully');
        } catch (error) {
            setLoading(false);
            toast.error('Error deleting vendor');
            setError('Error deleting vendor');
        }
    };

    const handleVendorEdit = (id, vendor) => {
        const formattedId = id.replace(/\s+/g, ''); // Remove all spaces
        navigate(`/update-vendors/${formattedId}`, { state: { vendor } });
    };
    

    return (
        <div className={`transactions-list-container ${isMobile ? 'mobile' : 'desktop'}`}>
            <ToastContainer />
            <h2 className="heading">Manage Vendors</h2>
            {loading ? (
                <img
                    className="loading-circle"
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif"
                    alt="loading"
                />
            ) : error ? (
                toast.error(error)
            ) : (
                <ul className="transactions-list">
                    {vendors.map(vendor => (
                        <li key={vendor.nickname} className="transaction-item">
                            <div className="transaction-info">
                            <p><strong>Nickname:</strong> {vendor.nickname}</p>
                                <p><strong>Total:</strong> {vendor.total}</p>
                                <p><strong>Paid:</strong> {vendor.paid}</p>
                                <p><strong>Left:</strong> {vendor.left}</p>
                                <p><strong>Date:</strong> {vendor.date}</p>
                                <p><strong>Comments:</strong> {vendor.comments}</p>
                            </div>
                            <div className="transaction-actions">
                                <button className="edit-button" onClick={() => handleVendorEdit(vendor.nickname, vendor)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(vendor.nickname)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <br />
            <button
                onClick={() => {
                    navigate('/dashboard');
                }}
                className={`styled-back-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`}
            >
                Back
            </button>
        </div>
    );
}
