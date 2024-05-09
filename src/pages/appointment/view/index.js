import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ApprovedAppointment from "../../../../Components/Appointment/ApprovedAppointment";
import PendingAppointment from "../../../../Components/Appointment/PendingAppointment";

const index = () => {
  return (
    <section id="appointment" className="my-4 mx-2">
      <Tabs>
        <TabList>
          <Tab>Approved</Tab>
          <Tab>Pending</Tab>
        </TabList>

        {/* pending appointment */}
        <TabPanel>
          <PendingAppointment />
        </TabPanel>
        {/* approved appointment */}
        <TabPanel>
          <ApprovedAppointment />
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default index;
