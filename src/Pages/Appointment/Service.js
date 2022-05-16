import React from 'react';

const Service = ({service,setTreatment}) => {
    const{name,slot}=service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
  <div className="card-body text-center">
    <h2 className="text-xl font-bold  text-secondary">{name}</h2>
    <p>{
        slot.length > 0
        ?
        <span>{slot[0]}</span>
        : <span className='text-red-500'>No slot available, try another day.</span>
        }</p>
    <p>{slot.length} {slot.length>1?'spaces':'spaces'} avialable </p>
    <div className="card-actions justify-center">
      
      <label htmlFor="booking-modal-6" disabled={slot.length===0} onClick={()=>setTreatment(service)} 
      className=" btn-sm btn btn-secondary text-white uppercase bg-gradient-to-r from-secondary to-primary">Book Appointment</label>
    </div>
  </div>
</div>
    );
};

export default Service;