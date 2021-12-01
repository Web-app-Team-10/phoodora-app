import React, { useState } from 'react';
import styles from './Frontpage.module.css';
import Location from './Location';
import Restaurant from './Restaurant';
import { IoIosArrowForward } from 'react-icons/io';
import Select from 'react-select';

export default function Frontpage(props) {

    const [currentView, setView] = useState("");
    const [currentCity, setCity] = useState("");
    const [selectedValue, setSelectedValue] = useState("Select");

    let output;
    let matchCity;
    let matchType;
    
    const options = [
        {
            label: "All",
            value: ""
        },
        {
            label: "Fast food",
            value: "Fast food"
        },
        {
            label: "Fast casual",
            value: "Fast casual"
        },
        {
            label: "Casual dining",
            value: "Casual dining"
        },
        {
            label: "Fine dining",
            value: "Fine dining"
        }
    ];

    const selectStyle = selectStyle => ({
        ...selectStyle,
        colors: {
          ...selectStyle.colors,
          primary25: "#f3f3f3",
          primary: "rgba(143,2,224,1);"
        }
      });

    const handleChange = (event) => {

        matchCity = currentCity;
        if(matchCity === "") {
            matchCity = "all";
        }
        setSelectedValue(event.value);
        if(selectedValue !== "all" && matchCity === "all") {
            setView('4');
        }
        if(selectedValue !== "all" && matchCity !== "all") {
            matchCity = currentCity;
            setView('5');
      }
}
    switch (currentView) {

        case '1':
            output = <>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>Restaurants in { props.randomCity_1 }</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle } /></div>
                </div>
                <div className={ styles.restaurants }>
                    { props.restaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }  
                </div>
            </div>
            </>
        break;
        
        case '2':
            output = <>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>Restaurants in { props.randomCity_2 }</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle }/></div>
                </div>
                <div className={ styles.restaurants }>
                    { props.restaurants_2.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div>
            </div>
            </>
        break;
       
        case '3':
            matchCity =  props.restaurants.filter((restaurants) => restaurants.city.includes(currentCity) && restaurants.type.includes(selectedValue));
            output = <>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>Restaurants in {currentCity}</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle } /></div>
            </div>
                <div className={ styles.restaurants }> 
                    { matchCity.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div> 
            </div>
            </>
        break;

        case '4':
            matchType =  props.restaurants.filter((restaurants) => restaurants.type.includes(selectedValue));
            output = <>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>All restaurants</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle } /></div>
            </div>
                <div className={ styles.restaurants }> 
                    { matchType.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div> 
            </div>
            </>
        break;

        case '5':
            matchType =  props.restaurants.filter((restaurants) => restaurants.type.includes(selectedValue) && restaurants.city.includes(currentCity));
            output = <>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>Restaurants in {currentCity}</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle }/></div>
            </div>
                <div className={ styles.restaurants }> 
                    { matchType.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div> 
            </div>
            </>
        break;
            
        default:
            output = <> 
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.first }><div className={ styles.title }>Restaurants in { props.randomCity_1 }</div>
                    <div className={ styles.select } ><span className={ styles.type } >Restaurant type:</span><Select options={ options } value={ options.find(obj => obj.value === selectedValue) } onChange={ handleChange } theme={ selectStyle }/></div>
                </div>
                <div className={ styles.restaurants }>
                    { props.randomRestaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div>
                <div className={ styles.buttonContainer }><button className={ styles.more } onClick={ () => setView('1') }>More <IoIosArrowForward/></button></div>
            </div>
            <div className={ styles.restaurantsContainer }>
                <div className={ styles.title }>Restaurants in { props.randomCity_2 }</div>
                <div className={ styles.restaurants }>
                 { props.randomRestaurants_2.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                </div>
                <div className={ styles.buttonContainer }><button className={ styles.more } onClick={ () => setView('2') }>More <IoIosArrowForward/></button></div>
            </div>
            </>
        break;
}
    return (
        <div className={ styles.container }>
            <div className={ styles.setWidth }>
                <div className={ styles.locationContainer }>
                    { <Location city={ props.uniqCity } setView={ setView } setCity={ setCity }  />}
                </div>
                { output }
            </div>         
        </div>
    )
}