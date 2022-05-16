import React from 'react';
import appointment from '../../assets/images/appointment.png'
const Contact = () => {
    return (
        <section style={{
            background:`url(${appointment})`
        }}>
            <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center text-xl ">
            <h1 className=" font-bold text-primary">Contact us</h1>
            <p className="py-6  text-4xl text-white">Stay Connected With Us.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
               
                <input type="text" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                
                <input type="text" placeholder="Subject" className="input input-bordered" />
                <textarea type="text" placeholder="Your message" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
    );
};

export default Contact;