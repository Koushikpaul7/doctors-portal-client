import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvialableAppointments from './AvialableAppointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <AvialableAppointments date={date}></AvialableAppointments>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;