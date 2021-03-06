import React from "react";
import './Header.css';

export default ({black}) =>{
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://logosmarcas.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="logo"/>
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="logo user"/>
                </a>
            </div>
        </header>
    );
}