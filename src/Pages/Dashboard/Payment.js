import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe('pk_test_51L0nMxCGiGPiibhRx27qeA1IWQ42s2ic2kzKYUaxZugf7PQvar0ofomRBiV9u5twk9hNBr5JHZBKsxuFJJAsphft004rPXNO83');

const Payment = () => {
    const {id}=useParams();
    const url=`http://localhost:5000/booking/${id}`;
    

    const {data:appointment,isLoading}=useQuery(['/booking',id],()=>fetch(url,{
        method:'GET',
          headers:{
            'authorization':`Bearer ${localStorage.getItem('accessToken')}`
          }
    }).then(res=>res.json()));

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
  <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
  <div class="card-body">
      <p className='text-success font-bold '>Hello ,{appointment.patientName}</p>
    <h2 class="card-title">Pay for {appointment.treatment}</h2>
    <p>Your appointment on: <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
    <div class="card-actions justify-end">
     <p>Please pay: ${appointment.price}</p>
    </div>
  </div>
</div>
    <div class="card  flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
      <div class="card-body">
       
      <Elements stripe={stripePromise}>
    <CheckOutForm appointment={appointment} />
  </Elements>
      </div>
    </div>
  </div>

    );
};

export default Payment;