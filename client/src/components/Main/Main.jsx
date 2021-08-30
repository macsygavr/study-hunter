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
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    axios.get('http://localhost:3005/')
      .then((res) => setRandomSixCourses(res.data));
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    const specialityId = e.target.speciatityId.value;
    const typeId = e.target.typeId.value;
    let priceMinValue = e.target.priceMin.value;
    if (e.target.priceMin.value.trim()) {
      priceMinValue = e.target.priceMin.value;
    } else {
      priceMinValue = 0;
    }
    let priceMaxValue;
    if (e.target.priceMax.value.trim()) {
      priceMaxValue = e.target.priceMax.value;
    } else {
      priceMaxValue = 1e50;
    }
    const courseNameValue = e.target.courseName.value;
    console.log(specialityId, typeId, priceMinValue, priceMaxValue, courseNameValue);
    axios.post('http://localhost:3005/', {
      specialityId,
      typeId,
      priceMinValue,
      priceMaxValue,
      courseNameValue,
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
