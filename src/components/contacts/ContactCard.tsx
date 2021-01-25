import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Image, Button, Form } from 'react-bootstrap'
import url from './../../config'

interface IContact {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string
}

type TProps = {
    item: IContact
    onDelete: JSX.Element
}

const ContactCard = ({ item, onDelete}: TProps, ) => {

    const [form, setForm] = useState(item)

    const [isEditing, setEdit] = useState(false)

    useEffect(() => {
        console.log('Hola desde Cards')
    }, [])

    const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log(isEditing)
        setEdit(!isEditing)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSave = async (item: IContact) => {
        try {
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            await fetch(`${url}/contacts/` + item.id, config)
        } catch (error) {
            console.log(error)
        }
        setEdit(!isEditing)
    }
    return (
        <Form>
            <Row className="no-gutters justify-content-md-center p-2 align-items-center">
                <Col md="auto">
                    <Image roundedCircle alt={form.name} src="https://material-ui.com/static/images/avatar/1.jpg" width="48px" />
                </Col>
                <Col xs={2}>
                    <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }}>Name</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control type="text" name='name' value={form.name} onChange={handleChange}/>:
                        <Card.Text>{form.name}</Card.Text>
                    }
                </Col>
                <Col>
                    <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }} >Address</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control type="text" name='address' value={form.address} onChange={handleChange}/>:
                        <Card.Text>{form.address}</Card.Text>
                    }
                </Col>
                <Col xs={2} className="mr-2">
                    <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }}>Phone Number</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control type="text" name='phone' value={form.phone} onChange={handleChange}/>:
                        <Card.Text>{form.phone}</Card.Text>
                    }
                </Col>
                <Col>
                    <Card.Subtitle style={{ color: "#b7b7b7", fontSize: '14px' }}>Email</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control type="email" name='email' value={form.email} onChange={handleChange}/>:
                        <Card.Text>{form.email}</Card.Text>
                    }
                </Col>
                <Col xs={3}>
                    {
                        isEditing ?
                            <Button variant="link" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline' }}
                                onClick={() => handleSave(form)}>Save
                            </Button> :
                            <Button variant="link" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline' }}
                                onClick={handleEdit}> Edit
                            </Button>
                    }
                    {onDelete}
                </Col>
            </Row>
        </Form>
        )
    }

export default ContactCard