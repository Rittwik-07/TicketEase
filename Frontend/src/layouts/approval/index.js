import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import React, { useEffect, useState } from "react";
import Api from "utils/Api";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";

// Data
import authorsTableData from "layouts/admin/Incidents/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
function Tables() {
  const [tableData, setTableData] = useState([]);
  const [DataToBeApproved, setDataToBeApproved] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        var id = "emp_496c668a-881d-405c-83f0-d76338133603";
        const res = await Api.get(`Ticket/GetAllPendingRequestTicketsByManagerId?manager_id=${id}`);
        // console.log("author", authorsTableData());
        console.log("Response1:", res.data);
        setTableData(res.data);

        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const item = res.data[key];
            DataToBeApproved.push(item);
          }
          setDataToBeApproved(DataToBeApproved);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    console.log("Response2:", DataToBeApproved);
  }, []);

  const Title = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const CreatedDate = ({ date, time }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date}
        </MDTypography>
        <MDTypography variant="caption">{time}</MDTypography>
      </MDBox>
    </MDBox>
  );

  function getDataForApproval(dataToBeApproved) {
    var row = [];
    var col = [
      { Header: "Ticket Id", accessor: "ticketId", align: "left" },
      { Header: "Title", accessor: "title", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Priority", accessor: "priority", align: "center" },
      { Header: "Date/Time", accessor: "dateAndTime", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ];

    dataToBeApproved.length > 0
      ? dataToBeApproved.map((d, i) => {
          // console.log("d==>>")
          row.push({
            ticketId: (
              <MDTypography>
                {d.ticket_id.substr(d.ticket_id.length - 6).toUpperCase()}
              </MDTypography>
            ),
            title: <Title title={d.title} />,
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={d.status_title} color="dark" variant="gradient" size="sm" />
              </MDBox>
            ),
            priority: (
              <MDBox ml={-1}>
                {d.priority == "1" && (
                  <MDBadge badgeContent={"High"} color="error" variant="gradient" size="sm" />
                )}
                {d.priority == "2" && (
                  <MDBadge badgeContent={"Mid"} color="warning" variant="gradient" size="sm" />
                )}
                {d.priority == "3" && (
                  <MDBadge badgeContent={"Low"} color="success" variant="gradient" size="sm" />
                )}
              </MDBox>
            ),
            dateAndTime: <CreatedDate date={d.created_on.substr(0, 10)} time={"09:00 AM"} />,
            action: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Approve/Reject
              </MDTypography>
            ),
          });
        })
      : "Loading";

    return {
      cols: col,
      rows: row,
    };
  }

  const { cols, rows } = getDataForApproval(DataToBeApproved);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
              >
                <MDTypography variant="h6" color="white">
                  Approve/Reject Requests
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ cols, rows }}
                  column={cols}
                  row={rows}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
