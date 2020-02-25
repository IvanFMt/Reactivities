import React, { Fragment } from 'react'
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
}

const ActivityDasboard : React.FC<IProps> = (
    {
        activities, 
        selectActivity, 
        selectedActivity,
        setEditMode,
        editMode,
    }
    ) => {
    return (
        <Fragment>
            <Row>
                <Col md={7}>
                    <ActivityList activities={activities} selectActivity = {selectActivity}/>
                </Col>
                <Col md={5} className="mt-2">
                    {selectedActivity && !editMode &&(
                        <ActivityDetail selectedActivity = {selectedActivity} setEditMode = {setEditMode}/>
                    )}
                    {editMode && <ActivityForm/>}
                 </Col>
            </Row>
        </Fragment>
    )
}

export default ActivityDasboard;
