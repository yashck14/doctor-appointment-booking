import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctors }) => {
    const navigate = useNavigate();

    const handleDoctorClick = (doctorId) => {
        navigate(`/book/${doctorId}`);
    };

    return (
        <div>
            <h2>Our Doctors</h2>
            <div className="doctor-list">
                {doctors.map(doctor => (
                    <div 
                        key={doctor.id} 
                        className="doctor-card" 
                        onClick={() => handleDoctorClick(doctor.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3>{doctor.name}</h3>
                        <p>Specialty: {doctor.specialty}</p>
                        <p>Contact: {doctor.contact}</p>
                        <h4>Availability:</h4>
                        <ul>
                            {doctor.availability.map((slot, index) => (
                                <li key={index}>
                                    {slot.day}: {slot.time}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
