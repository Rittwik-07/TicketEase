import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
// import ChatButton from "../../chatButton/ChatButton";

const ViewInDetail = () => {
  const personEmail = "naveen_naik1@persistent.com";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      Put form details here with status change button and redirect to teams button
      {/* <ChatButton email={personEmail} /> */}
    </DashboardLayout>
  );
};

export default ViewInDetail;
