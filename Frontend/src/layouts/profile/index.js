import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Api from "utils/Api";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useEffect, useState } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
  const [empData, setEmpData] = useState([]);
  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const emp_id = await sessionStorage.getItem("emp_id")
      try {
        const res1 = await Api.get(`Employee/GetEmployeeById?emp_id=${emp_id}`);
        setEmpData(res1.data);
        const res2 = await Api.get(`Employee/GetManagerByEmpId?emp_id=${emp_id}`);
        setManagerData(res2.data);

        // const [empdata, managerdata] = await Promise.all([empdataPromise, managerdataPromise]);
        // console.log("Manager Data:", managerdata.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header empData={empData} >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Profile information"
                description="Dedicated IT professional with a passion for problem-solving and innovation. Bringing a wealth of experience in system administration, software development, and troubleshooting. Committed to delivering efficient and reliable solutions in a dynamic and collaborative team environment."
                info={{
                  fullName: `${empData.firstname} ${empData.lastname}`,
                  // mobile: "+91 9526892142",
                  email: `${empData.email}`,
                  // location: "Pune, India",
                }}
                social={[]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Manager Information"
                info={{
                  fullName: `${managerData.firstname} ${managerData.lastname}`,
                  // mobile: "+91 9822688271",
                  email: `${managerData.email}`,
                  // location: "Goa, India",
                }}
                social={[]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
