import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form, Badge } from 'react-bootstrap';
import { FaWindowClose, FaSearch, FaCaretDown } from "react-icons/fa";
import ContactCard from './ContactCard';
import url from './../../config';

interface IContact {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string
}

const ContactsList = () => {

    let [contacts, setContacts] = useState([])

    const [query, setQuery] = useState('')

    const [searchKeys, setKeys] = useState<string[]>([]);

    //Query to API for all contacts
    const getAll = async () => {
        try {
            let res = await fetch(`${url}/contacts`)
            let data = await res.json()
            setContacts(data)
        } catch (error) {
            console.log(error)
        }
    }

    //Initialize contact list with all contacts from API
    useEffect(() => {
        getAll()
    }, [])


    //Controlls when user type in search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    //When user click search button goes to api an filter data
    const search = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`${url}/contacts/` + query, config)
            let data = await res.json()
            setContacts(data)
        } catch (error) {
            console.log(error)
        }
        if (query)
            setKeys(searchKeys => [...searchKeys, query])

        setQuery('')
    }

    //When user click search button goes to api given element
    const searchByKey = async (element:string) => {
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`${url}/contacts/` + element, config)
            let data = await res.json()
            setContacts(data)
        } catch (error) {
            console.log(error)
        }
        if (query)
            setKeys(searchKeys => [...searchKeys, query])

        setQuery('')
    }

    //Delete Item from Api
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

    const actionButtonStyle = {
        fontSize: '14px', color: '#b7b7b7', textDecoration: 'underline'
    }

    //Button to pass with delete function
    const ContactDelete = (id: string) => (
        <Button variant="link" style={actionButtonStyle}
            onClick={() => handleDelete(id)}>Remove</Button>
    )

    const removeKey = (index: number) => {
        const items = searchKeys
        const filteredItems = items.slice(0, index).concat(items.slice(index + 1, items.length))
        setKeys(filteredItems)
        if (filteredItems.length===0){
            getAll()
        }else{
            filteredItems.forEach(element => {
                searchByKey(element)
            });
        }
    }

    return (
        <Container className="shadow-sm border" style={{ width: '60%', fontSize: 'small' }}>
            <Row className="bg-dark p-0">
                <Col>
                    <Form onSubmit={search} className="bg-white mt-5 mb-5 mr-5 ml-5 ">
                        <Row>
                            <Col className="d-flex justify-content-md-center align-items-center" style={{color:'grey'}}>
                                {/* No especifica que poner aquí en el documento del test */}
                                    <div className="d-flex justify-content-md-center align-items-center ml-3 mr-3"><FaSearch size={20} className="mr-2"/><FaCaretDown size={16}/></div>
                                {
                                    searchKeys.length > 0 ?
                                        searchKeys.map((value, index) => (
                                            <div key={index} style={{ fontSize: '16px' }}>
                                                <Badge pill color="darkgrey" style={{background:'lightgrey'}}>{value} <FaWindowClose
                                                size={14} onClick={() => removeKey(index)} /></Badge>
                                            </div>
                                        )) : ''
                                }
                                <Form.Control style={{ border: '0px solid' }
                                } type="search" size="sm" name='search' value={query} onChange={handleSearch} />
                                <Button variant="secondary" size="sm" type="submit" className="px-3 ml-3 mr-3 p-0">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row style={{ background: "#dadada" }}>
                <Card className="shadow bg-white rounded mt-5 mb-5 mr-3 ml-3" style={{ width: '100%' }}>
                    <Container>
                        {
                            contacts.map((contact: IContact) => (
                                <Card className="mt-4 mb-4" key={contact.id}>
                                    <ContactCard item={contact} onDelete={ContactDelete(contact.id)} />
                                </Card>
                            )
                            )
                        }
                    </Container>
                </Card>
            </Row>
        </Container>
    )
}

export default ContactsList