import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
// import { useSelector } from 'react-redux';

export default function Main() {
  const [randomSixCourses, setRandomSixCourses] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/')
      .then((res) => setRandomSixCourses(res.data));
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    const specialityId = e.target.speciatity_id.value;
    const typeId = e.target.type_id.value;
    let priceMin = e.target.price_min.value;
    if (e.target.price_min.value.trim()) {
      priceMin = e.target.price_min.value;
    } else {
      priceMin = 0;
    }
    let priceMax;
    if (e.target.price_max.value.trim()) {
      priceMax = e.target.price_max.value;
    } else {
      priceMax = 100000000000000000000000000000000;
    }
    console.log(specialityId, typeId, priceMin, priceMax);
    axios.post('http://localhost:3005/', {
      specialityId,
      typeId,
      priceMin,
      priceMax,
    })
      .then((res) => setSearchResult(res.data));
  };

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Search searchHandler={searchHandler} />
            <Posts resultToRender={searchResult || randomSixCourses} />
          </Route>
          <Route exact path="/profile">
            <Lk />
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
