import React from 'react';
import { Card, Button } from 'react-bootstrap';

//@ts-ignore
import { Link }from 'react-router-dom';


const ActivityListItem = () => {

    return (
        <Card key="notFoundPage">
            <Card.Body>
                <Card.Title>404</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Page Not Found</Card.Subtitle>
                <Card.Text>
                    We couldn't find waht you are looking for
                </Card.Text>
                <Button
                    as={Link} to={`/activities`}
                    variant="primary"
                    className="float-right"
                >
                    Return to activities list
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ActivityListItem
