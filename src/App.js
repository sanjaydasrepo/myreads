import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import Search from './components/Search';
import BookShelves from './components/BookShelves';
import LoadingOverlay from 'react-loading-overlay';


const shelves = [
  {
    shelfName: 'currentlyReading',
    shelfTag: 'Currently Reading',
  },
  {
    shelfName: 'read',
    shelfTag: 'Read',
  },
  {
    shelfName: 'wantToRead',
    shelfTag: 'Want to read',
  },
  {
    shelfName: 'none',
    shelfTag: 'None',
  },
];

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isLoading: true,
      books: [],
      recentlyChangedShelf:''
    };
  }

  async componentDidMount () {
    try {
      const resp = await BooksAPI.getAll ();
      this.setState ({books: resp, isLoading: false});
    } catch (error) {
      console.error (error);
    }
  }

  changeShelf = async (shelf, book) => {
   
    try {
      this.setState ({ isLoading: true});
      await BooksAPI.update (book, shelf);
    } catch (error) {
      this.setState ({ isLoading: false});
      console.error (error);
    }

    //fetching books
    try {
      const resp = await BooksAPI.getAll ();
      this.setState ({books: resp , recentlyChangedShelf:shelf , isLoading:false });
    } catch (error) {
      this.setState ({isLoading:false });
    }
  };
  render () {
    const {isLoading, books} = this.state;

    return (
      <div className="app">
        <LoadingOverlay active={isLoading} spinner text="Loading ...">

          <Route
            exact
            path="/"
            render={props => (
              <BookShelves
                {...props}
                books={books}
                shelves={shelves}
                changeShelf={this.changeShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                {...props}
                shelves={shelves}
                books={ books }
                changeShelf={this.changeShelf}
                recentlyChangedShelf={ this.state.recentlyChangedShelf }
              />
            )}
          />
        </LoadingOverlay>

      </div>
    );
  }
}

export default App;
