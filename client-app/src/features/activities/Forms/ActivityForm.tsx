import React, { useState, FormEvent } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { IActivity } from '../../../app/models/activities';
//@ts-ignore
import { v4 as uuid } from 'uuid';

interface IProps{
    setEditMode : (editMode : boolean) => void;
    selectedActivity : IActivity | null;
    createActivity : (activity : IActivity) => void;
    editActivity : (activity : IActivity) => void;
    submitting : boolean;
}

const ActivityForm : React.FC<IProps> = (
    { 
        setEditMode, 
        selectedActivity,
        createActivity,
        editActivity,
        submitting,
    }) => {

    const initializeForm = () => {
        if(selectedActivity){ return selectedActivity }
        return { 
            id: '',
            title : '',
            description : '',
            category : '',
            date : '',
            city : '',
            venue : '',
        }
    }

    const [ activity, setActivity ] = useState<IActivity>(initializeForm);

    const handleInputChange = (event : FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({...activity, [name] : value })
    }

    const handleSubmitForm = () =>{
        activity.id.length === 0 ? createActivity({...activity, id: uuid()}) : editActivity(activity);
    }

    return (
        <Card className="mt-2">
            <Card.Body>
            <Form>
                <Form.Control 
                    name="title"
                    onChange={handleInputChange}
                    className="mt-3" 
                    type="text" 
                    placeholder="Title" 
                    value={activity?.title}
                />

                <Form.Control
                    name="description" 
                    onChange={handleInputChange}
                    as="textarea" 
                    rows="2" 
                    className="mt-3" 
                    type="text" 
                    placeholder="Description" 
                    value={activity?.description}
                />

                <Form.Control
                    name="category" 
                    onChange={handleInputChange}
                    className="mt-3" 
                    type="text" 
                    placeholder="Category" 
                    value={activity?.category}
                />

                <Form.Control
                    name="date" 
                    onChange={handleInputChange}
                    className="mt-3" 
                    type="datetime-local" 
                    placeholder="Date" 
                    value={activity?.date}
                />

                <Form.Control
                    name="city" 
                    onChange={handleInputChange}
                    className="mt-3" 
                    type="text" 
                    placeholder="City" 
                    value={activity?.city}
                />

                <Form.Control
                    name="venue" 
                    onChange={handleInputChange}
                    className="mt-3 mb-3" 
                    type="text" 
                    placeholder="Venue" 
                    value={activity?.venue}
                />

                <div className="float-right">
                    <Button 
                        onClick={ () => setEditMode(false) }
                        variant="outline-danger" 
                        size="sm"
                    >
                        Cancel
                    </Button>

                    <Button 
                        disabled={submitting}
                        variant="success" 
                        size="sm" 
                        className="ml-1"  
                        onClick={handleSubmitForm}
                    >
                        {!submitting ? 'Submit' : 'Loading'} 
                    </Button>
                </div>
            </Form>

            </Card.Body>
        </Card>
    )
}

export default ActivityForm
