import React, { useEffect, useState } from 'react';
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
const CheckOutForm = ({appointment}) => {
    const stripe=useStripe();
    const elements= useElements();
    const[cardError,setCardError]=useState('');
    const[success,setSuccess]=useState('');
    const[processing,setProcessing]=useState(false);
    const[transactionId,setTransactionId]=useState('');
    const[clientSecret,setClientSecret]=useState('');
    const {_id,price,patientName,patient}=appointment;

    useEffect(()=>{
        fetch('http://localhost:5000/create-payment-intent',{
            method:"POST",
            headers:{
                'content-type':'application/json',
                'authorization':`Bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify({price})
        })
              .then(res=>res.json())
              .then(data=>{
                  
            if(data?.clientSecret){
                setClientSecret(data.clientSecret);
            }
        });

},[price])

    const handleSubmit=async(event)=>{
        event.preventDefault();

        if(!stripe||!elements)
        return;
    
    const card = elements.getElement(CardElement);

    if(card===null){
        return;
    }

    const{error, paymentMethod }= await stripe.createPaymentMethod({
        type:'card',
        card
    });
       
    setCardError(error?.message ||'')
    setSuccess('');
    setProcessing(true);

    //confirm card payment
    const {paymentIntent,error:intentError}= await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: patientName,
        email:patient
      },
    },
  }
  );
  if(intentError){
      setCardError(intentError?.message);
      success('');
      setProcessing(false);
  }
  else{
      setCardError('');
      setTransactionId(paymentIntent.id)
      console.log(paymentIntent);
      setSuccess('Congrats! Your payment Completed')

      //store payment on database
      const payment={
          appointment:_id,
          transactionId:paymentIntent.id
      }
      fetch(`http://localhost:5000/booking/${_id}`,{
          method:"PATCH",
          headers:{
            'content-type':'application/json',
            'authorization':`Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(payment)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data);
          setProcessing(false);
      })
  }


    }
    return (
       <>
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe ||!clientSecret }>
          Pay
        </button>
      </form>
      {
          cardError && <p className='text-red-500'>{cardError}</p>
      }
      {
          success && <div className='text-green-500'>
              <p>{success}</p>
              <p className='text-orange-500 text-bold'>Your transaction Id is:{transactionId}</p>
              </div>
      }
       </>
    );
};

export default CheckOutForm;