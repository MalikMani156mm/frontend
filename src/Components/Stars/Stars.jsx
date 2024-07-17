import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';


const Stars = ({rating}) => {

    const RatingStar = Array.from({ length: 5 }, (elem, index) => {
        return (
            <span key={index}>
                {
                    rating > index  ? <FontAwesomeIcon icon={faSolidStar} /> : <FontAwesomeIcon icon={faRegularStar} />
                }
            </span>
        )
    })

    return(
            <div>
                {RatingStar}
            </div>
    );

}

export default Stars