import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const AppointmentImagesModal = ({ modalImages }) => {
    // console.log({ modalImages })

    return (
        <div>
            <div className="modal fade" id="showImages" tabIndex="-1" aria-labelledby="showImagesLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="showImagesLabel">
                                Appointment images
                            </h1>
                            <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <>
                                <Swiper
                                    pagination={{
                                        type: 'fraction',
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    {
                                        modalImages?.map((image, index) => <SwiperSlide key={index}>
                                            <img src={image} className="h-auto w-100" />
                                        </SwiperSlide>)
                                    }
                                </Swiper>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentImagesModal;
