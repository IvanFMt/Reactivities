import React, { Fragment } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { IActivity } from '../../../app/models/activities';

interface IProp{
    activities: Array<IActivity>;
    selectActivity : (id: string) => void;
    deleteActivity : (id : string) => void;
    submitting : boolean;
}

const ActivityList: React.FC<IProp> = ({ activities, selectActivity, deleteActivity,submitting }) => {
    return (
        <Fragment>
            {
                activities.map( activity => (
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
                                disabled={submitting}
                                onClick= { () => deleteActivity(activity.id) }
                                variant="danger" 
                                className="float-right mr-1"
                            >
                                { !submitting ? 'Delete' : 'Loading'}
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </Fragment>
    )
}

export default ActivityList;
