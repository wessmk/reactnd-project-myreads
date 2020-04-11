import React from 'react';

function Author(props) {
    let {authoName} = props;
    return(
        <div className="book-authors">{authoName}</div> 
    )
}

export default Author;




