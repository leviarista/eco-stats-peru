import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './styles/base/normalize.css'
import './styles/base/colors.css'
import './styles/base/typography.css'
import './styles/general/body.css'
import './styles/general/box-sizing.css'
import './styles/general/headings.css'
import './styles/general/links.css'
import './styles/general/text.css'
import './styles/general/images.css'
import './styles/components/nav.css'
import './styles/components/footer.css'
import './styles/components/containers.css'
import './styles/components/buttons.css'
import './styles/components/module-home.css'
import './styles/components/module-stats.css'
import './styles/components/module-about.css'
import './styles/utilities/text.css'
import './styles/utilities/github-corner.css'
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Stats from "./pages/Stats";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/stats"><Stats /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
