import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Lk from '../Lk/Lk';

export default function Main() {
  return (
    <>
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            {/*  */}
          </Route>

          <Route exact path="/profile">
            <Lk />
          </Route>

        </Switch>
        <Footer />
      </Router>

    </>
  );
}
