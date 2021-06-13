import React, { useState } from 'react'
import { Card, Row, Col, Image, Button, Form } from 'react-bootstrap'
import url from '../../config'

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

const ContactCard = ({ item, onDelete}: TProps) => {

    const [form, setForm] = useState(item)

    const [isEditing, setEdit] = useState(false)

    const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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

    const actionButtonStyle={
        fontSize: '14px', color: 'darkgray', textDecoration: 'underline'
    }

    return (
        <Form>
            <Row className="no-gutters justify-content-md-center p-2 align-items-center d-flex flex-wrap">
                <Col xs="auto" className="mr-2">
                    <Image roundedCircle alt={form.name} src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Face-Profile-User-Man-Boy-Person-Avatar-512.png" width="48px" />
                </Col>
                <Col className="mr-2">
                    <Card.Subtitle style={{color: "darkgrey", fontSize: '13px'}}>Name</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control className="p-0" type="text" name='name' value={form.name} onChange={handleChange}
                        style={{ fontWeight: 'bold',color: "darkgray", fontSize: '12px', height:'28px'  }}/>:
                        <Card.Text className="mt-1" style={{ fontWeight: 'bold',color: "darkgray", fontSize: '12px'  }}>{form.name}</Card.Text>
                    }
                </Col>
                <Col className="mr-2">
                    <Card.Subtitle style={{color: "darkgrey", fontSize: '13px'}} >Address</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control className="p-0" type="text" name='address' value={form.address}
                        onChange={handleChange}
                        style={{ fontWeight: 'bold',color: "darkgray", fontSize: '12px', height:'28px'  }}
                        />:
                        <Card.Text className="mt-1" style={{ fontWeight: 'bold',color: "darkgray", fontSize: '12px'  }}>{form.address}</Card.Text>
                    }
                </Col>
                <Col className="mr-2">
                    <Card.Subtitle style={{color: "darkgrey", fontSize: '13px'}}>Phone Number</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control className="p-0" type="text" name='phone' value={form.phone} onChange={handleChange}
                        style={{ fontWeight: 'bold',color: "darkgray", fontSize: '12px', height:'28px'  }}/>:
                        <Card.Text className="mt-1" style={{ fontWeight: 'bold', color: "darkgray", fontSize: '13px'  }}>{form.phone}</Card.Text>
                    }
                </Col>
                <Col className="mr-2">
                    <Card.Subtitle style={{color: "darkgrey", fontSize: '13px'}}>Email</Card.Subtitle>
                    {
                        isEditing ?
                        <Form.Control className="p-0"  type="email" name='email' value={form.email} onChange={handleChange}
                        style={{ fontWeight: 'bold', color: "darkgray", fontSize: '13px', height:'28px'  }}/>:
                        <Card.Text className="mt-1" style={{ fontWeight: 'bold', color: "darkgray", fontSize: '13px'  }}>{form.email}</Card.Text>
                    }
                </Col>
                <Col className="d-flex mr-2 mt-2">
                    {
                        isEditing ?
                            <Button variant="link" style={ actionButtonStyle } onClick={() => handleSave(form)}>Save
                            </Button> :
                            <Button variant="link" style={ actionButtonStyle } onClick={handleEdit}> Edit
                            </Button>
                    }
                    {onDelete}
                </Col>
            </Row>
        </Form>
        )
    }
export default ContactCard