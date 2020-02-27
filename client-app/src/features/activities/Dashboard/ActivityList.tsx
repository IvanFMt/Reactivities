import React, { Fragment, SyntheticEvent, useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityList: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate , selectActivity, submitting, target, deleteActivity  }  = activityStore;

    return (
        <Fragment>
            {
                activitiesByDate.map( activity => (
                    <Card key={activity.id} style={{ width: '40rem' }} className="mt-2">
                        <Card.Body>
                            <Card.Title>{activity.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{activity.date}</Card.Subtitle>
                            <Card.Text>
                                {activity.description}
                            </Card.Text>
                            <Badge variant="light" className="p-2">{activity.category}</Badge>
                            <Button
                                onClick= { () => selectActivity(activity.id) }
                                variant="primary" 
                                className="float-right"
                            >
                                View
                            </Button>
                            <Button 
                                name= {activity.id}
                                disabled={ (target === activity.id) && submitting}
                                onClick= { (e : SyntheticEvent<HTMLButtonElement>) => deleteActivity(e,activity.id) }
                                variant="danger" 
                                className="float-right mr-1"
                            >
                                { (target === activity.id) && submitting ? 'Loading' : 'Delete'}
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </Fragment>
    )
}

export default observer(ActivityList);
