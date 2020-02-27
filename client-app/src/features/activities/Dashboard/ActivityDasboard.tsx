import React, { Fragment, SyntheticEvent } from 'react'
import { Row, Col } from 'react-bootstrap'
import { IActivity } from '../../../app/models/activities';
import ActivityList from './ActivityList';
import ActivityDetail from '../Details/ActivityDetail';
import ActivityForm from '../Forms/ActivityForm';

interface IProps {
    activities : Array<IActivity>;
    selectActivity : (id: string) => void;
    selectedActivity : IActivity | null;
    setEditMode : (editMode : boolean) => void;
    editMode : boolean;
    setSelectedActivity : ( activity : IActivity | null ) => void;
    createActivity : (activity : IActivity) => void;
    editActivity : (activity : IActivity) => void;
    deleteActivity : (e : SyntheticEvent<HTMLButtonElement>, id : string) => void;
    submitting : boolean;
    target : string;
}

const ActivityDasboard : React.FC<IProps> = (
    {
        activities, 
        selectActivity, 
        selectedActivity,
        setEditMode,
        editMode,
        setSelectedActivity,
        createActivity,
        editActivity,
        deleteActivity,
        submitting,
        target
    }
    ) => {
    return (
        <Fragment>
            <Row>
                <Col md={7}>
                    <ActivityList 
                        activities={activities} 
                        selectActivity = {selectActivity}
                        deleteActivity = { deleteActivity }
                        submitting = { submitting }
                        target = { target }
                    /> 
                </Col>
                <Col md={5} className="mt-2">
                    {selectedActivity && !editMode && (
                        <ActivityDetail 
                            selectedActivity = {selectedActivity} 
                            setEditMode = {setEditMode}
                            setSelectedActivity = { setSelectedActivity }
                        />
                    )}
                    {editMode && 
                        <ActivityForm 
                            submitting = { submitting }
                            key={ selectedActivity?.id && (selectedActivity.id || 0) }
                            setEditMode={ setEditMode } 
                            selectedActivity={ selectedActivity }
                            createActivity = { createActivity }
                            editActivity = { editActivity }
                        />
                    }
                 </Col>
            </Row>
        </Fragment>
    )
}

export default ActivityDasboard;
