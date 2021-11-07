import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Route, Switch } from "react-router-dom";
import Navegacion from "../Navegation/Navegacion";
import Footer from "../Footer/Footer";
import { CssBaseline, Typography } from "@material-ui/core";
import { PaginaContext } from "../../Context/PaginaContext";
import clienteAxios from "../../Config/axios";
import { Box } from "@material-ui/system";
import mantenimiento from '../../images/mantenimiento.svg'
import moment from "moment";

export default function Layout(props) {
  const { routes } = props;
  const {
    datos,
    setDatos,
    /* reload, */
    /* setReload, */
    setDatosSorteo,
    setLoadingsorteo,
    setFinalizado
  } = React.useContext(PaginaContext);
  const [loaded, setLoaded] = React.useState(false);

  const traerDatos = async () => {
    await clienteAxios
      .get(`/empresa/empresaSorteo`)
      .then((res) => {
        setDatos(res.data.empresa);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const traerSorteoActivo = async () => {
    setLoadingsorteo(true);
    await clienteAxios
      .get(`/sorteo/getSorteoActivo`)
      .then((res) => {
        setDatosSorteo(res.data.sorteo);
        setLoadingsorteo(false);
        let fechaInicio = moment();
        if(moment(res.data.sorteo.fecha_sorteo).isBefore(fechaInicio)) setFinalizado(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadingsorteo(false)
      });
  };

  React.useEffect(() => {
    traerSorteoActivo();
    traerDatos();
    /* setReload(false); */
  }, []);

  if(loaded && datos.length === 0){
    return (
      <Box height="95vh" display="flex" justifyContent="center" alignItems="center">
        <Box height={600} width={600 } display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <img alt="mantenimiento" src={mantenimiento} />
        <Typography variant="h4" textAlign="center">Estamos en mantenimiento</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Navegacion />
        </Toolbar>
      </AppBar>
      <div>
        <LoadRoutes routes={routes} />
      </div>
      <div>
        <Footer />
      </div>
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
