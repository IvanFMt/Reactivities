import React, { Fragment } from 'react';
import './styles.css';

import NavBar from '../../features/navbar';
import { Container } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';
import { observer } from 'mobx-react-lite';

// @ts-ignore
import { Route, withRouter, RouteComponentsProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivityDetail from '../../features/activities/Details/ActivityDetail';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentsProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container className="mt-3">
            <Switch>
              <Route exact path='/activities' component={ActivityDasboard} />
              <Route path='/activity/:id' component={ActivityDetail} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route component={NotFound}/>
            </Switch>
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );

}

export default withRouter(observer(App));
