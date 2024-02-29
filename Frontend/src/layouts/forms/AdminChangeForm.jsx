import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  Chip,
  Divider,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Api from "utils/Api";
import { useParams } from "react-router-dom";
import ChatButton from "layouts/chatButton/ChatButton";

const AdminChangeForm = () => {
  const [priority, setPriority] = React.useState(0);

  const [title, setTitle] = React.useState("");

  const [data, setData] = useState([]);

  const [fullData, setFullData] = useState([]);

  const { ticket_id } = useParams();

  const [comment, setComment] = React.useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      var res = await Api.get(`Ticket/GetTicketById?ticket_id=${ticket_id}`);

      console.log("data1==>>", res.data.formdata);

      console.log("data2==>>", res.data);

      setData(JSON.parse(res.data.formdata));

      setPriority(res.data.priority);

      setTitle(res.data.title);

      setFullData(res.data);
    }
    fetchData();
  }, []);

  const handleStatusChange = async () => {
    try {
      Api.put("TicketComments/UpdateTicketStatusandAddComments", {
        ticket_id: ticket_id,
        status_title: status,
        description: comment,
      });
    } catch (err) {
      console.log("err==>>", err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          {fullData.title}
        </Typography>
        {priority == 0 && <Chip label="low" color="success" />}
        {priority == 1 && <Chip label="medium" color="warning" />}
        {priority == 2 && <Chip label="high" color="error" />}
        <Typography variant="h5" gutterBottom>
          Ticket ID - {fullData?.ticket_id?.substr(fullData?.ticket_id.length - 5)}
        </Typography>

        <Grid container spacing={3}>
          {data.map((field, i) => {
            return (
              <Grid item xs={12} sm={6} key={i}>
                <TextField
                  required
                  id={field.key}
                  name={field.key}
                  label={field.title}
                  fullWidth
                  variant="standard"
                  disabled
                  value={field?.input}
                />
              </Grid>
            );
          })}
        </Grid>
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="comment"
              name="comemnt"
              label="Add Ticket Comment"
              fullWidth
              variant="standard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Update Status</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={status}
                onChange={(e) => {
                  console.log("value==>>", e.target.value )
                  setStatus(e.target.value)
                }}
                label="Business Unit"
                required
                defaultValue={10}
                fullWidth
              >
                {fullData.status_title == "Open" && (

                    <MenuItem value="In Progress">In Progress</MenuItem>
                )}
                {/* {fullData.status_title == "In Progress" && (
                    <MenuItem value="Pending">Pending</MenuItem>

                )} */}
                {fullData.status_title == "In Progress" && (
                    <MenuItem value="Resolved">
                      Resolved
                    </MenuItem>
                )}
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={()=> handleStatusChange()} >Update Ticket Status</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ChatButton emp_id={fullData.emp_id} />
        </div>
      </React.Fragment>
    </DashboardLayout>
  );
};

export default AdminChangeForm;
