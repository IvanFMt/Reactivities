import React from 'react'
import { Card, Form } from 'react-bootstrap'

const ActivityForm : React.FC = () => {
    return (
        <Card className="mt-2">
            <Card.Body>
            <Form.Control className="mt-3" type="text" placeholder="Title" />
            <Form.Control as="textarea" rows="2" className="mt-3" type="text" placeholder="Description" />
            <Form.Control className="mt-3" type="text" placeholder="Category" />
            <Form.Control className="mt-3" type="date" placeholder="Date" />
            <Form.Control className="mt-3" type="text" placeholder="City" />
            <Form.Control className="mt-3 mb-3" type="text" placeholder="Venue" />
            </Card.Body>
        </Card>
    )
}

export default ActivityForm
