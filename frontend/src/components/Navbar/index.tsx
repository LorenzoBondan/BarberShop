import { Link, NavLink } from "react-router-dom";
import '@popperjs/core';
import 'bootstrap/js/src/collapse';
import logo from 'assets/images/logo.png';
import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { getTokenData, hasAnyRoles, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

import './styles.css';

const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
      }, [setAuthContextData]);


      const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        
        removeAuthData();
    
        setAuthContextData({
          authenticated: false,
        })
    
        history.replace('/'); 
    }

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <Link to="/" className="nav-logo-text">
                <div className='navbar-brand'>
                    <img src={logo} alt="logo" />
                </div>
                <h4>BARBER SHOP</h4>
            </Link>

            <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#soccerleague-navbar"
                    aria-controls="soccerleague-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className="collapse navbar-collapse" id="soccerleague-navbar">
                <ul className='navbar-nav offset-md-4 main-menu'>

                    {hasAnyRoles(["ROLE_ADMIN"]) && (
                        <li>
                            <NavLink to="/admin" activeClassName='active'>
                                Admin
                            </NavLink>
                        </li>
                    )}

                    {hasAnyRoles(['ROLE_BARBER']) && (
                        <li>
                            <NavLink to="/myappointments" activeClassName='active'>
                                My Appointments
                            </NavLink>
                        </li>
                    )}

                    {hasAnyRoles(["ROLE_CLIENT"]) && (
                        <li>
                            <NavLink to="/create" activeClassName='active'>
                                New Appointment
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink to="/barbers" activeClassName='active' exact>
                            Barbers
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className='nav-login-logout'>
                { authContextData.authenticated ? (
                    <a href="#logout" onClick={handleLogoutClick}>LOGOUT</a>
                    ) : (
                        <Link to="/auth">LOGIN</Link>
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar;