import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf';
import { Route ,Link } from 'react-router-dom'
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
       
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf books={[]} shelfTag="Currently reading"/>
      		  <Shelf books={[]} shelfTag="Read"/>
			  
            </div>
            <div className="open-search">
               <Link to="/search"> Add a book </Link>	 
            </div>
          </div>
        )}
		
		<Route exact path="/search">
			<Search/>
		</Route>
		
      </div>
    )
  }

	
}

export default BooksApp
