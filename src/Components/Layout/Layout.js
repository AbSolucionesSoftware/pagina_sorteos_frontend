import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { Route, Switch } from 'react-router-dom';
import { PaginaProvider } from '../../Context/PaginaContext';
import Navegacion from '../Navegation/Navegacion';
import Footer from '../Footer/Footer';

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

export default function Layout(props) {

    const {routes } = props;
    return (
        <React.Fragment >
          <PaginaProvider>
            <HideOnScroll {...props}>
              <AppBar style={{background: 'black', color: '#76ff03'}}>
                <Toolbar>
                  <Navegacion />
                </Toolbar>
              </AppBar>
            </HideOnScroll>
            <Toolbar />
            <div style={{minHeight: '85vh', background: '#76ff03'}}>
                <LoadRoutes routes={routes} />
            </div>
            <div >
              <Footer />
            </div>
          </PaginaProvider>
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
