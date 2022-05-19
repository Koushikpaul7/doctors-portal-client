import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
const BookingModal = ({treatment,date,setTreatment}) => {
    const{_id,name,slot,refetch,price}=treatment;
    const [user, loading, error] = useAuthState(auth);
    const formattedDate=format(date,'PP');
    const handleBooking=event=>{
        event.preventDefault();
        const slot=event.target.slot.value;
        console.log(_id,name,slot);

      const booking=  {
          treatmentId:_id,
          treatment:name,
           formattedDate: format(date,'PP'),
           slot,
           price,
           patient:user.email,
           patientName:user.displayName,
           phone:event.target.phone.value
        }
        fetch('https://radiant-inlet-90752.herokuapp.com/booking',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(booking)

        })
        .then(res=>res.json())
        .then(data=>{
          //to closr the modal
          if(data.success){
            toast(`Appointment is set,${formattedDate} at ${slot}`)
          }
          else{
            toast.error(`You already have an Appointment,${data.booking?.formattedDate} at ${data.booking?.slot}`)
          }
          refetch();
          setTreatment(null);
        })
    }


    return (
        <div>
            <input type="checkbox" id="booking-modal-6" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <label htmlFor="booking-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="font-bold text-lg text-secondary">Booking For {name}</h3>
    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
    <input disabled type="text" value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
    <select name='slot' className="select select-bordered w-full max-w-xs">
        {
            slot.map((sl,index )=><option value={sl} 
            key={index}
            >{sl}</option>)
        }
</select>
    <input type="text" name='name' disabled value={user?.displayName||''} className="input input-bordered w-full max-w-xs" />
    <input type="email" disabled value={user?.email|| ''} name='email' className="input input-bordered w-full max-w-xs" />
    <input type="text" name='phone' placeholder="Phone number" className="input input-bordered w-full max-w-xs" />
    <input type="submit" value='submit' className="btn btn-secondary w-full max-w-xs" />
    </form>
    <div className="modal-action">
      <label htmlFor="booking-modal-6" className="btn">Yay!</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default BookingModal;