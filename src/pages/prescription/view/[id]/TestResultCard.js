import React from "react";

const TestResultCard = ({ name, data }) => {
    if (name !== "_id")
        return (
            <div className="row bg-white m-0 text-black">
                <div className="col-2 p-2 border-end border-black">
                    <h5 className="text-black">{name}</h5>
                </div>
                <div className="col-10 p-2 d-flex align-items-center flex-wrap">
                    {data.map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center px-2">
                            {Object.entries(item).map(([key, value], subIdx) => (
                                <div key={subIdx} className="parameter-subitem d-flex align-items-center px-2">
                                    {Array.isArray(value) ? (
                                        <div className="m-0 d-flex align-items-center gap-2">
                                            <div class="form-check d-flex align-items-center gap-2">
                                                <input checked={value.some((item) => Object.values(item).some((value) => Boolean(value)))} class="form-check-input" type="checkbox" value="" />
                                                <label class="form-check-label" for={`${key}-ak`}>
                                                    {key} ;
                                                </label>
                                            </div>
                                            <p className="mt-3">If {key}, </p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* {value == true || value == false ?  */}
                                            {typeof value === "boolean" ? (
                                                <div class="form-check d-flex align-items-center gap-2">
                                                    <input checked={value} readOnly class="form-check-input" type="checkbox" value="" id={`${key}-${value}`} />
                                                    <label class="form-check-label" for={`${key}-${value}`}>
                                                        {key}
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className="d-flex align-items-center gap-2">
                                                    <label class="block" for={`sub-text-${idx}`}>
                                                        {key} :
                                                    </label>
                                                    <input
                                                        value={value}
                                                        className="w-25 block rounded bg-secondary-subtle rounded border-1 border-primary p-1 bg-secondary"
                                                        type="text"
                                                        id={`sub-text-${value}`}
                                                        placeholder={value}
                                                    />
                                                </div>
                                                // <div className="k">{key}</div>
                                            )}
                                        </>
                                    )}
                                    {Array.isArray(value) && (
                                        <div className=" d-flex align-items-center px-2">
                                            {value.map((nestedItem, nestedIdx) => (
                                                <div key={nestedIdx}>
                                                    {Object.entries(nestedItem).map(([nestedKey, nestedValue]) => (
                                                        <div key={nestedKey} className="d-flex align-items-center gap-2">
                                                            {typeof nestedValue === "boolean" ? (
                                                                // nestedValue.toString()
                                                                <div class="form-check d-flex align-items-center gap-2 mx-1">
                                                                    <input checked={nestedValue} readOnly class="form-check-input" type="checkbox" value="" id={`${nestedValue}-${nestedKey}`} />
                                                                    <label class="form-check-label" for={`${nestedValue}-${nestedKey}`}>
                                                                        {nestedKey}
                                                                    </label>
                                                                </div>
                                                            ) : (
                                                                //  nestedValue
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <label class="block" for={`sub-text-${nestedValue}`}>
                                                                        {nestedKey} :
                                                                    </label>
                                                                    <input
                                                                        value={nestedValue}
                                                                        className="w-25 block rounded bg-secondary-subtle rounded border-1 border-primary p-1 bg-secondary"
                                                                        type="text"
                                                                        id={`sub-text-${nestedValue}`}
                                                                        placeholder={nestedValue}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
};

export default TestResultCard;
