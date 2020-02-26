import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';

import axios from 'axios';
import { IActivity } from '../models/activities';
import { NavBar } from '../../features/navbar';
import { Container } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';


const App = () => {

  const [ activities, setActivities] = useState<Array<IActivity>>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);
  const [ editMode, setEditMode ] = useState<boolean>(false);

  const handleSelectedActivity = (id : string) => {
    setSelectedActivity(activities.filter( (x : IActivity) => x.id === id)[0]);
    setEditMode(false);
  };


  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity : IActivity) => {
    setActivities([ ...activities, activity ]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity : IActivity) => {
    setActivities([...activities.filter( (x : IActivity)  => x.id !== activity.id), activity ]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id : string) => {
    setActivities([...activities.filter((x : IActivity) =>  x.id !== id )])
  }

  useEffect(()=>{
    axios
      .get<Array<IActivity>>("http://localhost:5000/api/activities")
      .then( response => {
        let activities : Array<IActivity> = [];
        response.data.forEach( (x : IActivity) => {
          x.date = x.date.split('.')[0];
          activities.push(x);
        })
        setActivities(response.data);
      })
      .catch( err => {
        console.log(err + ' error getting api values');
      })
  }, []);

  
    return (
      <Fragment>
        <NavBar openCreateForm = {handleOpenCreateForm}/>
        <Container className="mt-3">
              <ActivityDasboard 
                activities ={activities} 
                selectActivity={handleSelectedActivity}
                selectedActivity = {selectedActivity}
                setEditMode = {setEditMode}
                editMode = { editMode }
                setSelectedActivity = { setSelectedActivity }
                createActivity = { handleCreateActivity }
                editActivity = { handleEditActivity }
                deleteActivity = { handleDeleteActivity }  
              />
        </Container>
      </Fragment>
    );
 
}

export default App;
