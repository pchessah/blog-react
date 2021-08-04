import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from "./pages/home/home"
import Profile from "./pages/profile/profile"
import Blogposts from "./pages/blogposts/blogposts"
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import { Switch, Route } from "react-router-dom"
import Newblogpost from './pages/new-blogpost/new-blogpost';
import CurrentUserBlogPosts from './pages/currentUserBlogPosts/currentUserBlogPosts';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="page-content">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/blogposts" component={Blogposts} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/new-blogpost" component={Newblogpost} />
          <Route path="/your-blogpost" component={CurrentUserBlogPosts}/>
        </Switch>
      </main>

    </div>
  );
}

export default App;
