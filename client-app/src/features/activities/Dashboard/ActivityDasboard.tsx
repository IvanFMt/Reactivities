import React, { Fragment, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingScreen from '../../../app/layout/LoadingScreen';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityDasboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]);
  
    if (activityStore.loadingPage) return (<LoadingScreen content="Loading the page for you..." />);
    
    return (
        <Fragment>
            <Row>
                <Col md={7}>
                    <ActivityList/>
                </Col>
                <Col md={5} className="mt-2">
                    {/* {selectedActivity && !editMode && (
                        <ActivityDetail/>
                    )}
                    {editMode &&
                        <ActivityForm
                            key={selectedActivity?.id && (selectedActivity.id || 0)}
                        />
                    } */}
                    <h1>Activities Filters</h1> 
                </Col>
            </Row>
        </Fragment>
    )
}

export default observer(ActivityDasboard);
