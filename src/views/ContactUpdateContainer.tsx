import React, { useState } from 'react'
import '../components/styles/ExerciseNew.css'
import ContactUpdate from './ContactUpdate'
import url from '../config'

interface IContact {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string
}

interface IEvent {
    e: any
}


const ContactUpdateContainer = () => {

    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    })

    const [isEditing, setEdit] = useState(false)

    const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log(isEditing)
        setEdit(!isEditing)
    }

    const handleChange = ({ e }: IEvent) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (item: IContact) => {
        console.log(form)
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
    const handleDelete = async (item: IContact) => {
        console.log(item)
        try {
            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            await fetch(`${url}/contacts/` + item.id, config)
        } catch (error) {
            console.log(error)
        }
    }

    return <ContactUpdate
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onEdit={handleEdit}
    />
}

export default ContactUpdateContainer