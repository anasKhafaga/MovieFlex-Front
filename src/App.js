import './App.css';
import { Component } from 'react';
import { Movie, Browse, HomePage, CustomBrowse, Signup, Login, NotFound, Verification } from './Pages';
import { MovieCard, Header, Footer, Pagination, SideBar, SpMovieCard } from './Components'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component{
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route component={HomePage} path="/" exact  />
            <Route component={Movie} path="/movie/:id" exact  />
            <Route component={Browse} path="/browse/:page" exact  />
            <Route component={CustomBrowse} path="/watchlist" exact  />
            <Route component={CustomBrowse} path="/top-rated" exact  />
            <Route component={CustomBrowse} path="/popular" exact  />
            <Route component={Signup} path="/signup" exact  />
            <Route component={Login} path="/login" exact  />
            <Route component={Verification} path="/verify/:token" exact  />
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
