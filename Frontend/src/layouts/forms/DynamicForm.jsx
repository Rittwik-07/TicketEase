import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  Button,
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

const DynamicForm = () => {
  const [priority, setPriority] = React.useState(0);

  const [title, setTitle] = React.useState("");

  const [data, setData] = useState([]);

  const { request_id } = useParams();

  const handleChange = (event) => {
    console.log("priority==>>", event.target.value);
    setPriority(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      var res = await Api.get(`RequestType/GetRequestTypeById?request_type_id=${request_id}`);

      console.log("data1==>>", res.data.structure);

      console.log("data2==>>", JSON.parse(res.data.structure));

      setData(JSON.parse(res.data.structure));
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const emp_id = await sessionStorage.getItem("emp_id");
    const dept_id = await sessionStorage.getItem("dept_id");

    const stringData = JSON.stringify(data);

    var formdata = {
      ticket_id: "",
      title: title,
      formdata: stringData,
      emp_id: emp_id,
      dept_id: dept_id,
      admin_id: null,
      manager_id: null,
      request_type_id: request_id,
      status_id: "tktsts_dcf37724-5e04-42a3-8748-dff1281a8566",
      created_on: "2024-02-07T13:21:12.513Z",
      updated_on: "2024-02-07T13:21:12.513Z",
      need_approval: false,
      status_title: "Open",
      priority: priority,
    };

    console.log("data==>>", formdata);

    try {
      const res = await Api.post("Ticket/CreateTicket", formdata);
      console.log("res==>>", res)
      window.location.href = "/admin/incident"
    } catch (err) {
      console.log("error create==>>", err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          {data.request_type}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {data.description}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="brief"
              name="Brief"
              label="Brief about the ticket"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Priority Status</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={priority}
                onChange={handleChange}
                label="Business Unit"
                required
                defaultValue={10}
                fullWidth
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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
                  onChange={(e) => {
                    console.log(field.title + " ==>> " + e.target.value);
                    data[i].input = e.target.value;
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={() => handleSubmit()}>Raise Ticket</Button>
        </div>
      </React.Fragment>
    </DashboardLayout>
  );
};

export default DynamicForm;
