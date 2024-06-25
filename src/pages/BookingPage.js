import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    const { doctorId } = useParams();
    
    const doctors = [
        { 
            id: 1, 
            name: 'Dr. Smith', 
            specialty: 'Cardiologist', 
            contact: '123-456-7890', 
            availability: [
                { day: 'Monday', time: '9:00 AM - 12:00 PM' },
                { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
                { day: 'Friday', time: '9:00 AM - 12:00 PM' }
            ]
        },
        { 
            id: 2, 
            name: 'Dr. Doe', 
            specialty: 'Dermatologist', 
            contact: '987-654-3210', 
            availability: [
                { day: 'Tuesday', time: '10:00 AM - 1:00 PM' },
                { day: 'Thursday', time: '3:00 PM - 6:00 PM' }
            ]
        },
        { 
            id: 3, 
            name: 'Dr. Brown', 
            specialty: 'Pediatrician', 
            contact: '456-789-0123', 
            availability: [
                { day: 'Monday', time: '8:00 AM - 11:00 AM' },
                { day: 'Wednesday', time: '1:00 PM - 4:00 PM' },
                { day: 'Friday', time: '8:00 AM - 11:00 AM' }
            ]
        }
    ];

    const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/send-email', {
                doctorName: selectedDoctor.name,
                timeSlot: selectedTimeSlot,
                userEmail: userEmail
            });
            alert(`Appointment booked with ${selectedDoctor.name} on ${selectedTimeSlot}. Confirmation email sent to ${userEmail}`);
        } catch (error) {
            console.error('Error sending email:', error);
            // alert('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div>
            <h2>Book Appointment with {selectedDoctor.name}</h2>
            <p>Specialty: {selectedDoctor.specialty}</p>
            <p>Contact: {selectedDoctor.contact}</p>
            <h4>Availability:</h4>
            <ul>
                {selectedDoctor.availability.map((slot, index) => (
                    <li key={index}>
                        {slot.day}: {slot.time}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <h4>Choose a time slot:</h4>
                <select value={selectedTimeSlot} onChange={handleTimeSlotChange} required>
                    <option value="" disabled>Select a time slot</option>
                    {selectedDoctor.availability.map((slot, index) => (
                        <optgroup key={index} label={slot.day}>
                            {slot.time.split('-').map((time, subIndex) => (
                                <option key={subIndex} value={`${slot.day}, ${time.trim()}`}>
                                    {time.trim()}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                <br />
                <h4>Enter your email:</h4>
                <input 
                    type="email" 
                    value={userEmail} 
                    onChange={handleEmailChange} 
                    required 
                />
                <br />
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookingPage;
