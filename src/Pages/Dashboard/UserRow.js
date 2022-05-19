import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({user,refetch}) => {
    const{email,role}=user;
    const makeAdmin=()=>{
        fetch(`https://radiant-inlet-90752.herokuapp.com/user/admin/${email}`,{
            method:'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
            if(res.status === 403){
                toast.error('Admin can only make this');
            }
           return res.json()})
        .then(data=>{
            console.log(data);
            if(data?.result.modifiedCount ==1){
                console.log('hello');
                refetch();
            toast.success(`Successfully made an admin`);
            }
        })
    }
    return (
        <tr>
        <th>1</th>
        <td>{email}</td>
        <td>{role !== 'admin' && <button class="btn btn-xs"onClick={makeAdmin}>Make admin</button>}</td>
        <td><button class="btn btn-xs">Remove user</button></td>
    </tr>
    );
};

export default UserRow;