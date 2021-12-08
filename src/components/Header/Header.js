import React  from "react";
import styles from './Header.module.css';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

export default function Header(props) {
    const navigate = useNavigate();

    const InputChange = event => {
        const searchWord = event.target.value;
        props.setSearchTerm(searchWord);
        console.log(searchWord);
  }
  let login = <Link to="forms"><button className={ styles.login }>Log in</button></Link>;

  if(props.userJwt !== null) {
      login = <button className={ styles.logout } onClick={ () => { props.setUserJwt(null); localStorage.removeItem('storedJwt'); } }>Log out <span></span></button>
  }
  const toAccount = () => {
        if(props.decodedToken !== null){
            if(props.decodedToken.role === 'ROLE_MANAGER'){
                navigate('/manager');
            } else {
                navigate('/account');
            }
        } else {
            navigate('/account');
        }
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.header }>
                <Link to="/"><div className={ styles.logo }>
                    <img className={ styles.logo } src={ "/images/logo2.png" }></img>
                </div></Link>
                <div className={ styles.search }>
                <input className={ styles.inputSearch } type="text" placeholder="Search for restaurants ..."  value ={props.SearchTerm} onChange={InputChange}/>
                <div className={ styles.searchIcon }><ImSearch size={ 25 } style={{ color: "white", cursor: "pointer", marginLeft: "8px" }} /></div>
                </div>
                <div className={ styles.buttonContainer }>
<<<<<<< HEAD
                    <HiOutlineShoppingCart size={ 28 } style={{ color: "white", cursor: "pointer" }} />
                    <FaUser size={ 25 } onClick={ toAccount } style={{ color: "white", cursor: "pointer", marginLeft: "22px" }}  />
                    { login }
=======
                    <Link to="/shopping_cart"><HiOutlineShoppingCart size={ 28 } style={{ color: "white", cursor: "pointer" }} /></Link>
                    <FaUser size={ 25 } style={{ color: "white", cursor: "pointer", marginLeft: "12px" }} />
                    <Link to="forms"><button className={ styles.login }>Log in</button></Link>
>>>>>>> ShoppingCart
                </div>
            </div>
        </div>
    )
}
