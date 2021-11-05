import * as React from "react";
import { Route, Switch } from "react-router-dom";

import NavegacionAdministrador from "../NavegacionAdmin/NavAdmin";
import { AdminProvider } from "../../Context/AdminContext";
import { Toolbar } from "@material-ui/core";
import { Box } from "@material-ui/system";

const drawerWidth = 240;

export default function LayoutAdministrador(props) {
  const { routes } = props;
  const user = JSON.parse(localStorage.getItem("userSorteos"));
  if (!user) {
    props.history.push('/')
  }

  return (
    <React.Fragment>
      <AdminProvider>
        <Box sx={{ display: "flex" }}>
          <NavegacionAdministrador />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <div style={{ minHeight: "90vh" }}>
              <LoadRoutes routes={routes} />
            </div>
          </Box>
        </Box>
      </AdminProvider>
    </React.Fragment>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
