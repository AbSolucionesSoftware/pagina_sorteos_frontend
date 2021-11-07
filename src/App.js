import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./Config/routes";
import { Helmet } from "react-helmet";
import { PaginaProvider } from "./Context/PaginaContext";

function App() {
  return (
    <div className="App" style={{overflowX: 'hidden'}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sorteos y Rifas de la Suerte</title>
      </Helmet>
      <PaginaProvider>
        <Router>
        <Switch>
          {routes.map((route, index) => (
            <RoutesWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
      </PaginaProvider>
      
    </div>
  );
}

function RoutesWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
