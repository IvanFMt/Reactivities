import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

interface IProps{
    setEditMode : (editMode : boolean) => void;
}

const ActivityForm : React.FC<IProps> = ({ setEditMode }) => {
    return (
        <Card className="mt-2">
            <Card.Body>
            <Form.Control className="mt-3" type="text" placeholder="Title" />
            <Form.Control as="textarea" rows="2" className="mt-3" type="text" placeholder="Description" />
            <Form.Control className="mt-3" type="text" placeholder="Category" />
            <Form.Control className="mt-3" type="date" placeholder="Date" />
            <Form.Control className="mt-3" type="text" placeholder="City" />
            <Form.Control className="mt-3 mb-3" type="text" placeholder="Venue" />
            <div className="float-right">
                <Button 
                    onClick={ () => setEditMode(false) }
                    variant="outline-danger" 
                    size="sm"
                >
                    Cancel
                </Button>
                <Button variant="success" size="sm" className="ml-1">
                    Submit
                </Button>
            </div>
            </Card.Body>
        </Card>
    )
}

export default ActivityForm
