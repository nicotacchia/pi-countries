import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Home from './components/Home';
import LandingPage from "./components/LandingPage"
 import createCountry from "./components/createCountry"
 import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path= "/home" component={Home}/>
        <Route path= "/country" component={createCountry}/> 
        <Route path="/countries/:id" component={Details} />
    </div>
    </BrowserRouter>
  );
}

export default App;
