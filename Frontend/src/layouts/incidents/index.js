import * as React from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import Api from "utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Incidents() {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState([]);

  const [currentTicket, setCurrentTicket] = React.useState(3);

  const handleOpen = (i) => {
    console.log("index==>>", i);
    setCurrentTicket(i);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    async function fetchData() {
      const emp_id = await sessionStorage.getItem("emp_id");
      console.log("emp_id==>>", emp_id);
      const res = await Api.get(`Ticket/GetAllIncidentTicketsByEmpId?emp_id=${emp_id}`);
      console.log("token==>>", res.data);
      setData(res.data);
    }
    fetchData();
  }, []);

  const getColor = (status) => {
    switch (status) {
      case "Open":
        return "secondary";
        break;
      case "Resolved":
        return "success";
        break;
      case "Pending":
        return "warning";
        break;
      case "Cancelled":
        return "primary";
        break;
      default:
        return "primary";
    }
  };

  const getIcon = (status) => {
    console.log("status", status);
    switch (status) {
      case "Open":
        return "add";
        break;
      case "Resolved":
        return "done";
        break;
      case "Pending":
        return "pending";
        break;
      case "Cancelled":
        return "close";
        break;
      default:
        return "primary";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {data.map((req, i) => (
            <Grid item xs={12} md={6} lg={3} key={i}>
              <MDBox mb={1.5}
               onClick={() => handleOpen(req.ticket_id)}
              // onClick={()=> window.location.href = `/viewform/${req.ticket_id}`}
               >
                <ComplexStatisticsCard
                  color={getColor(req.status)}
                  icon={getIcon(req.status)}
                  title={req.status}
                  // count={"SR-" + req.id}
                  count={"SR-" + req.ticket_id.substr(req.ticket_id.length - 5)}
                  percentage={{
                    color: "success",
                    // amount: "+55%",
                    // label: "Assigned - " + req.employee,
                    label: req.request_type,
                  }}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrdersOverview id={currentTicket} />
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Incidents;
