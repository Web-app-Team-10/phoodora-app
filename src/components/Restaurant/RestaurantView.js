import React from 'react';
import styles from './RestaurantView.module.css';
import Welcome from './Welcome';
import Categories from './Categories';
import Menu from './Menu';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Restaurant(props) {
    
    const shoppingCart = [];
    const { id } = useParams();
    const { category } = useParams("");
    
    let restaurant = [];
    let uniqCategory = [];
    let sortedMenu = [];
    let menu;
    props.restaurants.map(find => { if (find.id == id){ restaurant = find } });

    restaurant.menu.map( unique => { 
        if ( uniqCategory.indexOf(unique.category) === -1) { uniqCategory.push(unique.category) } 
    });

    if(category !== null) {
        sortedMenu = restaurant.menu.filter((menu) => menu.category.toLowerCase().includes(category.toLowerCase()))
        menu = <>{ sortedMenu.map( menu => <Menu key={ menu.id } menu={ menu } shoppingCart={ shoppingCart }/>)}</>
    } else {
        menu = <>{ restaurant.menu.map( menu => <Menu key={ menu.id } menu={ menu } shoppingCart={ shoppingCart } />)}</>
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