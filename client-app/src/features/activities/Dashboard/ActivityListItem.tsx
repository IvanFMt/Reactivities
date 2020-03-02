import React, { useContext, SyntheticEvent } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import ActivityStore from '../../../app/stores/ActivityStore';

//@ts-ignore
import { Link }from 'react-router-dom';
import { IActivity } from '../../../app/models/activities';

interface IProps{
    activity : IActivity
}

const ActivityListItem : React.FC<IProps>= ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const {  submitting, target, deleteActivity  }  = activityStore;

    return (
        <Card key={activity.id} style={{ width: '40rem' }} className="mt-2">
            <Card.Body>
                <Card.Title>{activity.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{activity.date}</Card.Subtitle>
                <Card.Text>
                    {activity.description}
                </Card.Text>
                <Badge variant="light" className="p-2">{activity.category}</Badge>
                <Button
                    as={Link} to={`/activity/${activity.id}`}
                    variant="primary"
                    className="float-right"
                >
                    View
                            </Button>
                {/* <Button
                    name={activity.id}
                    disabled={(target === activity.id) && submitting}
                    onClick={(e: SyntheticEvent<HTMLButtonElement>) => deleteActivity(e, activity.id)}
                    variant="danger"
                    className="float-right mr-1"
                >
                    {(target === activity.id) && submitting ? 'Loading' : 'Delete'}
                </Button> */}
            </Card.Body>
        </Card>
    )
}

export default ActivityListItem
