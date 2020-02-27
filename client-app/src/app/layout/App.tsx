import React, { useEffect, Fragment, useContext } from 'react';
import './styles.css';

import NavBar from '../../features/navbar';
import { Container } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';
import LoadingScreen from './LoadingScreen';
import ActivityStore from '../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(()=>{
    activityStore.loadActivities();
  }, [activityStore]);

    if (activityStore.loadingPage) return (<LoadingScreen content="Loading the page for you..."/>);

    return (
      <Fragment>
        <NavBar/>
        <Container className="mt-3">
              <ActivityDasboard/>
        </Container>
      </Fragment>
    );
 
}

export default observer(App);
