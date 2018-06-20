import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
	state = {
		searchResults: []
	};

	searchBooks = searchTerm => {
		BooksAPI.search(searchTerm).then(searchResults => {
			//if API returns empty query or if no quert string exists, then just create an empty array:
			if (!searchTerm.length || searchResults.error === "empty query") {
				searchResults = [];
			}

			//update the results to not have a shelf until the user assigns one:
			let result = searchResults.map(o =>
				Object.assign(o, { shelf: "none" })
			);
			searchResults = result;

			//compare the user's existing books with the API search results and update the shelf(s) for any books already in the library:
			//helpful post: https://codeburst.io/comparison-of-two-arrays-using-javascript-3251d03877fe
			let booksArray = [];
			booksArray = this.props.books;

			searchResults.forEach(function(e1) {
				booksArray.forEach(function(e2) {
					if (e1.id === e2.id) {
						e1.shelf = e2.shelf;
					}
				});
			});

			//set state of the search results:
			this.setState(() => ({
				searchResults
			}));
		});
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={e => {
								this.searchBooks(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className="search-books-results">
					{typeof this.state.searchResults !== "undefined" &&
						this.state.searchResults.length > 0 && (
							<ol className="books-grid">
								{this.state.searchResults.map(book => (
									<li key={book.id}>
										<Book
											book={book}
											updateShelf={this.props.updateShelf}
										/>
									</li>
								))}
							</ol>
						)}
				</div>
			</div>
		);
	}
}

export default Search;