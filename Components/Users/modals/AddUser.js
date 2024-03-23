import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUserAsync } from '../../../features/user/userSlice'

const AddUser = () => {
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)

    const [userObj,setUserObj]=useState({fullName:'',phone:'',password:'',role:''})
    const handleChange=(e)=>{
        setUserObj({...userObj,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(createUserAsync(userObj))
            setLoading(false)
            setUserObj({fullName:'',phone:'',password:'',role:''})
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        // close modal
        document.getElementById('closeModal').click()
    }
  return (
    <div>

<div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addUserLabel">User</h1>
        <button id='closeModal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        <form>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input value={userObj.fullName} onChange={handleChange} name='fullName' type="text" className="form-control" id="fullName" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input value={userObj.phone} onChange={handleChange} name='phone' type="text" className="form-control" id="phone"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={userObj.password} onChange={handleChange} name='password' type="password" className="form-control" id="password"/>
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select value={userObj.role} onChange={handleChange} name='role' className="form-select" id="role">
                    <option>Open this select menu</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab">Lab</option>
                    <option value="pharmacy">Pharmary</option>
                </select>
            </div>
            {
                loading?
                <button className="btn app-btn-primary" type='button' disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
                :
                <button onClick={handleSubmit} type='submit' className="btn app-btn-primary">Submit</button>
            }
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AddUser
