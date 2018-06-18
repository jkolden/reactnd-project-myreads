import React, {Component} from 'react'
//import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


//https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles

class ListBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
    books: []
  }
  }




  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateShelf = (book, e) => {
  let savedEvent = e;
  let savedTarget = e.target.value; //https://stackoverflow.com/questions/42089795/reactjs-cant-set-state-from-an-event-with-event-persist
  BooksAPI.update(book, savedTarget).then((resp) => {

  let items = this.state.books;
  console.log(items);
  let objIndex = items.findIndex((obj => obj.id == book.id));


  console.log(items[objIndex].shelf);

  items[objIndex].shelf = savedTarget;
  console.log(items);

  // update state
    this.setState({
        items
    });
})

   
};
   



  render() {

    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">

            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">

              <ol className="books-grid">
                {this.state.books.filter((book) => book.shelf === 'read').map((book) => (<li key={book.id}>
                  <Book book={book} updateShelf={this.updateShelf} />

                </li>))
                }

              </ol>
            </div>

            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">

              <ol className="books-grid">
                {this.state.books.filter((book) => book.shelf === 'wantToRead').map((book) => (<li key={book.id}>
                  <Book book={book} updateShelf={this.updateShelf} />

                </li>))

                }

              </ol>
            </div>

          </div>
        </div>
      </div>

    </div>
          )

  }


}

export default ListBooks
