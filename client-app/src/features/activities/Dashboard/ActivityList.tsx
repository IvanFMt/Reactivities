import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;
    return (
        <Fragment>
            {
                activitiesByDate.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))
            }
        </Fragment>
    )
}

export default observer(ActivityList);
