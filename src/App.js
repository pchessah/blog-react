import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from "./pages/home/home"
import Profile from "./pages/profile/profile"
import Blogposts from "./pages/blogposts/blogposts"
import { Switch, Route } from "react-router-dom"

function App() {
  return (

      <div className="App">
        <Sidebar/>    
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/profile" component={Profile} />
                <Route path="/blogposts" component={Blogposts} />
            </Switch>
      </div>



  );
}

export default App;
