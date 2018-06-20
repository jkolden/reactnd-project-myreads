import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import ListBooks from "./ListBooks";
import Search from "./Search";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  updateShelf = (book, e) => {
    let savedTarget = e.target.value; //https://stackoverflow.com/questions/42089795/reactjs-cant-set-state-from-an-event-with-event-persist
    BooksAPI.update(book, savedTarget).then(resp => {
      //1. filter the book out of the current state
      let result = this.state.books.filter(b => b.id !== book.id);

      //2. update the book with the new shelf
      book.shelf = savedTarget;

      //3. add the book back to the array
      result.push(book);
      let books = result;

      //4. update state
      this.setState(prevState => ({
        books
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <ListBooks
                books={this.state.books}
                updateShelf={this.updateShelf}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search books={this.state.books} updateShelf={this.updateShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;