import React from 'react'

const ViewMedicine = () => {
  return (
    <div className='container-fluid'>
      <div className="app-card p-5 text-center shadow-sm mt-5">
                            <div className="d-flex justify-content-between">
                            <h3 className="page-title mb-4">Medicines</h3>
                            <div>
                            {/* <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">Add User</button> */}
                            </div>
                            </div>
                            <div className="mb-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Brand Name</th>
                                            <th>Withdrawal Period</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Medicine 1</td>
                                            <td>Brand Name 1</td>
                                            <td>Withdrawal Period 1</td>
                                            <td>
                                                <button className="btn app-btn-primary mb-2">Edit</button>
                                                <button className="btn app-btn-primary mx-2 mb-2">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
    </div>
  )
}

export default ViewMedicine
