import React from "react";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const InstallationForm = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Installation Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="hostname"
              name="hostname"
              label="Host Name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="requested"
              name="requested"
              label="Requested Software"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="platform"
              name="platform"
              label="Installation Platform"
              fullWidth
              variant="standard"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="projectname"
              name="projectname"
              label="Project Name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="ownername"
              name="ownername"
              label="Owner Name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Business Unit</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Business Unit"
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={10}>Hi-Tech</MenuItem>
                <MenuItem value={20}>IBM Cloud</MenuItem>
                <MenuItem value={30}>BFSI</MenuItem>
                <MenuItem value={40}>HLS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    </DashboardLayout>
  );
};

export default InstallationForm;

// export default function AddressForm() {
//   return (

//   );
// }
