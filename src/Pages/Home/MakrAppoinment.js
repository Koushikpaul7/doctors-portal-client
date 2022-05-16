import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';
const MakrAppoinment = () => {
    return (
        <section style={{
            background:`url(${appointment})`
        }}
         className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 p-10'>
                <h3 className='text-xl font-bold text-primary'>Appointment</h3>
                <h2 className='text-3xl text-white'>Make an Appointment Today</h2>
                <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad aspernatur laboriosam voluptates tenetur officia explicabo voluptatem sint ea ducimus porro. Earum sit velit quod. Deleniti facere consectetur quibusdam enim officiis numquam odit fugit cupiditate consequatur vel cumque, ad explicabo ea!</p>
                <PrimaryButton>Get started</PrimaryButton>
            </div>
            
        </section>
    );
};

export default MakrAppoinment;