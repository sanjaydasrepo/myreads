import React from 'react';
import Book from './Book';

const BooksGrid = ({books, shelves, changeShelf}) => {
  
  
  return (
      <ol className="books-grid">
       
          { books.length > 0 ? books.map (book => (
            <li key={book.id}>
              <Book book={book} books={books}  shelves={shelves} changeShelf={changeShelf}  />
            </li>
          )) : "No books" }
      </ol>
      );
    };
   
    export default BooksGrid;

