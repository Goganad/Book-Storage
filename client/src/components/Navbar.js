import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const Navbar = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const logoutHandler = async event => {
        event.preventDefault()

        try {
            await request('/api/auth/signout', 'POST')
            auth.verify()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <nav>
            <div className="nav-wrapper indigo darken-4" style={{padding: '0 2rem'}}>
                <span className="brand-logo"><a href="/main" >Cosmic Microtone Background</a></span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/add">Add Book</a></li>
                    <li><a href="/" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    )
}