import React, { Fragment, SyntheticEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate }  = activityStore;

    return (
        <Fragment>
            {
                activitiesByDate.map( activity => (
                   <ActivityListItem activity = { activity }/>
                ))
            }
        </Fragment>
    )
}

export default observer(ActivityList);
