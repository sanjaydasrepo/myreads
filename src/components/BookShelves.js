import React from 'react';
import Shelf from './Shelf';
import {Link} from 'react-router-dom';

const BookShelves = ({shelves, books, changeShelf}) => {
  return (
    <div className="app">
     
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {shelves.map (shelve => {
           
            return(  shelve.shelfName !== 'none' && <Shelf
              key={shelve.shelfName}
              shelves={shelves}
              books={books.filter (book => book.shelf === shelve.shelfName)}
              shelfTag={shelve.shelfTag}
              changeShelf={changeShelf}
            />)
          }
          )}

        </div>

        <div className="open-search">
          <Link to="/search"> Add a book </Link>
        </div>
      </div>
    </div>
  );
};

export default BookShelves;
