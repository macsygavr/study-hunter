import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Lk from '../Lk/Lk';

import SignUpChoicePage from '../SignUpChoicePage/SignUpChoicePage';
import SignUpUser from '../SignUpUser/SignUpUser';
import SignUpOrganization from '../SignUpOrganization/SignUpOrganization';
import SignInUser from '../SignInUser/SignInUser';
import SignInOrganization from '../SignInOrganization/SignInOrganization';
import SignInChoisePage from '../SignInChoicePage/SignInChoicePage';
import Search from '../Search/Search';
import Posts from '../Posts/Posts';

export default function Main() {
  const randomSixCourses = [{
    id: 1,
    organization_id: 1,
    name: 'Имя курса',
    speciality_id: 1,
    price: '100000',
    type: 'очное',
    description: 'Описание курса',
  }, {
    id: 2,
    organization_id: 1,
    name: 'Имя курса22',
    speciality_id: 12,
    price: '120000',
    type: 'очное',
    description: 'Описание курса',
  }, {
    id: 3,
    organization_id: 1,
    name: 'Имя курса',
    speciality_id: 1,
    price: '100000',
    type: 'очное',
    description: 'Описание курса',
  }, {
    id: 4,
    organization_id: 1,
    name: 'Имя курса',
    speciality_id: 1,
    price: '100000',
    type: 'очное',
    description: 'Описание курса',
  }, {
    id: 5,
    organization_id: 1,
    name: 'Имя курса',
    speciality_id: 1,
    price: '100000',
    type: 'очное',
    description: 'Описание курса',
  }, {
    id: 6,
    organization_id: 1,
    name: 'Имя курса',
    speciality_id: 1,
    price: '100000',
    type: 'очное',
    description: 'Описание курса',
  }];

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/profile">
            <Lk />
          </Route>
          <Route exact path="/">
            <Search />
            <Posts resultToRender={randomSixCourses} />
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
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
