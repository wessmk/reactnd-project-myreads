import React, { Component  } from 'react';
import { Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import _ from "lodash";
import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types';
class SearchBooks extends Component {
    static propTypes = {
        UpdateBooks: PropTypes.func.isRequired
    }
    state = {
        query: '',
        books: []
    }


    /**
     * @description onchange search input, update the search input value by updating the query state value
     * @param {string} value
     */
    updateInputValue = (value) => {
        this.setState(() => ({
            query: value
        }))
    }

    /**
     * @description handle Key down of the search input and call the searchBooks function if the query state not empty
     */
    _handleKeyDown = () => {
        this.state.query !== '' && this.searchBooks(this.state.query)
    }


    /**
     * @description call search method of the API with query state
     * @param {string} query
     */
    searchBooks = (query) =>{
        BooksAPI.search(query)
        .then(books => {
            this.setState({books:books});
        })
    }


   render() {
     const { query, books } = this.state;
       return(
           <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onKeyDown={_.debounce(this._handleKeyDown, 400)} onChange={(event) => this.updateInputValue(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {query !== '' && books.length> 0 &&
                    books.map((b) =>  <SingleBook key={b.id} book={b} UpdateBooks={this.props.UpdateBooks} />)}
              </ol>
            </div>
          </div>
       )
   }
}

export default SearchBooks;