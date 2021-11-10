import React from 'react';
import styles from './Header.module.css';
import { ImSearch } from 'react-icons/im';
import  { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className={ styles.container }>
            <div className={ styles.header }>
                <Link to="/"><div className={ styles.logo }>
                    <img className={ styles.logo } src={ "/images/logo.png" }></img>
                </div></Link>
                <div className={ styles.search }>
                    <input className={ styles.inputSearch } type="text" placeholder="Search for restaurants, grocery stores and more" />
                    <div className={ styles.searchIcon }><ImSearch size={ 25 } style={{ color: "white", cursor: "pointer", marginLeft: "8px" }} /></div>
                </div>
                <div className={ styles.buttonContainer }>
                    <HiOutlineShoppingCart size={ 28 } style={{ color: "white", cursor: "pointer" }} />
                    <FaUser size={ 25 } style={{ color: "white", cursor: "pointer", marginLeft: "12px" }} />
                    <Link to="forms"><button className={ styles.login }>Log in</button></Link>
                </div>
            </div>
        </div>
    )
}
