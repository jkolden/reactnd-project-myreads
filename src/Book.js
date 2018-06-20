import React, { Component } from "react";

class Book extends Component {
  render() {
    return (
      <div>
        <div>{this.props.book.title}</div>
        <div className="book">
          <div className="book-top">
            {/* Not all book objects have images so I added a condition to check this */}
            {this.props.book.imageLinks && (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${
                    this.props.book.imageLinks.thumbnail
                  })`
                }}
              />
            )}
            <div className="book-shelf-changer">
              <select
                onChange={e => this.props.updateShelf(this.props.book, e)}
                defaultValue={this.props.book.shelf}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>

          {/*I'm checking that the book object has an authors array 
            and am also just displaying the first author in the event multiple authors exist*/}
          {this.props.book.authors && (
            <div className="book-authors">{this.props.book.authors[0]}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Book;