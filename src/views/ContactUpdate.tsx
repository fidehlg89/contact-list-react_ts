import React from 'react'
import ContactCard from '../components/contacts/ContactCard'


type IProps={
    form:any,
    onChange:any,
    onSubmit:any,
    onDelete:any,
    onEdit:any
}

const ContactUpdate = ({form, onChange, onSubmit, onDelete, onEdit}:IProps) => (
    <div className="ExerciseNew_Lateral_Spaces row">
        <div className="col-sm ExerciseNew_Card_Space">
            <ContactCard
                {...form}
                onChange={onChange}
                onSubmit={onSubmit}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </div>
    </div>
)

export default ContactUpdate