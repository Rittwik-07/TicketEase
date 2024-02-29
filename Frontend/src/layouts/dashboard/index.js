import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Api from "utils/Api";

// Dashboard components

function Dashboard() {
  const [adminRequests, setAdminRequests] = useState([]);

  const [hrRequests, setHrRequests] = useState([]);

  const [lndRequests, setLndRequests] = useState([]);

  const [itRequests, setItRequests] = useState([]);

  const [current, setCurrent] = useState("admin");

  var data1;
  var data2;
  var data3;
  var data4;

  useEffect(() => {
    async function fetchData() {
      try {
        data1 = await Api.get("RequestType/GetRequestTypesByDeptId?dept_id=dept_a84c6265-ee5b-4693-8c5e-812dae44ff47");
        data2 = await Api.get("RequestType/GetRequestTypesByDeptId?dept_id=dept_fd3e3bdf-506c-423e-bfdd-6d75673682d9");
        data3 = await Api.get("RequestType/GetRequestTypesByDeptId?dept_id=dept_b0272e7b-960e-4442-b154-18d6b98ffde1");
        data4 = await Api.get("RequestType/GetRequestTypesByDeptId?dept_id=dept_83fc7376-55e0-4713-bec6-84369474abbb");

        setItRequests(data1.data);
        setLndRequests(data4.data);
        setHrRequests(data3.data);
        setAdminRequests(data2.data);

        console.log("data==>>", data1);
        console.log("data==>>", data2);
        console.log("data==>>", data3);
        console.log("data==>>", data4);
      } catch (e) {
        console.log("err==>>", err);
      }
    }
    fetchData();
  }, []);

  const tasks = [
    {
      id: "admin",
      dept: "Admin and Security Staff",
      icon: "weekend",
      color: "dark",
      count: 10,
      features: [
        {
          id: 1,
          feature: "Electrical",
          description: "Manage electrical equipment and issues.",
        },
        {
          id: 2,
          feature: "Travel Request",
          description: "Request and manage travel arrangements.",
        },
        {
          id: 3,
          feature: "Pantry Service",
          description: "Handle pantry and catering service requests.",
        },
        {
          id: 4,
          feature: "Raise Query",
          description: "Submit and address general queries.",
        },
        {
          id: 5,
          feature: "Give Feedback",
          description: "Provide feedback on services and experiences.",
        },
      ],
    },

    {
      id: "hr",
      dept: "Human Resources and Payroll",
      icon: "leaderboard",
      color: "success",
      count: 5,
      features: [
        {
          id: 6,
          feature: "Salary Related Queries",
          description: "Address salary-related queries and concerns.",
        },
        {
          id: 7,
          feature: "Leaves and Absences",
          description: "Manage leave requests and absences.",
        },
        {
          id: 8,
          feature: "Update Profile and Skills",
          description: "Update employee profiles and skills.",
        },
        {
          id: 9,
          feature: "Mediclaim",
          description: "Handle medical insurance-related matters.",
        },
        {
          id: 10,
          feature: "Complaints",
          description: "Report and address HR-related complaints.",
        },
        {
          id: 11,
          feature: "Raise Query",
          description: "Submit and address general queries.",
        },
        {
          id: 12,
          feature: "Give Feedback",
          description: "Provide feedback on services and experiences.",
        },
      ],
    },

    {
      id: "it",
      dept: "Information Technology",
      icon: "store",
      color: "primary",
      count: 8,
      features: [
        {
          id: 13,
          feature: "Gen AI Tool",
          description: "Assistance with general IT tools.",
        },
        {
          id: 14,
          feature: "Hardware Request",
          description: "Request and manage hardware resources.",
        },
        {
          id: 15,
          feature: "Software Installation / Removal",
          description: "Install or remove software applications.",
        },
        {
          id: 16,
          feature: "Raise Query",
          description: "Submit and address general queries.",
        },
        {
          id: 17,
          feature: "Give Feedback",
          description: "Provide feedback on services and experiences.",
        },
      ],
    },
    {
      id: "lnd",
      dept: "Learning and Development",
      icon: "person_add",
      color: "warning",
      count: 15,
      features: [
        {
          id: 18,
          feature: "Training Request / Assistance",
          description: "Seek assistance for training-related matters.",
        },
        {
          id: 19,
          feature: "Course Enrollment",
          description: "Enroll in various courses and programs.",
        },
        {
          id: 20,
          feature: "Certification Assistance",
          description: "Get support for certification processes.",
        },
        {
          id: 21,
          feature: "Raise Query",
          description: "Submit and address general queries.",
        },
        {
          id: 22,
          feature: "Give Feedback",
          description: "Provide feedback on services and experiences.",
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <Grid container spacing={3}>
          {tasks.map((item, key) => {
            return (
              <Grid item xs={12} md={6} lg={3} key={item.id} onClick={() => setCurrent(item.id)}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color={item.color}
                    icon={item.icon}
                    title={item.dept}
                    // count={281}
                    percentage={{
                      color: "success",
                      amount: item.count,
                      label: "Total tickets raised",
                    }}
                  />
                </MDBox>
              </Grid>
            );
          })}
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {current == "admin" &&
              adminRequests.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <MDBox mb={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {item.request_type}
                          </Typography>

                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => (window.location.href = `form/${item.request_type_id}`)}
                          >
                            Raise Request
                          </Button>
                        </CardActions>
                      </Card>
                    </MDBox>
                  </Grid>
                );
              })}

            {current == "hr" &&
              hrRequests.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <MDBox mb={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {item.request_type}
                          </Typography>

                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => (window.location.href = `form/${item.request_type_id}`)}
                          >
                            Raise Request
                          </Button>
                        </CardActions>
                      </Card>
                    </MDBox>
                  </Grid>
                );
              })}

            {current == "it" &&
              itRequests.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <MDBox mb={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {item.request_type}
                          </Typography>

                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => (window.location.href = `form/${item.request_type_id}`)}
                          >
                            Raise Request
                          </Button>
                        </CardActions>
                      </Card>
                    </MDBox>
                  </Grid>
                );
              })}

            {current == "lnd" &&
              lndRequests.map((item) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <MDBox mb={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {item.request_type}
                          </Typography>

                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => (window.location.href = `form/${item.request_type_id}`)}
                          >
                            Raise Request
                          </Button>
                        </CardActions>
                      </Card>
                    </MDBox>
                  </Grid>
                );
              })}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer />   */}
    </DashboardLayout>
  );
}

export default Dashboard;
