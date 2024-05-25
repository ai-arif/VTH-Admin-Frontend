import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTestInfo } from '../../../../features/test/testSlice';
import axiosInstance from '../../../../utils/axiosInstance';

const index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { testAllInfo } = useSelector(
        (state) => state.test
    );

    const [prescriptions, setPrescriptions] = useState({});
    const [results, setResults] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [refetch, setRefetch] = useState(0);


    useEffect(() => {
        if (router.query?.id) {
            axios.get(`http://localhost:5000/api/v1/prescription/lab/test/${router.query?.id}`).then(res => {
                let result = res.data?.data?.data;
                setPrescriptions(result);
                setActiveTab(res.data?.data?.data?.tests?.[0]?._id);
            });
        }
    }, [router?.query?.id]);


    useEffect(() => {
        if (prescriptions?._id)
            axios.get(`http://localhost:5000/api/v1/test/test-result/${prescriptions?.appointment?._id}`).then(response => {
                let arr = [];
                response.data?.data?.data.map(r => {
                    if (r.status == true)
                        arr.push(r?.testId)
                })
                setResults(arr);
            })
    }, [activeTab, router?.query?.id, prescriptions, refetch])

    useEffect(() => {
        if (activeTab)
            dispatch(fetchAllTestInfo(activeTab));
    }, [activeTab, dispatch])


    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (testData) => {
        try {
            const data = {
                testId: activeTab,
                appointmentId: prescriptions?.appointment?._id,
                phone: prescriptions?.appointment?.phone,
                name: testAllInfo?.testName,
                status: true,
                data: testData
            }

            axiosInstance.post(`/test/test-result`, data).then(res => {
                console.log({ res: res.data })
                if (res.data?.success) {
                    setRefetch(refetch + 1)
                    toast.success("Test result added successfully");
                    reset();
                }
            })

        }
        catch (error) {
            console.log(error);
        }
    };

    // console.log({ activeTab })

    return (
        <div>
            <div className="">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="btn-group" role="group">
                        {
                            prescriptions?.tests?.map((test, index) => <button key={test?._id} className={`btn text-white ${activeTab === test?._id ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => {
                                setActiveTab(test?._id)
                            }}>
                                {test?.testName}
                            </button>)
                        }
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black p-3 m-1 rounded-1">

                        <div className="">
                            <h3 className="text-black bg-dark-subtle m-0 border border-black border-bottom-0 p-1 ">{prescriptions?.appointment?.ownerName}</h3>
                            <p>status:{results?.includes(testAllInfo?._id) ? "Added" : "To be add"}</p>

                            {
                                testAllInfo?.testParams?.map((param, index) => <div className={`m-0 row border border-black ${index !== testAllInfo?.testParams?.length - 1 ? "border-bottom-0" : ""}`}>
                                    <div className="col-2 p-2 border-end border-black">
                                        <h6 className="text-black">{param?.name}</h6>
                                    </div>
                                    <div className="col-10 p-2 d-flex justify-content-start align-items-center flex-wrap">
                                        {
                                            testAllInfo?.testParams?.[index]?.subTestParams.map((sub, idx) => <div className="d-flex justify-content-start align-items-center flex-wrap px-2">
                                                {/* <h4 className="text-info">{sub?.title}</h4> */}
                                                {
                                                    sub?.isInputField ? <div className="d-flex justify-content-start align-items-center gap-2 ">
                                                        <label className="block" for={`sub-text-${idx}`}>
                                                            {sub?.title} :
                                                        </label>
                                                        <input {...register(`${param?.name}#${sub?.title}`)} className="block rounded bg-secondary-subtle rounded border-1 border-primary p-1 bg-secondary w-25" type="text" id={`sub-text-${idx}`} placeholder={sub?.title} />
                                                    </div>
                                                        :
                                                        <div className="form-check d-flex justify-content-start align-items-center gap-2 ">
                                                            <input {...register(`${param?.name}#${sub?.title}`)} className="form-check-input" type="checkbox" value="" id={`sub-check-${idx}-${sub?.title}`} />
                                                            <label className="form-check-label" for={`sub-check-${idx}-${sub?.title}`}>
                                                                {sub?.title}
                                                            </label>
                                                        </div>
                                                }
                                                {
                                                    testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.length > 0 &&

                                                    <div className="d-flex justify-content-start align-items-center p-2  rounded flex-wrap ">
                                                        <p className="mt-3">; If <span className="text-lowercase">{sub?.title} ,</span></p>

                                                        {
                                                            testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.map((additional, idx2) => <div >
                                                                {/* <h4 className="text-warning">{additional?.additionalFieldTitle}</h4> */}
                                                                {
                                                                    additional?.isAdditionalFieldInput ? <div className="mx-2 d-flex justify-content-start gap-2 align-items-center flex-wrap">
                                                                        <label className="me-2" for={`additional-text-${idx2}`}>
                                                                            {additional?.additionalFieldTitle} :
                                                                        </label>
                                                                        <input {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)} className="bg-secondary-subtle rounded border-1 border-primary p-1" type="text" id={`additional-text-${idx2}`} placeholder={additional?.additionalFieldTitle} />
                                                                    </div>
                                                                        :
                                                                        <div className="form-check d-flex justify-content-start gap-2 align-items-center mx-2 flex-wrap">
                                                                            <input {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)} className="form-check-input" type="checkbox" value="" id={`additional-check-${idx2}`} />
                                                                            <label className="form-check-label" for={`additional-check-${idx2}`}>
                                                                                {additional?.additionalFieldTitle}
                                                                            </label>
                                                                        </div>
                                                                }
                                                            </div>)
                                                        }
                                                    </div>}
                                            </div>)
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="d-flex justify-content-start justify-content-end">
                            <button type="submit" className="app-btn-primary btn mt-3 ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default index;