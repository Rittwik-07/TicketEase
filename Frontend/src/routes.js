// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Incidents from "layouts/incidents";
import Requests from "layouts/requests";
import Manager from "layouts/manager";
import InstallationForm from "layouts/forms/InstallationForm";
import Signout from "layouts/Signout";
import DynamicForm from "layouts/forms/DynamicForm";
import CreateForm from "layouts/admin/CreateForm/CreateForm";
import RemoveForm from "layouts/admin/RemoveForm/RemoveForm";

function isManager(){
  return false;
}

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },

  {
    type: "collapse",
    name: "My Incidents",
    key: "myincidents",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/incidents",
    component: <Incidents />,
  },

  {
    type: "collapse",
    name: "My Requests",
    key: "myrequests",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/requests",
    component: <Requests />,
  },

  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  // {
  //   type: "collapse",
  //   name: "Sign Out",
  //   key: "sign-out",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },



  // {
  //   type: "collapse",
  //   name: "Remove Existing Form",
  //   key: "removeform",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/remove-form",
  //   component: <RemoveForm />,
  // },

  {
    type: "collapse",
    name: "Sign Out",
    key: "signout",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/signout",
    component: <Signout />,
  },

  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

// if(isManager()){
//   routes.push(
//     {
//       type: "collapse",
//       name: "Approvals",
//       key: "aprrove",
//       icon: <Icon fontSize="small">person</Icon>,
//       route: "/profile",
//       component: <Profile />,
//     }
//   )
// }

export default routes;
