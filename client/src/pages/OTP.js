import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import './css/otp.css'
const OTP = () => {

    const [creadentials, setCreadentials] = useState({ OTP:"" });
    let history = useNavigate();
    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { OTP } = creadentials;
        const { Phone, Email, password } = state;
        console.log("value of phone is "+Phone);
        console.log("value of Email is "+Email);
        console.log("value of password is "+password);

        const otpResponse = await fetch("http://localhost:5000/api/auth/verify-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OTP,Phone,Email,password})
        });
        const otpJson = await otpResponse.json();
        if (otpJson.success) {
            //setOtpSent(true);
            alert("OTP verified successfully");
            history("/");
        } else {
            alert("Failed to verify OTP");
        }
    }

    const onchange = (e) => {
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value });
    }


    return (
        <div className="register-screen">
            <form className='register-screen__form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ fontSize: '18px' }} htmlFor="OTP">OTP:</label>
                    <input type="number" name='OTP' placeholder="Enter OTP" onChange={onchange} value={creadentials.OTP} id="OTP" />
                </div>

                <button type="submit" className="btn btn-primary">Verify</button>
            </form>
        </div>
    )
}

export default OTP
