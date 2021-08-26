import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUpChoicePage from './components/SignUpChoicePage/SignUpChoicePage';
import SignUpUser from './components/SignUpUser/SignUpUser';
import SignUpOrganization from './components/SignUpOrganization/SignUpOrganization';
import SignInUser from './components/SignInUser/SignInUser';
import SignInOrganization from './components/SignInOrganization/SignInOrganization';
import SignInChoisePage from './components/SignInChoicePage/SignInChoicePage';
import Search from './components/Search/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/signup">
          <SignUpChoicePage />
        </Route>
        <Route exact path="/signup/user">
          <SignUpUser />
        </Route>
        <Route exact path="/signup/organization">
          <SignUpOrganization />
        </Route>
        <Route exact path="/signin">
          <SignInChoisePage />
        </Route>
        <Route exact path="/signin/user">
          <SignInUser />
        </Route>
        <Route exact path="/signin/organization">
          <SignInOrganization />
        </Route>
      </div>
    </Router>
  );
}

export default App;
