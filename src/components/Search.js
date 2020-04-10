import React from 'react';
import * as BooksAPI from '../BooksAPI';
import BooksGrid from './BooksGrid';
import LoadingOverlay from 'react-loading-overlay';

import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

class Search extends React.Component {
  state = {
    searchedBooks: [],
    isLoading: false,
    value: '',
  };

  updateSearchResults (result) {
    const {books} = this.props;
    let newResults = [];
    try {
      if (!result.error) {
        for (const ser in result) {
          const bookInShelf = books.find (b => b.id === result[ser].id);

          if (bookInShelf) {
            newResults.push (bookInShelf);
          } else {
            newResults.push (result[ser]);
          }
        }

        this.setState ({searchedBooks: newResults, isLoading: false});
      } else {
        this.setState ({searchedBooks: [], isLoading: false});
      }
    } catch (error) {
      this.setState ({searchedBooks: [], isLoading: false});
    }
  }

  handleChange = async e => {
    //persist query

    localStorage.setItem ('query', e.target.value);

    this.setState ({isLoading: true, value: e.target.value});
    const result = await BooksAPI.search (e.target.value, 10);
    this.updateSearchResults (result);
  };

  async componentDidUpdate (prevProps) {
    const {books, recentlyChangedShelf} = this.props;
    let {searchedBooks} = this.state;
    if (
      searchedBooks.length > 0 &&
      books.length > 0 &&
      prevProps.books !== books
    ) {
      if (recentlyChangedShelf === 'none') {
        this.setState ({isLoading: true});
        const result = await BooksAPI.search (this.state.value, 10);
        searchedBooks = result;
      }
      this.updateSearchResults (searchedBooks);
    }
  }

  async componentDidMount () {
    const query = localStorage.getItem ('query');
    if (query !== '') {
      const result = await BooksAPI.search (query, 10);
      this.updateSearchResults (result);
    }
  }
  render () {
    const {shelves, changeShelf} = this.props;
    
    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link to="/" className="close-search" onClick={()=>{
             localStorage.setItem("query","");
          }}></Link>
          
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />

          </div>
        </div>
        <div className="search-books-results">
          <LoadingOverlay
            active={this.state.isLoading}
            spinner={true}
            text="Loading ..."
          >
            <BooksGrid
              books={this.state.searchedBooks}
              shelves={shelves}
              changeShelf={changeShelf}
            />

          </LoadingOverlay>

        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shelves: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  recentlyChangedShelf: PropTypes.string.isRequired,
};
export default Search;
