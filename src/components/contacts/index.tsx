import React, { useState, useEffect} from 'react';
import { Card, Container } from 'react-bootstrap'
//import * as ContactsAPI from './../../services/api'


function Index () {

    const [contacts, setContacts]=useState([])

    useEffect(()=>{
        const fetchContacts=()=>{
            let contacts = [
                { id: 1, name: "John Doe", address: "America", phone: "555 555 55", email: "john@gmail.com" },
                { id: 2, name: "Jane Doe", address: "America", phone: "555 555 55", email: "stan@gmail.com" },
                { id: 3, name: "Stan Doe", address: "America", phone: "555 555 55", email: "stan@gmail.com" }
            ]
            console.log(contacts)
        }
        fetchContacts()
    },[])

    return <Card>
            <Container>
            </Container>
        </Card>
}

export default Index;

