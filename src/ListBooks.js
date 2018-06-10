import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


//https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

change = (book, e) => {
BooksAPI.update(book, e.target.value)
}

  render() {

    const {books} = this.props;

    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">

              <ol className="books-grid">
                {books.filter((book) => book.shelf == 'wantToRead').map((book) => (<li key={book.id}>
                  <div>{book.title}</div>

                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(e) => this.change(book, e)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </div>
                </li>))

                }

              </ol>
            </div>

          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
          )

  }


}

export default ListBooks
