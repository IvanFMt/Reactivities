import React, {useContext, useEffect} from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';
//@ts-ignore
import  { RouteComponentProps, Link } from 'react-router-dom';
import LoadingScreen from '../../../app/layout/LoadingScreen';

interface RouteParms{
    id: string
}

const ActivityDetail: React.FC<RouteComponentProps<RouteParms>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity, loadActivity, loadingPage } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    },[loadActivity, match.params.id])
    
    if (loadingPage || selectedActivity === undefined) return (<LoadingScreen content="Loading the page for you..." />);
    return (
        <Card>
            <Card.Img variant="top" src={`/assets/categoryImages/${selectedActivity!.category}.jpg`} />
            <Card.Body>
                <Card.Title>{selectedActivity!.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{selectedActivity!.date}</Card.Subtitle>
                <Card.Text>
                    {selectedActivity!.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <ButtonGroup size="sm" className="mt-1 btn-block">
                    <Button
                        as={Link}
                        to={`/manage/${selectedActivity.id}`}
                        variant="outline-primary"
                    >Edit
                </Button>
                    <Button
                        variant="outline-danger"
                        onClick={()=> history.push('/activities')}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default observer(ActivityDetail);
