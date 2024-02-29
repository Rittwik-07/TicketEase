import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
} from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MDButton from "components/MDButton";
import Api from "utils/Api";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const CreateForm = () => {
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

  const [priority, setPriority] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [formTitle, setFormTitle] = useState("");

  const [formDesc, setFormDesc] = useState("");

  const [fieldkey, setFieldkey] = useState("");

  const [fieldtitle, setFieldtitle] = useState("");

  const [fields, setFields] = useState([]);

  const [isIncident , setIsIncident] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const addField = () => {
    let obj = {
      key: fieldkey,
      title: fieldtitle,
    };

    console.log("obj==>>", obj);
    setFields([...fields, obj]);
    handleClose();
  };

  const HandleCreate = async () => {
    const struct = JSON.stringify(fields);
    console.log(fields);
    console.log(struct);

    const dept_id = await sessionStorage.getItem("dept_id");

    var res = await Api.post("RequestType/CreateRequest", {
      request_type_id: "",
      request_type: formTitle,
      dept_id: dept_id,
      description: formDesc,
      is_incident: isIncident,
      structure: struct,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Create A Form
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="formtitle"
              name="formtitle"
              label="Enter the Form Title"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFormTitle(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="formdesc"
              name="formdesc"
              label="Enter the Form Description"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFormDesc(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={isIncident} onChange={()=> setIsIncident(!isIncident)} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                // onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;{isIncident ? "Incident Ticket" : "Request Ticket"}
              </MDTypography>
            </MDBox>
            </Grid>

          <Grid item xs={12} sm={6}>
            <Button onClick={() => handleOpen()}>Add a field</Button>
            {/* <Button onClick={() => console.log("all entries==>>", fields)}>Remove a field</Button> */}
            <Button onClick={() => HandleCreate()}>Create</Button>
          </Grid>
        </Grid>
        <br />

        <Paper elevation={3} style={{ padding: "5%" }}>
          <Typography variant="h4" gutterBottom>
            {formTitle == "" ? "Form Title" : formTitle}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {formDesc == "" ? "Add a description" : formDesc}
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
                disabled
                onChange={(e) => {
                  console.log(" brief==>> " + e.target.value);
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
                  disabled
                >
                  <MenuItem value={10}>Low</MenuItem>
                  <MenuItem value={20}>Medium</MenuItem>
                  <MenuItem value={30}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {fields.map((field, i) => {
              return (
                <Grid item xs={12} sm={6} key={i}>
                  <TextField
                    required
                    id={field.key}
                    name={field.key}
                    label={field.title}
                    fullWidth
                    disabled
                    variant="standard"
                    onChange={(e) => {
                      console.log(field.title + " ==>> " + e.target.value);
                      fields[i].input = e.target.value;
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button onClick={() => console.log("all entries==>>", fields)}>Display</Button>
          </div>
        </Paper>
      </React.Fragment>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Add a field
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fieldkey"
              name="fieldkey"
              label="Field Key"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFieldkey(e.target.value);
              }}
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fieldtitle"
              name="fieldtitle"
              label="Field Title"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFieldtitle(e.target.value);
              }}
            />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button onClick={() => addField()}>ADD FIELD</Button>
          </div>
        </Box>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateForm;

const obj = {
  id: 1,
  dept_id: 2,
  title: "Leaves",
  desc: "A form to raise queries regarding leaves",
  struct: [
    {
      key: "name",
      title: "Full Name",
    },
    {
      key: "location",
      title: "Location",
    },
  ],
};
