import React from 'react';
import SingleBook from "./SingleBook";
import PropTypes from 'prop-types';
function SingleBookshelf(props) {
    let {books, title}=props;
    let bookshelfTitle = '';
    // define  bookShelf title plain text from title prop.
    if (title === 'currentlyReading') {
       bookshelfTitle = 'Currently Reading';
    }
    if (title === 'wantToRead') {
       bookshelfTitle = 'Want to Read';
    }
    if (title === 'read') {
        bookshelfTitle = 'Read';
    }
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    books.map(([book]) => {
                        return (
                            <SingleBook key={book.id} book={book} UpdateBooks={props.UpdateBooks} />
                        )
                    })
                }
                </ol>
            </div>
        </div>
    )
}
SingleBookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    UpdateBooks: PropTypes.func.isRequired
}
export default SingleBookshelf;

