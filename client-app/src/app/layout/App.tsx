import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import './styles.css';

import { IActivity } from '../models/activities';
import { NavBar } from '../../features/navbar';
import { Container } from 'react-bootstrap';
import ActivityDasboard from '../../features/activities/Dashboard/ActivityDasboard';
import agent from '../api/agent';
import LoadingScreen from './LoadingScreen';


const App = () => {

  const [ activities, setActivities] = useState<Array<IActivity>>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ loadingPage, setLoadingPage ] = useState<boolean>(true);
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ target, setTarget ] = useState<string>('');

  const handleSelectedActivity = (id : string) => {
    setSelectedActivity(activities.filter( (x : IActivity) => x.id === id)[0]);
    setEditMode(false);
  };


  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity : IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([ ...activities, activity ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));
  }

  const handleEditActivity = (activity : IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter( (x : IActivity)  => x.id !== activity.id), activity ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));
  }

  const handleDeleteActivity = (e : SyntheticEvent<HTMLButtonElement>, id : string) => {
    setSubmitting(true);
    setTarget(e.currentTarget.name);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x : IActivity) =>  x.id !== id )])
    }).then(()=> setSubmitting(false));
  }

  useEffect(()=>{
    agent.Activities.list()
      .then( (response : Array<IActivity>) => {
        response.forEach( (x : IActivity) => {
          x.date = x.date.split('.')[0];
        })
        setActivities(response);
      }).then(()=> setLoadingPage(false))
      .catch( err => {
        console.log(err + ' error getting api values');
      })
  }, []);

    if (loadingPage) return (<LoadingScreen content="Loading the page for you..."/>);

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
                submitting = { submitting }
                target = { target }
              />
        </Container>
      </Fragment>
    );
 
}

export default App;
