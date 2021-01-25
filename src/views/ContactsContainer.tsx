import React, { Fragment } from 'react'
import Contacts from './Contacts'
import { Container, Row, Card, Col, Form } from 'react-bootstrap'

const ContactsContainer = () => {
    return (
        <Fragment>
            <Container className="shadow-sm border" style={{ width: '60%', fontSize: 'small' }}>
                <Row className="bg-dark p-0">
                    <Col>
                        <Form className="mt-5 mb-5 mr-5 ml-5">
                            <Form.Group>
                                <Form.Control type="search" placeholder="Search..." />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row style={{ background: "#dadada" }}>
                    <Card className="shadow bg-white rounded mt-5 mb-5 mr-3 ml-3" style={{ width: '100%', fontWeight: 'bold', color: "#b7b7b7" }}>
                        <Container>
                            <Contacts/>
                        </Container>
                    </Card>
                </Row>
            </Container>
        </Fragment>
    )
}

export default ContactsContainer