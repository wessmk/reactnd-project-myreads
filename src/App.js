import React from 'react'
import SearchBooks from "./SearchBooks";
import Bookshelfs from "./Bookshelfs";
import { Route } from "react-router-dom";
import './App.css'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        books: []
    }


    /**
     * @description Get all books from API and set data into books state
     */
    componentDidMount() {
        BooksAPI.getAll()
        .then(books => {
            this.setState({books: books})
        })
    }


    /**
     * @description Update books state after being added to a shelf or set to none 
     * @param {object} shelfs
     * @param {object} book
     */
    UpdateBooks = (shelfs, book) =>{
        let booksArray = this.state.books;
        const shelfsArray = shelfs;
        const bookExistIntoState = booksArray.filter(bA => bA.id === book.id);
        if (bookExistIntoState.length === 0) booksArray = [...booksArray, ...[book]]
        booksArray.map(bA =>  bA.shelf = 'none');
        for (let eachShelf in shelfsArray) {
            shelfsArray[eachShelf].map(eS => 
                booksArray.filter(bA => bA.id === eS).map(bA => bA.shelf = eachShelf)
            )
        }
        this.setState({books:booksArray});
    }


    render() {
        return (
        <div className="app">
            <Route exact path='/' render={() => (
                <Bookshelfs books={this.state.books} shelfs={['currentlyReading','wantToRead','read']} UpdateBooks={this.UpdateBooks} / >
            )} />
            <Route path='/search' render={() => (
               <SearchBooks UpdateBooks={this.UpdateBooks} />
            )} />
        </div>
        )
    }
}

export default BooksApp;
