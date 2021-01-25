import React from 'react'
import { Card, Row, Col, Image, Button, Form } from 'react-bootstrap'

interface IContact {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string
}

type Props = {
    onChange: any,
    onSubmit: any,
    onDelete: any,
    onEdit: any,
    form: never[]
}

const ContactForm = ({ onChange, onSubmit, onDelete, onEdit }: Props, { id, name, address, phone, email }: IContact) => (
    <Form>
        <Row className="justify-content-md-center p-2 align-items-center">
            <Col md="auto">
                <Image roundedCircle src="https://material-ui.com/static/images/avatar/1.jpg" width="48px" />
            </Col>
            <Col xs={2}>
                <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }}>Name</Card.Subtitle>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={onChange}
                    value={name} />
            </Col>
            <Col>
                <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }} >Address</Card.Subtitle>
                <Card.Text>{address}</Card.Text>
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={onChange}
                    defaultValue={phone} />
            </Col>
            <Col>
                <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }}>Email</Card.Subtitle>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                    value={email} />
            </Col>
            <Col>
                <Button variant="link"
                    style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline' }}
                    onClick={() => onSubmit}>
                    Save</Button>
                <Button variant="link" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline' }}
                    onClick={() => onDelete}> Remove
                </Button>
            </Col>
        </Row>
    </Form>

)

export default ContactForm