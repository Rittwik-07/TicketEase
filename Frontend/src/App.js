import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

import themeDark from "assets/theme-dark";
// Material Dashboard 2 React routes
import routes from "routes";
import adminRoutes from "adminRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/TE.png";
import Api from "utils/Api";
import Basic from "layouts/authentication/sign-in";
import ViewInDetail from "layouts/admin/Incidents/viewInDetail";
import DynamicForm from "layouts/forms/DynamicForm";
import InstallationForm from "layouts/forms/InstallationForm";
import ViewForm from "layouts/forms/ViewForm";
import AdminChangeForm from "layouts/forms/AdminChangeForm";
import { Icon } from "@mui/material";
import Overview from "layouts/profile";
import Approvals from "layouts/approval";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const [admin, setAdmin] = useState(sessionStorage.getItem("isadmin"));
  const [signed, isSigned] = useState(sessionStorage.getItem("authtoken") != null ? true : false);
  const [is_manager, setIsManager] = useState(sessionStorage.getItem("ismanager"));

  console.log("is_manager==>>", is_manager);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    async function fetchData() {
      if (signed) {
        // isSigned(true);
        setAdmin(admin);
        console.log("why is this not working ");
        // window.location.href = "/dashboard";
      }
      //  else {
      //   window.location.href = "/authetication/sign-in";
      // }
    }
    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Basic />} />
      </Routes>
      {console.log("signed==>>", signed, admin)}
      {signed && admin == "false" && (
        <Routes>
          {getRoutes(
            is_manager == "true"
              ? [
                  ...routes,
                  {
                    type: "collapse",
                    name: "Approvals",
                    key: "aprrove",
                    icon: <Icon fontSize="small">person</Icon>,
                    route: "/manager",
                    component: <Approvals />,
                  },
                ]
              : routes
          )}
          {/* {getRoutes(routes)} */}
          <Route path="/form/:request_id" element={<DynamicForm />} />
          <Route path="/viewform/:ticket_id" element={<ViewForm />} />
          <Route path="/dynamicform" element={<DynamicForm />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}

      {signed && admin == "true" && (
        <Routes>
          {getRoutes(adminRoutes)}
          <Route path="/viewInDetail/:ticket_id" element={<AdminChangeForm />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      )}
      {signed && admin == "false" && (
        <Sidenav
          color={sidenavColor}
          brand={brandWhite}
          brandName="Ticket Ease"
          routes={is_manager == "true"
          ? [
              ...routes,
              {
                type: "collapse",
                name: "Approvals",
                key: "aprrove",
                icon: <Icon fontSize="small">person</Icon>,
                route: "/manager",
                component: <Approvals />,
              },
            ]
          : routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      {signed && admin == "true" && (
        <Sidenav
          color={sidenavColor}
          brand={brandWhite}
          brandName="Ticket Ease"
          routes={adminRoutes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
    </ThemeProvider>
  );
}
