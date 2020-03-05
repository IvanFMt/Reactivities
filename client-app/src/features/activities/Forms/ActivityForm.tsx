import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';

import { IActivity } from '../../../app/models/activities';
import ActivityStore from '../../../app/stores/ActivityStore';

//@ts-ignore 
import { v4 as uuid } from 'uuid';
//@ts-ignore 
import { RouteComponentsProps, Link } from 'react-router-dom';

const ActivityForm: React.FC<RouteComponentsProps> = ({ history }) => {

    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelSelectedActivity, selectedActivity, clearActivity } = activityStore;

    const initializeForm = () => {
        if (selectedActivity) { return selectedActivity }
        return {
            id: '',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: '',
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    // const handleSubmitForm = () => {
    //     let newActivity: IActivity;
    //     if (activity.id.length === 0) {
    //         newActivity = { ...activity, id: uuid() }
    //         createActivity(newActivity, history)
    //     } else {
    //         editActivity(activity, history)
    //     }
    // }

    const handleSubmitFinalForm = (values: any) => {
        console.log(values);
    }

    useEffect(() => {
        return () => {
            clearActivity();
        }
    }, [clearActivity])

    return (
        <Card className="mt-2">
            <Card.Body>
                <FinalForm
                    onSubmit={handleSubmitFinalForm}
                    render={({ handleSubmit }) => (
                        <Form 
                        // onSubmit={handleSubmit}
                        >
                            <Field
                                name="title"
                                // onChange={handleInputChange}
                                component="input"
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
                                    onClick={cancelSelectedActivity}
                                    variant="outline-danger"
                                    size="sm"
                                    as={Link} to='/activities'
                                >
                                    Cancel
                            </Button>

                                <Button
                                    disabled={submitting}
                                    variant="success"
                                    size="sm"
                                    className="ml-1"
                                    onClick={handleSubmit}
                                    // type='submit'
                                >
                                    {!submitting ? 'Submit' : 'Loading'}
                                </Button>
                            </div>
                        </Form>

                    )}
                />

            </Card.Body>
        </Card>
    )
}

export default observer(ActivityForm);
