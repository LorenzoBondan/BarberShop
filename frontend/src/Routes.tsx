
import Navbar from "components/Navbar";
import Auth from "pages/Auth";
import Home from "pages/Home";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <Navbar/>

            <Switch>

                <Route path="/" exact>
                    <Home/>
                </Route>

                <Route path="/teams" exact>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>

                    </div>
                </Route>

                <Route path="/teams/team/:teamId">
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>

                    </div>
                </Route>



                <Redirect from='/auth' to='/auth/login' exact />
                <Route path="/auth">
                    <Auth/>
                </Route>

                <Redirect from="/admin" to="/admin/teams" exact />
                <Route path="/admin">

                </Route>

                <Route path="/profile" exact>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>

                    </div>
                </Route>

            </Switch>


        </Router>
    );
}

export default Routes;