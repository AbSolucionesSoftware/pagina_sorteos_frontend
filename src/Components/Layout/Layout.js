import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Route, Switch } from "react-router-dom";
import { PaginaProvider } from "../../Context/PaginaContext";
import Navegacion from "../Navegation/Navegacion";
import Footer from "../Footer/Footer";
import { CssBaseline } from "@material-ui/core";

export default function Layout(props) {
  const { routes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <PaginaProvider>
        <AppBar>
          <Toolbar>
            <Navegacion />
          </Toolbar>
        </AppBar>
        <div style={{ minHeight: "100vh" }}>
          <LoadRoutes routes={routes} />
        </div>
        <div>
          <Footer />
        </div>
      </PaginaProvider>
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
