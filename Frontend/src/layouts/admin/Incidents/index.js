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
  const [PriorityHigh, setPriorityHigh] = useState([]);
  const [PriorityMid, setPriorityMid] = useState([]);
  const [PriorityLow, setPriorityLow] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        var id = await sessionStorage.getItem("emp_id");
        const res = await Api.get(
          `Ticket/GetAllIncidentTicketsByEmpId?emp_id=${id}`
        );
        // console.log("author", authorsTableData());
        console.log("Response:", res.data);
        setTableData(res.data);

        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const item = res.data[key];
            if (item.priority === 0) {
              PriorityHigh.push(item);
            } else if (item.priority === 1) {
              PriorityMid.push(item);
            } else if (item.priority === 2) {
              PriorityLow.push(item);
            }
          }
          setPriorityHigh(PriorityHigh);
          setPriorityMid(PriorityMid);
          setPriorityLow(PriorityLow);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Manager = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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

  function getPriorityData(PriorityArray, p) {
    var row = [];
    var col = [
      { Header: "Ticket Id", accessor: "ticketId", align: "left" },
      { Header: "Name", accessor: "name", align: "center" },
      { Header: "Manager", accessor: "managerName", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Date/Time", accessor: "dateAndTime", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ];

    PriorityArray.length > 0
      ? PriorityArray.map((d, i) => {
        // console.log("d==>>")
          row.push({
            ticketId: <MDTypography>{i + 1}</MDTypography>,
            name: (
              <Author
                name={d.employee_firstname + " " + d.employee_lastname}
                email={d.employee_email}
              />
            ),
            managerName: (
              <Manager
                name={d.manager_firstname + " " + d.manager_lastname}
                email={d.manager_email}
              />
            ),
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={d.status} color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            dateAndTime: <CreatedDate date={"12/09/2023"} time={"09:00 AM"} />,
            action: (
              <MDTypography
                component="a"
                href={`/viewInDetail/${d.ticket_id}`}
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                View
              </MDTypography>
            ),
          });
        })
      : "Loading";

    if (p == 0) {
      return {
        columnsHigh: col,
        rowsHigh: row,
      };
    } else if (p == 1) {
      return {
        columnsMid: col,
        rowsMid: row,
      };
    } else {
      return {
        columnsLow: col,
        rowsLow: row,
      };
    }
  }

  const { columnsHigh, rowsHigh } = getPriorityData(PriorityHigh, 0);
  const { columnsMid, rowsMid } = getPriorityData(PriorityMid, 1);
  const { columnsLow, rowsLow } = getPriorityData(PriorityLow, 2);

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
                  High Priority
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columnsHigh, rowsHigh }}
                  column={columnsHigh}
                  row={rowsHigh}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
              >
                <MDTypography variant="h6" color="white">
                  Mid Priority
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columnsMid, rowsMid }}
                  column={columnsMid}
                  row={rowsMid}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Low Priority
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columnsLow, rowsLow }}
                  column={columnsLow}
                  row={rowsLow}
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
