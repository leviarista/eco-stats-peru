import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
