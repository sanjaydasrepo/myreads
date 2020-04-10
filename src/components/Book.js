import React from 'react';
import {PropTypes} from 'prop-types';

const Book = ({ book, shelves , changeShelf }) => {
  
  const handleShelfChange = e => {
    e.target.value && ( e.target.value !== book.shelf ) && changeShelf (e.target.value, book);
  };

  const bookTop = imageLinks => {
    let top = '';

    if (imageLinks) {
      top = (
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail})`,
          }}
        />
      );
    } else {
      top = (
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          No thumbnail
        </div>
      );
    }

    return top;
  };

  const getOptions = shelf => {
    
    let bookShelf= book.shelf ;
    
    if( !bookShelf ){
        bookShelf = "none";
    }

    return shelf.shelfName === bookShelf
      ? <option key={shelf.shelfName} value={shelf.shelfName}>
          &#10003; {shelf.shelfTag}
        </option>
      : <option key={shelf.shelfName} value={shelf.shelfName}>
          {shelf.shelfTag}
        </option>;
  };
 
  const authors = book.authors;


    return (
      <div className="book">
        <div className="book-top">
          {bookTop (book.imageLinks)}
          <div className="book-shelf-changer">
            <select onChange={handleShelfChange}>
              <option value=""> Move to..</option>
              {shelves.map (shelf => getOptions (shelf))}
            </select>
          </div>
        </div>
        <div className="book-title"> {book.title} </div>
        <div className="book-authors">
          {authors &&
            authors.map (author => <span key={author}> {author}   </span>)}
        </div>
      </div>
    );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;
