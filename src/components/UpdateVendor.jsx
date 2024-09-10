import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../config'; // Assuming Firebase db is configured
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateVendor.css'
import { useMediaQuery } from 'react-responsive';


export default function UpdateVendor() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const location = useLocation(); // Get the vendor data passed via navigate
    const navigate = useNavigate();

    const [vendorData, setVendorData] = useState(location.state.vendor); // Pre-fill with vendor data
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVendorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const vendorDocRef = doc(db, 'vendors', location.state.vendor.nickname);
        setLoading(true);

        try {
            await updateDoc(vendorDocRef, vendorData);
            toast.success('Vendor updated successfully!');
            setLoading(false);
            navigate('/update-vendors'); // Redirect after success
        } catch (error) {
            setLoading(false);
            toast.error('Error updating vendor');
            console.error('Error updating vendor:', error);
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
            <h2>Update Vendor</h2>
            <form>
               
                <div className="form-group">
                    <label>Total</label>
                    <input
                        type="number"
                        name="total"
                        value={vendorData.total}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Paid</label>
                    <input
                        type="number"
                        name="paid"
                        value={vendorData.paid}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Left</label>
                    <input
                        type="number"
                        name="left"
                        value={vendorData.left}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Comments</label>
                    <input
                        type="text"
                        name="comments"
                        value={vendorData.comments}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formatDate(vendorData.date)}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleUpdate}>
                    Update Vendor
                </button>

                {loading ? <img
                    className="loading-circle"
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZqdjExdXVxaWV0cmFjNGpwcTBuZjgwbDFuNHg2YnFjemlpZTU1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUYgk3wpNk0WA/giphy.gif"
                    alt="loading"
                /> : ''}
            </form>
            <button onClick={() => {
                navigate('/update-vendors')
            }} className={`styled-back-button ${isMobile ? 'btn-mobile' : 'btn-desktop'}`}>Back</button>
        </div>
    );
}
