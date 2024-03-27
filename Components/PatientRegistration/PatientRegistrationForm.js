import React from 'react'

const PatientRegistrationForm = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-header-title'>Patient Registration</h4>
                        </div>
                        <div className='card-body'>
                            <div className="row mb-4">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Recipient's Phone" aria-label="Recipient's phone" aria-describedby="button-addon2" />
                                <button className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">Search</button>
                            </div>
                            <div className='col-md-6'></div>
                            </div>
                            <form>
                            <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Select Appointment
                                        </label>
                                        {/* select field */}
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            CASE NO
                                        </label>
                                        <input readOnly={true} type='text' className='form-control' value={"pxx3233Wr"} id='phone' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='name' className='form-label'>
                                            Owner Name
                                        </label>
                                        <input type='text' className='form-control' id='name' />
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='phone' className='form-label'>
                                            Phone
                                        </label>
                                        <input type='text' className='form-control' id='phone' />
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>
                                        Email
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='address' className='form-label'>
                                        Address
                                    </label>
                                    <input type='text' className='form-control' id='address' />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PatientRegistrationForm
