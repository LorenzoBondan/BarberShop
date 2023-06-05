
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Auth from "pages/Auth";
import Home from "pages/Home";
import MyAppointments from "pages/MyAppointments";
import NewAppointment from "pages/NewAppointment";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { hasAnyRoles } from "util/auth";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <Navbar/>

            <Switch>

                <Route path="/" exact>
                    <Home/>
                </Route>

                {hasAnyRoles(['ROLE_BARBER']) && (
                    <Route path="/myappointments" exact>
                        <MyAppointments/>
                    </Route>
                )}

                {hasAnyRoles(['ROLE_CLIENT']) && (
                    <Route path="/newappointment" exact>
                        <NewAppointment/>
                    </Route>
                )}

                <Redirect from='/auth' to='/auth/login' exact />
                <Route path="/auth">
                    <Auth/>
                </Route>

                <Redirect from="/admin" to="/admin/teams" exact />
                <Route path="/admin">

                </Route>

            </Switch>

            <Footer/>
        </Router>
    );
}

export default Routes;