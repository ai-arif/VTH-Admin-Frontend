

import React, { useState } from "react";

const UpdateTestParamsModal = ({ existingTestParamsName, handleSubmit }) => {
    const [testParamsName, setTestParamsName] = useState(existingTestParamsName || "");


    return (
        <div>
            <div className="modal fade" id="updateTestParam" tabIndex="-1" aria-labelledby="updateTestLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateTestLabel">
                                Update Test Parameter
                            </h1>
                            <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="testName" className="form-label">
                                    Test Parameter Name
                                </label>
                                <input defaultValue={existingTestParamsName} onChange={(e) => setTestParamsName(e.target.value)} name="testName" className="form-control" id="testName" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button id="closeModal" onClick={() => { handleSubmit(testParamsName) }} type="submit" data-bs-dismiss="modal" className="btn app-btn-primary">
                                Update Param
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTestParamsModal;
