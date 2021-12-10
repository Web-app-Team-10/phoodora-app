import React, { useState, useEffect } from 'react';
import styles from './RestaurantView.module.css';
import Welcome from './Welcome';
import Categories from './Categories';
import Menu from './Menu';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Restaurant(props) {
    const [findMenu, foundMenu] = useState([]);
    const { id } = useParams();
    let { category } = useParams("");

    useEffect(() => {
        axios.get('https://phoodora-app.herokuapp.com/restaurants/'+ `${id}`)
          .then((response) => {
            console.log(response.data.menu);
           foundMenu(response.data.menu);
          });
          
      }, []);
    
    let uniqCategory = [];
    let sortedMenu = [];
    let menu;
    let restaurant;
    props.restaurants.map(find => { if (find.id == id){ restaurant = find } });

    findMenu.map( unique => { 
        if ( uniqCategory.indexOf(unique.category) === -1) { uniqCategory.push(unique.category) } 
    });

    if(category !== undefined) {
        sortedMenu = findMenu.filter((menu) => menu.category.toLowerCase().includes(category.toLowerCase()))
        menu = <>{ sortedMenu.map( menu => <Menu key={ menu.id } menu={ menu } restaurant={ restaurant } products={ props.products } setShoppingCart={ props.setShoppingCart } addToCart={ props.addToCart } shoppingCart={ props.shoppingCart }/>)}</>
    } else {
        menu = <>{ findMenu.map( menu => <Menu key={ menu.id } menu={ menu } restaurant={ restaurant } products={ props.products } setShoppingCart={ props.setShoppingCart } addToCart={ props.addToCart } shoppingCart={ props.shoppingCart } />)}</>
    }

    return (
        <div className={ styles.container }>
            <Welcome restaurant={ restaurant }/> 
            <div className={ styles.second }>
                <div className={ styles.categoryContainer }> <span className={ styles.title }>Select from category</span>
                <Link to={`/restaurants/${restaurant.id}`}><button className={ styles.all }>All</button></Link>
                { uniqCategory.map( category => <Categories key={ category } restaurant={ restaurant } category={ category } />) }</div>
                <div className={ styles.menuContainer }><div className={ styles.menuTitle }>Menu</div>
                    <div className={ styles.products }>{ menu }</div>
                </div> 
            </div>
        </div>
    )
}