import React, { Component } from 'react';
import SingleBookshelf from "./SingleBookshelf";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
class Bookshelfs extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfs: PropTypes.array.isRequired,
        UpdateBooks: PropTypes.func.isRequired
    }
    state={
        booksByshelf: []
    }


    /**
     * @description put booksin the right shlef
     * @param {obbject} props
     */
    static getDerivedStateFromProps(props) {
        let booksBysingleShelf = [];
        for (const singleShelf of props.shelfs){
            let booksByshelf = props.books.filter(({shelf}) => shelf === singleShelf ).map(book => {
                return [book];
            })
            booksBysingleShelf = [...booksBysingleShelf, ...[{shelf:singleShelf, books:booksByshelf}]];
        }
        return {
            booksByshelf: booksBysingleShelf
        }
    }


    render() {
        const {booksByshelf} = this.state;
        return(
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {
                            booksByshelf.map(shelf =>
                                shelf!== 'none' && <SingleBookshelf key={shelf.shelf} books={shelf.books} title={shelf.shelf} UpdateBooks={this.props.UpdateBooks}  />
                            )
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link className='close-create-contact' to='/search'>Close</Link>
                </div>
            </div>
       )
   }
}

export default Bookshelfs;

