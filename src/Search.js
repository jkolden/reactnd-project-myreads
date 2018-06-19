import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'



class Search extends Component {

	state = {
    bookResults: []
  }


  searchBooks = (term) => {

  	BooksAPI.search(term)
      .then((bookResults) => {
      	console.log(bookResults);
  
        this.setState(() => ({
          bookResults
        }))
    })
  }

  updateShelf = (book, e) => {
      let savedEvent = e;
      let savedTarget = e.target.value; //https://stackoverflow.com/questions/42089795/reactjs-cant-set-state-from-an-event-with-event-persist
      BooksAPI.update(book, savedTarget).then((resp) => {

     alert(`${book.title} has been added to ${savedTarget} shelf`);
    })

   
};



	render() {

		return( <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(e) => {this.searchBooks(e.target.value)}}/>

              </div>
            </div> 



            <div className="search-books-results">

             {typeof this.state.bookResults !== 'undefined'  && this.state.bookResults.length > 0 &&
            
              <ol className="books-grid">

              {this.state.bookResults.map((book) => (<li key={book.id}>
                  <Book book={book} updateShelf={this.updateShelf} />

                </li>))

            }

              </ol>
          }
            </div>
        
          </div>)
	}

}

export default Search