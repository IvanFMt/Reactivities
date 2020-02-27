import React, {useContext} from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetail: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity, openEditForm, cancelSelectedActivity } = activityStore;

    if(selectedActivity === undefined) { return(<div/>)}

    return (
        <Card>
            <Card.Img variant="top" src={`assets/categoryImages/${selectedActivity.category}.jpg`} />
            <Card.Body>
                <Card.Title>{selectedActivity.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{selectedActivity.date}</Card.Subtitle>
                <Card.Text>
                    {selectedActivity.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <ButtonGroup size="sm" className="mt-1 btn-block">
                    <Button
                        onClick={() => openEditForm(selectedActivity.id)}
                        variant="outline-primary"
                    >Edit
                </Button>
                    <Button variant="outline-danger" onClick={cancelSelectedActivity} >Cancel</Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default observer(ActivityDetail);
