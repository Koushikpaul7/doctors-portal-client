import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import Loading from '../Shared/Loading';
const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const { data: services, isLoading } = useQuery('services', () => fetch('https://radiant-inlet-90752.herokuapp.com/service').then(res => res.json()))

    const imageStorageKey='2e1a0b8f6ca042e23614976ca9798ef4'

    /**
     *  3ways to store images
     * 
     * 1.third party storage// free open public storage is ok for practice project.
     * 2 your own storage in your own server (file system)
     * 3 database:Mongodb
     * 4.YUP: to validate file: YUP file validation for react hook form.
    */



    const onSubmit = async data => {

        const image=data.image[0];
        const formData=new FormData();
        formData.append('image',image);
        const url=`https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url,{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.success){
                const img= result.data.url;
                const doctor={
                    name:data.name,
                    email: data.email,
                    specialty:data.specialty,
                    img:img
                }
                //send to your database
            fetch('https://radiant-inlet-90752.herokuapp.com/doctor',{
                method:"POST",
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(doctor)
            })
            .then(res=>res.json())
            .then(inserted=>{
                if(inserted.insertedId){
                    toast.success('Doctor added successfully')
                    reset();
                }
                else{
                    toast.error('failed to add doctor')
                }
            })
            }
            
        })
    }
    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <h2 className='text-2xl '>Add a doctor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>

                    </label>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            },
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}



                    </label>
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}


                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>

                    </label>

                    <select {...register('specialty')} class="select w-full max-w-xs input-bordered">
                        {
                            services.map(service=><option
                            key={service._id}
                            value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>




                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>

                    </label>
                    <input type="file" placeholder="Image required" className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image required is '
                            },
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}



                    </label>
                </div>

                <input className='btn w-full max-w-xs' value='Add' type="submit" />
            </form>

        </div>
    );
};

export default AddDoctor;