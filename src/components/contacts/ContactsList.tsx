import React, { Fragment, useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import ContactCard from './ContactCard';
import url from './../../config'

interface IContact {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string
}

const ContactsList = () => {

    let [contacts, setContacts] = useState([])

    const handleDelete = async (id: string) => {
        try {
            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            await fetch(`${url}/contacts/` + id, config)
            getAll()
        } catch (error) {
            console.log(error)
        }
    }
    const getAll = async () => {
        try {
            let res = await fetch(`${url}/contacts`)
            let data = await res.json()
            setContacts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    const ContactDelete=(id:string)=>(
        <Button variant="link" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline' }}
        onClick={()=>handleDelete(id)}>Remove</Button>
    )

    return (
        <Fragment>
            {
                contacts.map((contact: IContact) => (
                    <Card className="mt-4 mb-4" key={contact.id}>
                        <ContactCard item={contact} onDelete={ContactDelete(contact.id)}/>
                    </Card>
                    )
                )
            }
        </Fragment>
    )
}

export default ContactsList