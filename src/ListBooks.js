import React, { Component } from "react";
//import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import Book from "./Book";
import { Link } from "react-router-dom";


class ListBooks extends Component {
  constructor(props) {
    super(props);
  }

  //helpful posts:
  //https://reactjs.org/docs/lifting-state-up.html
  //https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "currentlyReading")
                    .map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          updateShelf={this.props.updateShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>

              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "read")
                    .map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          updateShelf={this.props.updateShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>

              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter(book => book.shelf === "wantToRead")
                    .map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          updateShelf={this.props.updateShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;