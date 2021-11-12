import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Upcoming from "./core/Upcoming";
import Pagenotfound from "./core/404";
import Signin from "./core/Signin";
import PrivateRoute from "./core/helper/privateroutes";
import Signup from "./core/Signup";

const Routes = () => {
    return(
        <BrowserRouter> 
         <Switch>
             <Route path="/" exact component={Signin} />
             <Route path="/signup" exact component={Signup} />
             <PrivateRoute path='/home' exact component={Home} />
             <PrivateRoute path='/upcoming' exact component={Upcoming} />
             <Route render={Pagenotfound} />
         </Switch>
        </BrowserRouter>
    )
}

export default Routes;