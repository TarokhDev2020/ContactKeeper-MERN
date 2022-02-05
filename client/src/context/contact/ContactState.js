import React, {useReducer} from  'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer'
import axios from 'axios';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT, 
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Some actions
    const getContacts = async () => {
        try {
            const response = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: response.data
            })
        }
        catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.msg
            })
        }
    }

    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    };

    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: response.data
            })
        }
        catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.msg
            })
        }
    };

    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        }
        catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.msg
            })
        }
    };

    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: response.data
            })
        }
        catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.msg
            })
        }
    };

    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return <ContactContext.Provider value = {{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
    }}>
        {props.children}
    </ContactContext.Provider>

};

export default ContactState;