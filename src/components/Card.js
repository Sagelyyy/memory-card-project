import React from 'react';

const Card = (props) => {
    return(
        <div onClick={props.onClick} className='card--container'>
            <img  className='card--image' src={props.heroPortrait} />
            <h1 className='card--name'>{props.heroName}</h1>
        </div>
    )
}

export default Card