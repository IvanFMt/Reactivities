import React, { Fragment, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityList from './ActivityList';
import ActivityDetail from '../Details/ActivityDetail';
import ActivityForm from '../Forms/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityDasboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore 
    return (
        <Fragment>
            <Row>
                <Col md={7}>
                    <ActivityList/>
                </Col>
                <Col md={5} className="mt-2">
                    {selectedActivity && !editMode && (
                        <ActivityDetail/>
                    )}
                    {editMode &&
                        <ActivityForm
                            key={selectedActivity?.id && (selectedActivity.id || 0)}
                        />
                    }
                </Col>
            </Row>
        </Fragment>
    )
}

export default observer(ActivityDasboard);
