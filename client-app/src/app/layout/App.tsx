import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';

import axios from 'axios';
import { IActivity } from '../models/activities';
import { NavBar } from '../../features/navbar';
import { Container, Row, Col } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';


const App = () => {

  const [ activities, setActivities] = useState<Array<IActivity>>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);
  const [ editMode, setEditMode ] = useState<boolean>(false);

  const handleSelectedActivity = (id : string) => {
    setSelectedActivity(activities.filter( x => x.id === id)[0]);
  };

  useEffect(()=>{
    axios
      .get<Array<IActivity>>("http://localhost:5000/api/activities")
      .then( response => {
        setActivities(response.data);
      })
      .catch( err => {
        console.log(err + ' error getting api values');
      })
  }, []);

  
    return (
      <Fragment>
        <NavBar/>
        <Container className="mt-3">
              <ActivityDasboard 
                activities ={activities} 
                selectActivity={handleSelectedActivity}
                selectedActivity = {selectedActivity}
                setEditMode = {setEditMode}
                editMode = { editMode }
              />
        </Container>
      </Fragment>
    );
 
}

export default App;
