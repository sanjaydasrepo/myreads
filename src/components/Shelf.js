import React from 'react';
import { PropTypes } from 'prop-types';
import Book from './Book';

const Shelf = ( { books , shelfTag } ) =>{
  	
  	const changeShelf = () =>{
    	
    }
	return(
    	<div className="bookshelf">
                  <h2 className="bookshelf-title">{ shelfTag} </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <Book book={ {} } shelves={[]} changeShelf={ changeShelf }/>
                      </li>
                    </ol>
                  </div>
                </div>
    )
} 

Shelf.propTypes = {
	books:PropTypes.array.isRequired ,
  	shelfTag:PropTypes.string.isRequired
}
export default Shelf ;