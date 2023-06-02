
import Navbar from "components/Navbar";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <Navbar/>

            <Switch>

                <Route path="/" exact>

                </Route>

                <Route path="/teams" exact>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>

                    </div>
                </Route>

                <Route path="/teams/team/:teamId">
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>

                    </div>
                </Route>



                <Redirect from='/admin/auth' to='/admin/auth/login' exact />
                <Route path="/admin/auth">

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