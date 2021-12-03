import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AdminContext } from "../../Context/AdminContext";
import useStyles from "../Navegation/Styles";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import Error404 from "../../Pages/FrontUsers/Error";
import { Button, ListItemButton } from "@material-ui/core";
import Home from "@material-ui/icons/Home";

const drawerWidth = 240;

function NavegacionAdministrador(props) {
  const { location } = props;
  const url = location.pathname.split("/");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setDatos, reload, datos, setReload } = React.useContext(AdminContext);
  const classes = useStyles();

  const RUTA_ACTUAL = url[2] ? url[2] : url[1];
  const RUTAS = {
    admin: "Información principal",
    "publicidad-banners": "Banner publicitario",
    "preguntas-frecuentes": "Preguntas frecuentes",
    "videos-promocionales": "Videos promocionales",
    "sorteos-boletos": "Sorteos",
    "sorteos-eliminados": "Sorteos eliminados",
  };
  const RUTA_DEFAULT = "admin";
  const titulo = RUTAS[RUTA_ACTUAL] || RUTA_DEFAULT;

  /* const [menuActivo, setMenuActivo] = React.useState(RUTAS); */

  const traerDatos = async () => {
    await clienteAxios
      .get(`/empresa/empresaSorteo`)
      .then((res) => {
        setDatos(res.data.empresa);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    traerDatos();
    setReload(false);
  }, [reload]);

  if (!datos) {
    <Error404 />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box className={classes.containerImageDrawer}>
          <img
            className={classes.image}
            src={datos.imgEmpresaUrl}
            alt="imagen logo"
          />
        </Box>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin`}
            selected={titulo === "Información principal"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography>Datos Principales</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/publicidad-banners`}
            selected={titulo === "Banner publicitario"}
          >
            <ListItemIcon>
              <ViewCarouselIcon />
            </ListItemIcon>
            <Typography>Banner Publicitario</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/preguntas-frecuentes`}
            selected={titulo === "Preguntas frecuentes"}
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <Typography>Preguntas Frecuentes</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/videos-promocionales`}
            selected={titulo === "Videos promocionales"}
          >
            <ListItemIcon>
              <OndemandVideoIcon />
            </ListItemIcon>
            <Typography>Videos Promocionales</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/sorteos-boletos`}
            selected={titulo === "Sorteos"}
          >
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <Typography>Sorteos</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/sorteos-eliminados`}
            selected={titulo === "Sorteos eliminados"}
          >
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <Typography>Sorteos eliminados</Typography>
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/admin/cupones`}
            selected={titulo === "Sorteos eliminados"}
          >
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <Typography>Generar Cupones</Typography>
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to={`/`}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <Typography>Pagina principal</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  /* const container =
    window !== undefined ? () => window().document.body : undefined; */

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="inherit"
        elevation={1}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{titulo}</Typography>
          <Box flexGrow={1} />
          <Button
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={() => {
              localStorage.removeItem("userSorteos");
              localStorage.removeItem("tokenSorteos");
              window.location.reload();
            }}
          >
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          /* container={container} */
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
}

export default withRouter(NavegacionAdministrador);
