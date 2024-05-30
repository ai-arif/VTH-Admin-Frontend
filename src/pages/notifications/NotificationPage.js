import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        axiosInstance.get("/notification?limit=1000").then((res) => {
            const result = res.data.data;
            // console.log(result)
            setNotifications(result.data);
        });
    }, [])

    function timeAgo(dateString) {
        const now = new Date();
        const createdDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - createdDate) / 1000);

        const units = [
            { name: "year", seconds: 31536000 },
            { name: "month", seconds: 2592000 },
            { name: "week", seconds: 604800 },
            { name: "day", seconds: 86400 },
            { name: "hour", seconds: 3600 },
            { name: "minute", seconds: 60 },
            { name: "second", seconds: 1 },
        ];

        for (let unit of units) {
            const interval = Math.floor(diffInSeconds / unit.seconds);
            if (interval >= 1) {
                return `${interval} ${unit.name}${interval !== 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    }
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className='w'>
                {notifications?.map((notification) => (
                    <div key={notification?._id} className="item p-3 border">
                        <div className="row gx-2 justify-content-between align-items-start">
                            <div className="col-auto">
                                <Image src="/assets/images/info.png" alt="" height={60} width={60} style={{ height: "auto", maxWidth: "100%" }} />
                                {/* <img className="profile-image" src="/assets/images/info.png" alt="" /> */}
                            </div>
                            <div className="col">
                                <div className="info">
                                    <h6 className="">{notification?.title}</h6>
                                    <div className="desc text-white">{notification?.description}</div>
                                    <div className="meta">{timeAgo(notification?.createdAt)}</div>
                                </div>
                            </div>
                        </div>
                        <a className="link-mask" href="notifications.html"></a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;