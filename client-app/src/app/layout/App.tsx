import React, { useEffect, Fragment, useContext } from 'react';
import './styles.css';

import NavBar from '../../features/navbar';
import { Container } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';
import LoadingScreen from './LoadingScreen';
import ActivityStore from '../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

// @ts-ignore
import { Route, withRouter, RouteComponentsProps  } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivityDetail from '../../features/activities/Details/ActivityDetail';

const App : React.FC<RouteComponentsProps> = ({location}) => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingPage) return (<LoadingScreen content="Loading the page for you..." />);

  return (
    <Fragment>
      <NavBar />
      <Container className="mt-3">
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/activities' component={ActivityDasboard}/>
        <Route path='/activity/:id' component={ActivityDetail}/>
        <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
      </Container>
    </Fragment>
  );

}

export default withRouter(observer(App));
