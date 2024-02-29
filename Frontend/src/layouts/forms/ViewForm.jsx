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

const ViewForm = () => {
  const [priority, setPriority] = React.useState(0);

  const [title, setTitle] = React.useState("");

  const [data, setData] = useState([]);

  const [fullData , setFullData] = useState([])

  const { ticket_id } = useParams();

  useEffect(() => {
    async function fetchData() {
      var res = await Api.get(
        `Ticket/GetTicketById?ticket_id=${ticket_id}`
      );

      console.log("data1==>>", res.data.formdata);

      console.log("data2==>>", JSON.parse(res.data.formdata));

      setData(JSON.parse(res.data.formdata));

      setPriority(res.data.priority)

      setTitle(res.data.title)

      setFullData(res.data)
    }
    fetchData();
  }, []);

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
        {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button>Raise Ticket</Button>
        </div> */}
      </React.Fragment>
    </DashboardLayout>
  );
};

export default ViewForm;
