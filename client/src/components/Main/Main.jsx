import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
import { loginUserFail, loginUserSuccess } from '../../redux/actions/usersAC';
// import { useSelector } from 'react-redux';

export default function Main() {
  const [randomSixCourses, setRandomSixCourses] = useState([]);

  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState();

  const { currentUser } = useSelector((state) => state);

  // useEffect для подгрузки пользователя, если он зашел под собой
  useEffect(() => {
    if (!Object.keys(currentUser).length) {
      axios(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        method: 'get',
        withCredentials: true,
      })
        .then((response) => {
          if (response.status !== 401) {
            dispatch(loginUserSuccess(response.data));
          } else dispatch(loginUserFail());
        })
        .catch(() => dispatch(loginUserFail()));
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}`) // env variable
      .then((res) => setRandomSixCourses(res.data));
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    const specialityId = e.target.speciatityId.value;
    const typeId = e.target.typeId.value;
    const courseNameValue = e.target.courseName.value;
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
    // console.log(specialityId, typeId, priceMin, priceMax);
    axios.post(`${process.env.REACT_APP_SERVER_URL}`, { // env variable
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
