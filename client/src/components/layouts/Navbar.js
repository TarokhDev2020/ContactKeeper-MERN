import React, {Fragment, useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import {Link} from 'react-router-dom';


const Navbar = ({title, icon}) => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {isAuthenticated, logout, user} = authContext;
    const {clearContacts} = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>
                Hello {user && user.name}
            </li>
            <li>
                <a href = "#!" onClick = {onLogout}>
                    <i className = "fas fa-sign-out-alt"/><span className = "hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
                <li>
                    <Link to = "/register">Register</Link>
                </li>
                <li>
                    <Link to = "/login">Login</Link>
                </li>
        </Fragment>
    );

    return (
        <div className = "navbar bg-primary">
            <h1>
                <i className = {icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

export default Navbar
