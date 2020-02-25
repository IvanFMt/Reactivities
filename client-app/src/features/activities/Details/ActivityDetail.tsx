import React, { Fragment } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { IActivity } from '../../../app/models/activities'

interface IProps{
    selectedActivity : IActivity;
    setEditMode : (editMode : boolean) => void;
}

const ActivityDetail : React.FC<IProps> = ({ selectedActivity, setEditMode }) => {
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
                    onClick={() => setEditMode(true)}
                    variant="outline-primary"
                >Edit
                </Button>
                <Button variant="outline-danger">Cancel</Button>
            </ButtonGroup>
        </Card.Footer>
        </Card>
    )
}

export default ActivityDetail
