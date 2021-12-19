import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import UpdateProfile from "./pages/updateProfile";
import isUserLoggedIn from "./pages/ProtectedRoutes";
import SendMessage from "./pages/SendMessage";

function App({ history }) {
  return (
    <Router>
      <Nav history />
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/sendmessage/:username" component={SendMessage} />
          <Route
            exact
            path={isUserLoggedIn("dashboard")}
            component={DashBoard}
          />
          <Route
            exact
            path={isUserLoggedIn("updateprofile")}
            component={UpdateProfile}
          />
          <Route path="/404" component={NotFound} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
