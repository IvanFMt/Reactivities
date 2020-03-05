import React from 'react';

import { FieldRenderProps } from 'react-final-form';
import { FormProps, Form } from 'react-bootstrap';

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormProps {}

const TextInput : React.FC<IProps>= ({input, width, type, placeholder, validated}) => {
    return (
        <Form.Control
        />
    )
}

export default TextInput
