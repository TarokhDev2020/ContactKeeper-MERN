import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactItems = ({contact}) => {

    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    const {name, _id, email, phone, type} = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className = "card bg-light">
            <h3 className = "text-primary text-left">
                {name}{' '}<span className = {`badge ` + (type === 'professional' ? 'badge-success' : 'badge-primary')} style = {{float: 'right'}}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul>
                {email && <li><i className = "fas fa-phone"/> {email}</li>}
                {phone && <li><i className = ""/> {phone}</li>}
            </ul>
            <p>
                <button className = "btn btn-dark btn-sm" onClick = {() => setCurrent(contact)}>Edit</button>
                <button className = "btn btn-danger btn-sm" onClick = {onDelete}>Delete</button>
            </p>
        </div>
    )
}

export default ContactItems
