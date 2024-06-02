import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [reFetch, setRefetch] = useState(0);
    useEffect(() => {
        axiosInstance.get("/notification?limit=1000").then((res) => {
            const result = res.data.data;
            setNotifications(result);
        });
    }, [reFetch])

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

    const handleSeenNotification = (id) => {
        axiosInstance.patch(`/notification/${id}`).then((res) => {
            const result = res.data.data;
            setRefetch(reFetch + 1);
        });
    }

    const handleSeenAllNotification = () => {
        axiosInstance.patch(`/notification`).then((res) => {
            if (res?.data?.success) {
                toast.success("All notification marked as seen")
                setRefetch(reFetch + 1);
            }
        });
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className='w'>
                <div className='text-end my-1'>Total unseen notifications: {notifications?.count} | <button type='button' className='border-0 bg-primary p-1 rounded' onClick={handleSeenAllNotification}>Mark all seen</button></div>
                {notifications?.data?.map((notification) => (
                    <Link onClick={() => handleSeenNotification(notification?._id)} href={notification?.destinationUrl || "/"} key={notification?._id}>
                        <div className="item p-3 border">
                            <div className="row gx-2 justify-content-between align-items-start">
                                <div className="col-auto">
                                    <Image src="/assets/images/info.png" alt="" height={60} width={60} style={{ height: "auto", maxWidth: "100%" }} />
                                    {/* <img className="profile-image" src="/assets/images/info.png" alt="" /> */}
                                </div>
                                <div className="col">
                                    <div className="info">
                                        <h6 className="">{notification?.title}</h6>
                                        <div className="desc text-white">{notification?.description}</div>
                                        <div className="meta">
                                            <p className="m-0 text-end">{timeAgo(notification?.createdAt)}</p>
                                            <p className="m-0 text-end">{notification?.isViewed ? "Seen" : "Unseen"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="link-mask" href="notifications.html"></a>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;