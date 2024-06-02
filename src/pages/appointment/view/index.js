import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ApprovedAppointment from "../../../../Components/Appointment/ApprovedAppointment";
import PendingAppointment from "../../../../Components/Appointment/PendingAppointment";
import { fetchApprovedAppointments, fetchPendingAppointments } from "../../../../features/appointment/appointmentSlice";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // TODO: There have some issues, when tab changes then doesn't show update date data. for example pending tab 6, 7 to appointment tab.
  const handleApprovedTabChange = async () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });

    await dispatch(fetchApprovedAppointments({}));
  };

  const handlePendingTabChange = async () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });

    await dispatch(fetchPendingAppointments({}));
  };

  return (
    <section id="appointment" className="my-4 mx-2">
      <Tabs>
        <TabList>
          <Tab onClick={handleApprovedTabChange}>Approved</Tab>
          <Tab onClick={handlePendingTabChange}>Pending</Tab>
        </TabList>

        {/* approved appointment */}
        <TabPanel>
          <ApprovedAppointment />
        </TabPanel>
        {/* pending appointment */}
        <TabPanel>
          <PendingAppointment />
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default index;
