import * as React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { Route, Switch } from 'react-router-dom';

import NavegacionAdministrador from '../NavegacionAdmin/NavegacionAdmin';
import { AdminProvider } from '../../Context/AdminContext';
import { makeStyles } from '@material-ui/styles';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawerPaper: {
		width: drawerWidth,
	},
  appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	content: {
		flexGrow: 1,
    padding: 3
	},
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function LayoutAdministrador(props) {
    const classes = useStyles();
    const {routes } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(!user ? "no hay sesion" : "si hay sesion")

    return (
        <React.Fragment>
        <AdminProvider>
            <HideOnScroll {...props} >
              <div className={classes.drawerPaper} aria-label="mailbox folders">
                <NavegacionAdministrador />
              </div> 
            </HideOnScroll>
            <div className={classes.appBar}>
                <div style={{ minHeight: '90vh' }}>
                    <LoadRoutes routes={routes} />
                </div>
            </div>
          </AdminProvider>
        </React.Fragment>
    )
}

function LoadRoutes({routes}) {
    return(
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path}  exact={route.exact} component={route.component}/>
            ))}
        </Switch>
    )
}
