import React from 'react';
import {PropTypes} from 'prop-types';
import BooksGrid from './BooksGrid';

const Shelf = ({books, shelfTag, shelves, changeShelf}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTag} </h2>
      <div className="bookshelf-books">
        <BooksGrid books={ books} shelves={ shelves} changeShelf={ changeShelf }/>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTag: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelves:PropTypes.array.isRequired ,
};
export default Shelf;
