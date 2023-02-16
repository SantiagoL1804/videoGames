import "./App.css";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import { Route, Switch } from "react-router-dom";
import Detail from "./Components/Detail";
import PostVideogame from "./Components/PostVideogame";
import About from "./Components/About";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/gameDetail/:id" component={Detail}></Route>
        <Route path="/create" render={() => <PostVideogame />} />
        <Route path="/about" render={() => <About />} />
      </Switch>
    </div>
  );
}

export default App;
