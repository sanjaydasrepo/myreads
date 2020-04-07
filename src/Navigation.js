import React from 'react';
import { BrowserRouter as Router ,  Switch , Route } from 'react-router-dom';
import BooksApp from './App';
import Search from './components/Search';

const createRoutes = () =>{
<Router>
	
	<Route exact path="/">
		<BooksApp/>
	</Route>
  	<Route path="/search">
		<Search/>
	</Route>
	
</Router>	
	
}
export default createRoutes ;