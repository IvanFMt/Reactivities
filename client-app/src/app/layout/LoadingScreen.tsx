import React from 'react'
import { Spinner } from 'react-bootstrap'

interface IProps{
    content : String
}

const LoadingScreen : React.FC<IProps> = ({content}) => {
    return (
        <div 
            className="d-flex justify-content-center align-items-center bg-muted" 
            style=
            {
                {
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    left: 0,
                }
            }
        >      
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </div>
    )
}

export default LoadingScreen;
