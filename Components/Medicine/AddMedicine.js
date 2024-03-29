import React from 'react'

const AddMedicine = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-header-title'>Add Medicine</h4>
                        </div>
                        <div className='card-body'>
                            
                            <form>
                            <div className="row">
                                    {/* <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Select Appointment
                                        </label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div> */}
                                    {/* <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            CASE NO
                                        </label>
                                        <input readOnly={true} type='text' className='form-control' value={"pxx3233Wr"} id='phone' />
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Brand Name
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Composition
                                        </label>
                                        <input type='text' className='form-control' id='composition' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Class
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Form
                                        </label>
                                        <input type='text' className='form-control' id='composition' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Manufacturer
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Unit Price
                                        </label>
                                        <input type='text' className='form-control' id='phone' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Pack Size
                                        </label>
                                        <input type='text' className='form-control' id='tag' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Withdrawal Period
                                        </label>
                                        <input type='text' className='form-control' id='phone' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Dose
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Route
                                        </label>
                                        <input type='text' className='form-control' id='phone' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Strength
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Animal Type
                                        </label>
                                        {/* select field */}
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Add Medicine Button */}
                                <div className="mb-3">
                                    <button type="submit" className="btn app-btn-primary">Add Medicine</button>
                                </div>
                                
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddMedicine
